import React from 'react'
import Router from 'next/router'
import { auth } from '../firebase/index'
import { Button } from "antd";
import Loading from './../helpers/loading'


const MerchantDecisionTime = props => {
  const signOutAndRedirect = () => {
    auth.signOut()
      .then(() => Router.push('/'))
      .catch(e => console.log(e))
  }


  return (
    <>
      <h2>this email is already tied to a <strong>Merchant</strong> account</h2>
      <a href="localhost:3000"><Button>Continue to orangejacket.ca</Button></a>
      <Button onClick={signOutAndRedirect}>Use a different email</Button>
    </>
  )
}

const withoutAuth = (Component) => {
  class x extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        status: 'LOADING',

      }
    }

    componentDidMount() { 
      auth.onAuthStateChanged(user => {
        if (user) { // there is a user
          const x = this

          user.getIdTokenResult()
          .then((idTokenResult) => {
            if (idTokenResult.claims.type === "merchants") {
              this.setState({status: 'MERCHANT_ACCOUNT'})
            } else if (idTokenResult.claims.type === "reps") {
              Router.push("/")
            } else {
              console.log('user not set yet') // has auth token but no role (assume first time got glitch or something)
              x.setState({status: "NOT_SIGNED_IN"})
            }
          })
          .catch((error) => {
            console.log(error); // cant get token
          });
        }else { // user not logged in
          this.setState({status: 'NOT_SIGNED_IN'}) 
        }
      })
    }

    renderContent() {
      const { status } = this.state

      if(status == 'LOADING') {
        return <Loading message="Loading..."/>
      } else if(status == 'NOT_SIGNED_IN') {
        return <Component { ...this.props} />
      } else if (status == "MERCHANT_ACCOUNT") {
        return <MerchantDecisionTime />
      }
    }

    render() {
      return (
        <React.Fragment>

        {this.renderContent()}

        </React.Fragment>
      )
    }
  }

  if (Component.getInitialProps) {
    x.getInitialProps = (ctx) => {
      return Component.getInitialProps(ctx)
    }
  }

  return x
}

export default withoutAuth
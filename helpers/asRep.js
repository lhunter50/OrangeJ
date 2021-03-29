import React from 'react'
import { auth, functions, db } from '../firebase/index'
import { Button } from "antd";
import Link from 'next/link'
import router from 'next/router'
import Loading from './../helpers/loading'
import SetUsername from '../components/username'

const MerchantDecisionTime = props => {
  const signOutAndRedirect = () => {
    auth.signOut()
      .then(() => Router.push('/'))
      .catch(e => console.log(e))
  }

  return (
    <>
      <h3>this email is already tied to a <strong>Merchant</strong> account</h3>
      <a href="localhost:3000"><Button>Continue to merchant.orangejacket.ca</Button></a>
      <Button onClick={signOutAndRedirect}>Use a different email</Button>
    </>
  )
}

const asRep = (Component) => {
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
          
          user.getIdTokenResult()
          .then((idTokenResult) => {
              
            if (idTokenResult.claims.type === "merchants") {
              this.setState({status: 'MERCHANT_ACCOUNT'}) // tell them they have merchant account
            } else if (idTokenResult.claims.type === "reps") {
              this.setState({status: 'SIGNED_IN'}) // continue to their rep account
            } else {
              console.log('user not set yet') // has auth token but no role (assume first time)
              this.setState({status: 'FIRST_TIME'})
            }
          })
          .catch((error) => {
            console.log(error); // cant get token
          });

        }else { // user not logged in
          router.push('/login')
        }
      })
    }

    renderContent() {
        const { status } = this.state

        if(status == 'LOADING') {
          return <Loading message="Loading..."/>
        } else if(status == 'SIGNED_IN') {
          return <Component { ...this.props} />
        } else if (status == "MERCHANT_ACCOUNT") {
          return <MerchantDecisionTime />
        } else if (status == "FIRST_TIME") {
          return <SetUsername />
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

export default asRep
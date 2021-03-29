import React from 'react'
import { auth, db, functions } from './../firebase/index'
import asRep from './../helpers/asRep'
import ProductCard from './../components/ProductCard'
import { Button, Empty,  } from 'antd'
import Template from '../components/Template'
import {
  UserOutlined
} from '@ant-design/icons'

class Representative extends React.Component {
  state = {

  }

  cardComponents = (arr) => {
    return arr.map(item => {
      return <ProductCard 
        key={new Date().valueOf() + "-" + item.title}
        id={item.id}
        item={item}
      />
    })
  }

  componentDidMount = async () => {
    this.getItems()
    const getStripeUser = functions.httpsCallable('getStripeUser')
    const getStripeBalance = functions.httpsCallable('getStripeBalance')

    const { stripeId, uid } = this.props.user

    getStripeUser({stripeId, uid}).then(r => {
      console.log({ stripeUser: r })
    })

    getStripeBalance({stripeId, uid}).then(r => {
      console.log({ balance: r })
    })


  }

  getItems = () => {
    const user = this.props.user
    console.log(user)
    if(this.props.user.pinned) {
      db.collection("listings").where('id', 'in', this.props.user.pinned).get().then(querySnapshot => {
        let items = []
        querySnapshot.forEach(element => {
          items.push(element.data())
        })
        this.setState({ items })
      }).catch(e => console.warn(e))
    } else {
      if(auth.currentUser.uid == this.props.user.uid) {
        return (
          <>
            <Empty description="Looks like you have no deals!"/>
          </>
        )
      } else {
        return (
          <>
            <Empty description='this user has no deals' />
          </>
        )
      }
    }

  }

  clickedVerify = () => {
    const verifyUser = functions.httpsCallable('verifyUser')
    const { username, uid, stripeId } = this.props.user

    verifyUser({uid, username, stripeId}).then(function(result) {
      console.log(result.data)
      const { success, url } = result.data

      if (result) {
        window.location= url
      }

    }).catch(e => console.warn(e))
  }

  verifyButton = () => {
    if (auth.currentUser.uid == this.props.user.uid) {
      return <Button onClick={this.clickedVerify} >Verify Myself</Button>
    } else {
      return null
    }
  }

  render() {
    console.log("render")
    const user = this.props.user
    console.log(user)

    return(
      <> 
        <Template>
          <div id="userArea">
            {/* user avatar placeholder */}
            <UserOutlined style={{fontSize: 40}}/>
            <h3>{user.username}</h3>
          </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac convallis orci, non dignissim nulla. Nunc semper eleifend convallis. Aenean luctus nisi mi. Mauris metus metus, luctus sed accumsan ac, pharetra at mi. Duis luctus diam nec nulla convallis tempor. Donec nec suscipit dui. Sed aliquam nunc sed consectetur condimentum. </p>
          <div id="header">
            <h2>{user.username}'s Pinned Deals</h2>
          </div>
          <div id="productCards">
            {this.state.items ? this.cardComponents(this.state.items) :  this.getItems()}
            {this.verifyButton()}
          </div>
        </Template>
        <style jsx>{`
            #productCards {
              width: 100%;
            }
            #userArea {
              display: flex;
              flex-direction: row;
            }
          `}
        </style>
      </>
    )
  }
}

Representative.getInitialProps = async function(context) {
  const { username } = context.query

  const userInformation = async () => {
    return new Promise((resolve, reject) => {
      db.collection('reps').where("username", "==", username).get()
        .then(snapshot => {
          if (snapshot.empty) {
            console.log('No matching documents.');
            return
          }
          snapshot.forEach(doc => {
            let {email, uid, pinned, stripeId, username,} = doc.data()
            console.log(uid)
            resolve({email, uid, pinned, stripeId, username, })
          });
      })
    })
  }
  return {user: await userInformation()}
}

export default asRep(Representative) 
import React from 'react'
import { auth, firebase, db } from '../firebase/index'
import Template from '../components/Template'
import { Button, Form, Input, Checkbox, Tabs, Menu, } from 'antd'
import asRep from '../helpers/asRep'
import Router from 'next/router'

const { TabPane } = Tabs

class Account extends React.Component {
  state = {
    width: 0,
    height: 0,
    tabPosition: 'top',
    emailUpdate: auth.currentUser.email,
    usernameUpdate: auth.currentUser.displayName,
    fullNameUpdate: '',
    addressUpdate: '',

  }

  handleTextChange = () => {
    this.setState({
      emailUpdate: information_email.value,
      usernameUpdate: information_username.value,
      fullNameUpdate: information_fullName.value,
      addressUpdate: information_address.value,
    })
  }

  handleSubmit = () => {
    var user = auth.currentUser
    
    user.updateProfile({
      displayName: this.state.usernameUpdate,
      email: this.state.emailUpdate,
    }).then(function() {
      console.log('success')
      Router.push('/account')
    }).catch(function(error) {
      console.log(error)
    })

    user.updateEmail("" + this.state.emailUpdate).then(function() {
      console.log(auth.currentUser.email)
      console.log('success')
    }).catch(function(error) {
      console.log(error)
    })

    db.collection('reps').doc(`${auth.currentUser.uid}`).update({
      username: this.state.usernameUpdate,
      email: this.state.emailUpdate,
    }).then(function() {
      console.log('success')
    }).catch(function(error) {
      console.log(error)
    })
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    // var provider = new firebase.auth.GoogleAuthProvider();
    // provider.setCustomParameters({prompt: 'select_account'});
    // auth.signInWithPopup(provider);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    let left = false

    if (window.innerWidth >= 1024) {
      left = true
    }

    if (left) {
      this.setState({ tabPosition: 'left' })
    } else {
      this.setState({ tabPosition: 'top' })
    }
  }

  callBack = (key) => {
    console.log(key)
  }

  layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 6 },
  }

  tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  }

  onFinish = values => {
    console.log('Success', values)
  }

  onFinishedFailed = errorInfo => {
    console.log('Failed', errorInfo)
  }

  render() {
    const userData = auth.currentUser

    return (
      <>
        <Template>
          <div id="tabBar">
            <Tabs onChange={this.callBack} size="small" tabPosition={this.state.tabPosition}>
              <TabPane tab="Account Information" key="1" style={{}}>
                <div id="userInformation">
                  <h3>Personal Information</h3>
                  <span>Displayed here is some information</span>
                  <div id="formFormat">
                    <Form
                      {...this.layout}
                      name="information"
                      onFinish={this.handleSubmit}
                      onFinishFailed={this.onFinishedFailed}
                      size="middle"
                      style={{ marginTop: 15 }}
                      initialValues={{
                        username: this.state.usernameUpdate,
                        email: this.state.emailUpdate,
                      }}
                    >
                      <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please be sure this is filled' }]}
                      >
                        <Input onChange={this.handleTextChange} />
                      </Form.Item>

                      <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please make sure this is filled', type: 'email'}]}

                      >
                        <Input onChange={this.handleTextChange} />
                      </Form.Item>

                      <Form.Item
                        label="Name"
                        name="fullName"
                      >
                        <Input onChange={this.handleTextChange} />
                      </Form.Item>

                      <Form.Item
                        label="Address"
                        name="address"
                      >
                        <Input onChange={this.handleTextChange} />
                      </Form.Item>

                      <Form.Item
                        label="Age"
                        name="Age"
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        label=" "
                        colon={false}
                      >
                        <Button type="primary" onSubmit={this.handleSubmit} htmlType='submit'>Save</Button>
                      </Form.Item>
                    </Form>
                  </div>
                </div>
              </TabPane>
              <TabPane tab="Edit Account Information" key="2">
                Test 2
            </TabPane>
              <TabPane tab="Order History" key="3">
                test3
            </TabPane>
            </Tabs>
          </div>
        </Template>
        <style jsx>{`
            #formFormat {
              padding: 0px 50px 0px 50px;
            }

            #userInformation {
              margin-top: 30px;
            }
        `}
        </style>
      </>
    )
  }
}

// Account.getInitialProps = async function (context) {
//   const { username } = context.query
//   console.log(username)

//   const userInformation = async () => {
//     return new Promise((resolve, reject) => {
//       db.collection('reps').where("username", "==", username).get()
//         .then(snapshot => {
//           if (snapshot.empty) {
//             console.log('No matching documents.');
//             return
//           }
//           snapshot.forEach(doc => {
//             let { email, uid, pinned, stripeId, username, } = doc.data()
//             console.log(uid)
//             resolve({ email, uid, pinned, stripeId, username, })
//           });
//         })
//     })
//   }
//   return { user: await userInformation() }
// }

export default asRep(Account)
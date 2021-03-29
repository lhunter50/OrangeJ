import React from 'react'
import { db, auth, functions } from '../firebase/index'
import { Input, Form, Button } from 'antd'
import Router from 'next/router'

class SetUsername extends React.Component {
  state = {
    isGood: false,
    value: "",
    isLoading: false,
  }

  componentDidMount = () => {
    const listener = db.collection('/reps').onSnapshot(snapshot => {
      const { docs } = snapshot
      
      const usernameList = docs.map(doc => {
        const data = doc.data()
        return data.username.toLowerCase()
      })
      this.setState({ usernameList, listener })
    }, error => {
      console.warn(error)
    })
  }

  componentWillUnmount = () => {
    if (this.state.listener) {
      this.state.listener()
    } 
  }

  submit = (username) => {
    this.setState({isLoading: true})
    console.log(username)

    const newUser = functions.httpsCallable('newUser');

    newUser({collection: "reps", username}).then(function(result) { // set role and username
      // Read result of the Cloud Function.
      console.log(result)
      auth.currentUser.getIdToken(true);
      auth.updateCurrentUser(auth.currentUser).then(r => {
        console.log(r)
        
        Router.push("/BrowseAllDeals")
      })
    }).catch(e => console.warn(e))
  }

  onFinish = values => {
    console.log('Success:', values);
    this.submit(values.username)
  };

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  change = (e) => {
    const { value } = e.target
    // console.log(value)
    var regex = new RegExp("^[A-Z0-9]*$", "im")
    const isSymbols = !regex.test(value)

    if (value.length == 0) {
      this.setState({error: "", isGood: false})
    } else if (isSymbols) {
      this.setState({isGood: false, error: "Must contain only numbers and letters"})
    } else if (value.length > 14) { 
      this.setState({isGood: false, error: "Max length 14 is characters"})
    } else {
      if (this.state.usernameList.includes(value.toLowerCase())) {
        this.setState({isGood: false, error: "This username is taken"})
      } else {
        this.setState({error: "", isGood: true })
      }
    }
    
  }

  render() {
    let validateStatus = ""
    let help = ""

    if (this.state.error) {
      validateStatus = "error"
      help = this.state.error
    } 
    if (this.state.isGood) {
      validateStatus = "success"
    }
    
    return (
      <>
        <div className="page">
          <div className="cont">
            <h2>Choose a username!</h2>
            <h6>Don't worry, you can change it later</h6>
            <span>Username must:</span>
            <ul>
              <li>Contain only numbers and letters</li>
              <li>Max length 14 is characters</li>
            </ul>
            <Form 
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
            >
              <Form.Item
                hasFeedback
                validateStatus={validateStatus}
                help={help}
                name="username"
                
              >
                <Input onChange={this.change} placeholder="username" />
              </Form.Item>
              <Form.Item>
              <Button loading={this.state.isLoading} block disabled={!this.state.isGood} type="primary" htmlType="submit">
                Continue
              </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
        <style global jsx>{`
          .page {
            height: 95vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          body {
            background-color: #5ac5dc;
          }
          
        `}</style>
      </>
    )
  }
}

export default SetUsername
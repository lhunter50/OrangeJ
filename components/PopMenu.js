import React from 'react'
import { Drawer, Button, Radio } from 'antd'
import { Icon } from 'antd'
import { auth, firebase, db } from '../firebase/index'
import Link from 'next/link'
import asRep from '../helpers/asRep'
import {
  CaretRightFilled,
  UserOutlined,
  MenuOutlined,
} from '@ant-design/icons';


class PopMenu extends React.Component {
  state = {
    visible: false,
    placement: 'right',
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    })
  }

  onClose = () => {
    this.setState({
      visible: false,
    })
  }

  onChange = e => {
    this.setState({
      placement: e.target.value
    })
  } 

  signUserOut = () => {
    auth.signOut()
  }

  showChildrenDrawer = () => {
    this.setState({
      childrenDrawer: true,
    })
  }

  onChildrenDrawerClose = () => {
    this.setState({
      childrenDrawer: false,
    })
  }  

  render() {      
    const userName = auth.currentUser.email
    const splitName = userName.split("@")[0]
    const user = auth.currentUser.uid

    const PostLink = props => {
      if(user) {
        return(
          <div>
            <Link href="/[username]" as={`/${auth.currentUser.displayName}`}>
              <a>My Account</a>
            </Link>
          </div>
        )
      } else {
        return (
          <Link href="login">
            <a>Sign In</a>
            <UserOutlined />
          </Link>
        )
      }
    }
    return(
      <>
        <Button type="link"
          onClick={this.showDrawer}
          style={{height: '100%', width: '40px'}}
          ghost
        >
          <MenuOutlined style={{fontSize: '25px', color: 'black'}} />
        </Button>
        <Drawer
          placement={this.state.placement}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <div id="userArea" onClick={this.showChildrenDrawer}>
            <div id="avatar">
              <UserOutlined style={{fontSize: 25}}/>
            </div>
            <div id="userName">
              <p>Hi, {splitName}!</p>
            </div>
            <div id="drawerButton">
              <CaretRightFilled onClick={this.showChildrenDrawer }/>
            </div>
          </div>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <Drawer
            onClose={this.onChildrenDrawerClose}
            visible={this.state.childrenDrawer}
          >
            <div id="secondDrawer">
              <PostLink id={user} />
              <a onClick={this.signUserOut}>Signout</a>
            </div>
          </Drawer>
        </Drawer>
        <style jsx>
        {`
          #userArea {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            width: 100%;
          }

          #drawerButton {
            float: right;
          }

          :global(.ant-drawer-close) {
            display: none;
          }

          :global(.ant-drawer-body) {
            background-color: #63D8F2;
          } 
        `}
      </style>
      </>
    )
  }
}

PopMenu.getInitialProps = async function(context) {
  const { username } = context.query

}

export default asRep(PopMenu)
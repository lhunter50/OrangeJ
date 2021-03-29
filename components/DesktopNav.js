import React from 'react'
import PopMenu from '../components/PopMenu'
import { Menu, Dropdown, Input, } from 'antd'
import { auth, db, functions } from './../firebase/index'
import Link from 'next/link'
import {
  UserOutlined,
} from '@ant-design/icons'
import asRep from '../helpers/asRep'


const { Search } = Input

class DesktopNav extends React.Component {
  state = { width: 0, height: 0 };

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }



  dropdownMenu = () => {
    const user = auth.currentUser.displayName
    const uid = auth.currentUser.uid

    const UserAccount = props => {
  
      return (
        <Link href="/account" as={`/account`}>
          <a>{props.id}</a>
        </Link>
      )
    }
      return(
          <Menu>
          <Menu.Item>
            <a>Analytics</a>  
          </Menu.Item>
          <Menu.Item>
            <a>Unlockables</a>  
          </Menu.Item>
          <Menu.Item>
            <UserAccount id={user} />  
          </Menu.Item>
          <Menu.Item>
            <a>About OJ/Guide</a>  
          </Menu.Item>
        </Menu>
      )
  }

  render() {
    
    const uid = auth.currentUser.uid
    const user = auth.currentUser.displayName

    const PostLink = props => {
        return(
          <div id="pageLinks">
            <Link href="/browsealldeals" as={`browsealldeals`}>
              <a id="allDeals">All Deals</a>
            </Link>

            <Link href="/[username]" as={`/${user}`}>
              <a id="myPage">My Page</a>
            </Link>
          </div>
        )
    }

    return (
      <>
        <div id="contentWrapper">
          <div id="mainContent">
            <div id="logo">
              <img src="Logo1.png" alt="OJLogo" />
            </div>
            <div id="dropdownMenu">
              <div id="pageLinks">
                <PostLink id={user} />
              </div>
              <Dropdown overlay={this.dropdownMenu}>
                <div id="userArea">
                  <a className="ant-dropdown-link" onClick={e => e.preventDefault()} >
                    <UserOutlined />
                  </a>
                  <p id="userName">{user}</p>
                </div>
              </Dropdown>
            </div>
          </div>
        </div>

        <style jsx>{`
          #contentWrapper {
            background-color: #63D8F2;
            height: 80px;
          }

          #logo{
            display: flex;
            flex-direction: row;
            align-items: center;
          }

          #userName {
            font-size: 20px;
            color: white;
            padding-right: 5px;
          }

          :global(#allDeals) {
            padding: 5px 5px 0px 0px;
            margin: 0;
            font-size: 20px;
            color: white;
          }

          :global(#allDeals:hover), :global(#myPage:hover) {
            color: orange;
          }

          :global(#myPage) {
            padding: 10px 15px 0px 0px;
            margin: 0;
            font-size: 20px;
            color: white;
          }

          #mainContent {
            display: flex;
            align-items: center;
            flex-direction: row;
            justify-content: space-between;
          }
          
          #dropdownMenu{
            display: flex;
            flex-direction: row;
          }

          #userArea{
            display: flex;
            flex-direction: row;
          }

          #userName {
            margin: 0;
            padding-left: 5px;
          }
        `}</style>
      </>
    )
  }
}

DesktopNav.getInitialProps = async function (context) {
  const { username } = context.query
  console.log(username)

  const userInformation = async () => {
    return new Promise((resolve, reject) => {
      db.collection('reps').where("username", "==", username).get()
        .then(snapshot => {
          if (snapshot.empty) {
            console.log('No matching documents.');
            return
          }
          snapshot.forEach(doc => {
            let { email, uid, pinned, stripeId, username, } = doc.data()
            console.log(uid)
            resolve({ email, uid, pinned, stripeId, username, })
          });
        })
    })
  }
  return { user: await userInformation() }
}

export default asRep(DesktopNav)
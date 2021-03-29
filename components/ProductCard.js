import React from 'react'
import { auth, firebase, db } from '../firebase/index'
import { message } from 'antd'
import Link from 'next/link'
import copy from 'copy-to-clipboard'
import {
  CopyOutlined,
  PushpinOutlined,
  ShareAltOutlined,
  PushpinFilled,
} from '@ant-design/icons'

class ProductCard extends React.Component {
  state = {
    isPinLoading: false,
  }

  componentDidMount = () => {
    this.setState({
      uid: auth.currentUser.uid,
      
    })
  }

  pinToUser = async (e) => {
    this.setState({
      isPinLoading: true,

    })
    const { uid } = this.state
    const { id, isPinned } = this.props
    this.props.editPinnedDeals(isPinned, id)
    if(isPinned) { 
      db.collection("reps").doc(uid).set(
        {pinned: firebase.firestore.FieldValue.arrayRemove(id)},
        {merge: true},
      )
      .then(r => {
        this.setState({
          isPinLoading: false,

        })
        message.info({
          content: <span>Unpinned from <Link href="/[username].js" as={auth.currentUser.displayName}><a>page</a></Link></span>, 
          icon: <PushpinOutlined />,
          duration: 2,
        })
        console.log("%cUnpinned!", "font-size: 1.5em; color: green")
      })
  
    } else {
      db.collection("reps").doc(uid).set(
        {pinned: firebase.firestore.FieldValue.arrayUnion(id)},
        {merge: true},
      )
      .then(r => {
        this.setState({
          isPinLoading: false,

        })
        message.info({
          content: <span>Pinned to <Link href="/[username].js" as={auth.currentUser.displayName}><a>page</a></Link></span>, 
          icon: <PushpinFilled />,
          duration: 2,
        })
        console.log("%cPinned!", "font-size: 1.5em; color: green")
      })
  
    }
  }

  copyToClipboard = () => {
    copy("https://orangejacket.ca/checkout/" + this.props.item.id)
    message.info({
      content: "Copied to clipboard", 
      icon: <CopyOutlined />,
      duration: 2,
    })
  }

  imgRedirect = (id) => {
    console.log(id)
  }

  getCoverImg = (item) => {
    if (item.coverPhoto) {
      return <img id="image" src={item.coverPhoto} style={{width: '100%'}} />
    } else {
      return <img id="image" src={item.images[0]} style={{width: '100%'}} />
    }
  }
  
  render() {
    const { item } = this.props
    
    return (
      <>
        <div id="card">
          
          <Link href="/[username]/[dealId]" as={`/${auth.currentUser.displayName}/${item.id}`}>
            <a className="imgLink">
              <div className="imgCont">
                {this.getCoverImg(item)}
                <div className="bookmarkCont">
                  <img className="bookmark" src="bookmark-90-thin-.png"/>
                  <span id="repReward">
                    <span className="repRewFirst">${item.repReward.toFixed(2)}</span>
                    {/* <span>Rep Reward</span> */}
                  </span>
                </div>
                <span className="repRewTitle">Rep Reward</span>
              </div>
            </a>
          </Link>
          <div id="titleHolder">
            <Link href="/[username]/[dealId]" as={`/${auth.currentUser.displayName}/${item.id}`}>
              <a className="titleLink">
                <div id="title">{item.storeName ? item.storeName : "Store Name" }</div>
              </a>
            </Link>
          </div>
          <div id="address">{item.address ? item.address : "Address information here"}</div>
          <div id="pricesHolder">
            <span id="originalPrice">${item.originalPrice}</span>
            <span id="newPrice">${item.newPrice}</span>
          </div>
          <span id="description">{item.title}</span>
          <div id="buttonsHolder">
            <div id="pin" onClick={e => this.state.isPinLoading ? null : this.pinToUser()}>
              <div className="pinShareHover">
                {this.props.isPinned ?
                 <PushpinFilled style={{fontSize: "35px", height: "35px"}} /> : 
                 <PushpinOutlined style={{fontSize: "35px", height: "35px"}} />
                }
              </div>
            </div>
            <div id="copy" onClick={this.copyToClipboard}>
              <div className="pinShareHover">
                <ShareAltOutlined style={{ fontSize: '35px', height: "35px"}} />
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`
          #card {
            max-width: 360px;
            width: 100%;
            margin: 0px 0px 20px;
            text-align: center;
            font-family: arial; 
            padding: 0px 12px 20px;
            text-align: left;
            position: relative;

          }

          #repReward {
            position: absolute;
            width: calc(100% - 23px);
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 10;
            color: black;
            font-size: 25px;
            margin-left: 23px;
          }

          .repRewTitle {
            position: absolute;
            right: 12px;
            top: 213px;
            color: #ffa500;
            font-weight: 700;
            
          }

          .repRewFirst {
            font-weight: 600;
          }

          .bookmarkCont {
            position: absolute;
            width: 110.5px;
            right: 12px;
            height: 50px;
            top: 166px;
          }

          .bookmark {
            width: 100%;
            position: absolute;
          }

          .imgCont {
            width: 100%;
            height: 191.25px;
            border-radius: 7px 7px 0 0;
            overflow: hidden;
            text-decoration-color: black
          }
      
          #image {
            object-fit: cover;
            
          }

          #title{
            text-align: left;
            font-size: 20px;
            color: black;
            margin-bottom: 0;
            max-width: 219px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;

          }

          #address {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 250px;
            font-size: 15px;
            margin-top: -6px;
          }

          .imgLink:hover + #titleHolder {
            text-decoration: underline;
          }

          #title:hover {
            text-decoration: underline;
          }

          a.titleLink {
            text-decoration-color: black;
          }

          #description {
            font-size: 15px;
            display: block;
            margin: 0 0 5px 0px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 100%;

          }

          #pricesHolder {
            display: flex;
            flex-direction: row;
            font-size: 25px;
            margin-bottom: -8px;
          }

          #originalPrice{
            text-decoration: line-through;
            display: inline-block;
            text-align: left;
            padding-right: 12px;
            margin: 0;
          }
          #newPrice{
            display: inline-block;
            color: green;
            padding-right: 12px;
            font-weight: bold;
            margin: 0px;
          }

          #titleHolder {
            display: flex;
            flex-direction: row;
          }

          #buttonsHolder {
            display: flex;
            flex-direction: row;
            padding-bottom: 7px;
            border-bottom: 1px solid grey;
            height: 50px;
          }    

          #copy {
            width: 50%;
            display: flex;
            justify-content: center;
            color: #5ac5dc;
          }

          #pin {
            width: 50%;
            display: flex;
            justify-content: center;
            border-right: 1px solid grey;
            color: #ffa500;
          }

          .pinShareHover {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 95%;
            height: 103%;
            border-radius: 10px;
          }

          .pinShareHover:hover {
            background-color: #77777717; 
          }

          #pin:hover{
            cursor: pointer;
          }

          #copy:hover {
            cursor: pointer;
          }

          @media screen (max-width: 1024px) {
            #card {
              flex-wrap: wrap;
            }
          }
        `}</style>
      </>
    )
  }
}

export default ProductCard
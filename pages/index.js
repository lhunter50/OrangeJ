import React, { useImperativeHandle } from 'react'
import Head from 'next/head'
import { auth, firebase, db } from './../firebase/index'
import Template from './../components/Template'
import ProductCard from '../components/ProductCard'
import Link from 'next/link'
import asRep from '../helpers/asRep'
import { Carousel } from 'antd'

class Home extends React.Component{

  cardComponents = (arr) => {
    return arr.map(item => {
      return (
        <ProductCard key={new Date() + "-" + item.title} 
          key={new Date().valueOf() + "-" + item.title}
          id={item.id}
          item={item}
        />
      )
    })
  }

  grabRandomCard = async => {
    const card = async () => {
      let randomCard = []
      return new Promise((resolve, reject) => {
        db.collection('listings')
      })
    }
  }

  render() {
    const { items } = this.props
    console.log(items)
    return (
      <>
        <Template>
          <Head>
            <title>Orange Jacket</title>
          </Head>
          {/* {console.log(auth.currentUser)} */}
          <div className="hero">
            <h1 className="title">Orange Jacket</h1>
            <p className="description">
              A new kind of marketplace
            </p>
          </div>
          <div id="mainContent">
            <Carousel 
              autoplay={true} 
              dotPosition="bottom" 
              style={{
                display: 'flex',
                backgroundColor: "#364d79", 
                textAlign: 'center',
                justifyContent: 'center',
                width: '80vw',
                overflow: 'hidden',
              }}
            >
              <div>{this.cardComponents(items)}</div>
            </Carousel>
          </div>
        </Template>
        <style jsx>{`
          .scroll::-webkit-scrollbar {
            display: none; 
          }
  
          #mainContent {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
          }
  
          :global (.ant-carousel, .slick-slide) {
            text-align: center;
            line-height: 160px;
            background: #364d79;
            overflow: hidden;
          }
  
          .ant-carousel .slick-slide h3 {
            color: #fff;
          }
        `}</style>
      </>
    )
  }
  
}

Home.getInitialProps = async ctx => {
  const getItems = async () => {
    return new Promise((resolve, reject) => {
      const allDeals = []

      db.collection("listings").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          let data = doc.data()
          allDeals.push({
            id: data.id,
            ...data
          })
        })
        resolve(allDeals)
      })
    })
  }
  
  return {items: await getItems()}
}

export default asRep(Home)
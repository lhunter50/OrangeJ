import React from 'react'
import Template from '../components/Template'
import ProductCard from '../components/ProductCard'
import { auth, firebase, db } from './../firebase/index'
import MenuContainer from '../components/MenuContainer'
import { Select, Icon, Button, Spin, BackTop } from 'antd'
import FilterPopOut from '../components/FilterPopOut'
import InfiniteScroll from 'react-infinite-scroll-component';
import asRep from './../helpers/asRep'


let { Option } = Select;

let itemsPerPage = 12

class BrowseDeals extends React.Component {
  state = {
    items: this.props.items,
    orderBy: "newPrice",
    ascOrDesc: "desc",
    isMore: true,

  }

  componentDidMount = async () => {
    
    
    let promises = []
    
    await db.collection('reps').doc(`${auth.currentUser.uid}`).get().then(function(doc) {
      promises.push(doc.data().pinned)
    })

    const order = async () => {
      let allDeals =[]
      return new Promise((resolve, reject) => {
        db.collection('listings').orderBy("newPrice" ,"desc").limit(itemsPerPage).get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            let data = doc.data()
            allDeals.push({
              listingId: doc.id,
              ...data
            })
          })
          resolve(allDeals)
        })
      })
    }

    promises.push(order())    

    return Promise.all(promises).then(r => {
      console.log(r)
      this.setState({
        pinned: r.shift(),
        items: r.pop(),
      })
      return r
    })
  } 

  cardComponents = (arr) => {
    return arr.map(item => {
      return <ProductCard 
        key={new Date().valueOf() + "-" + item.title}
        id={item.id}
        item={item}
        isPinned={this.state.pinned.includes(item.id)}
        editPinnedDeals={this.editPinnedDeals}
      />
    })
  }
  
  editPinnedDeals = (isPinned, id) => {
    console.log(isPinned, id)
    if(isPinned) {
      this.setState(oldState => {
        const index = oldState.pinned.indexOf(id)
        oldState.pinned.splice(index, 1)
        return { ...oldState }
      })
    } else {
      this.setState(oldState =>({
        pinned: [...oldState.pinned, id],
      }))
    }
  }

  getData = async (orderBy, ascOrDesc, isPagination) => {
    console.log("%cfetching data! ", "font-size: 1.2em; color: orange")
    const order = async () => {
      let allDeals =[]
      return new Promise((resolve, reject) => {
        let qq = db.collection('listings').orderBy(orderBy, ascOrDesc)
        if (isPagination) {
          qq = qq.startAfter(this.state.items[this.state.items.length - 1][orderBy])
        }
        qq.limit(itemsPerPage).get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            let data = doc.data()
            allDeals.push({
              id: doc.id,
              ...data
            })
          })
          resolve(allDeals)
        }).catch(e => console.log(e))
      })
    }

    return await order()
  }

<<<<<<< HEAD
=======
  static async getInitialProps() {
    const order = async () => {
      let allDeals =[]
      return new Promise((resolve, reject) => {
        db.collection('listings').orderBy("newPrice" ,"desc").limit(itemsPerPage).get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            let data = doc.data()
            allDeals.push({
              listingId: doc.id,
              ...data
            })
          })
          resolve(allDeals)
        })
      })
    }
    return {items: await order()}
  }

  componentDidMount = () => {
    // grab current user from db
    // grab pined deals array from user
    // as you loop through the state "info",
    //   if (userPinnedDeals.contains(dealId))
    ///     pass a boolean prop to "<ProductCard />", "isPinned = true/false"
  }

>>>>>>> 8eaa31bb5f762c835bc471b0144cf4a20535687a
  changeOrder = async (e) => {
    let {orderBy, ascOrDesc } = JSON.parse(e)
    console.log(orderBy + ascOrDesc)
    console.log(this.state.orderBy + this.state.ascOrDesc)
    if (this.state.orderBy + this.state.ascOrDesc != orderBy + ascOrDesc) {
      let data = await this.getData(orderBy, ascOrDesc, false)
      console.log(data)
      this.setState({
        items: data,
        orderBy,
        ascOrDesc,
      })
    }
  }

  paginate = async (e) => {
    await this.setState({hideButton: true}) 

    let data = await this.getData(this.state.orderBy, this.state.ascOrDesc, true)
    
    this.setState(oldState => ({
      isMore: data.length > itemsPerPage ? true : false,
      items: [...oldState.items, ...data ],
    }))

  }


  render() {
    const { items } = this.state

    return (
      <>
      <BackTop />
        <Template>
        <div id="mainContent">    
          </div>
          <div id="searchHeader">
            <h3>Search Results:</h3>
          </div>
          <div id="filterResults">
            <div style={{width: "50%"}}>
              <FilterPopOut />
            </div>
            <div id="orderBy">
              <Select   
                showSearch
                style={{width: "100%",}}
                placeholder="Order by"
                optionFilterProp="children"
                onChange={e => this.changeOrder(e)}
                onSearch={this.onSearch}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                  <Option key="1" value={JSON.stringify({orderBy: 'newPrice', ascOrDesc: "asc",})}>Price (low to high)</Option>
                  <Option key="2" value={JSON.stringify({orderBy: 'newPrice', ascOrDesc: "desc",})}>Price (high to low)</Option>
                  <Option key="3" value={JSON.stringify({orderBy: 'repReward', ascOrDesc: "asc",})}>Reward (low to high)</Option>
                  <Option key="4" value={JSON.stringify({orderBy: 'repReward', ascOrDesc: "desc",})}>Reward (high to low)</Option>
                  <Option key="5" value={JSON.stringify({orderBy: 'amountOfOrders', ascOrDesc: "desc",})}>Most Popular</Option>
                  <Option key="6" value={JSON.stringify({orderBy: 'listedDate', ascOrDesc: "desc",})}>Newest</Option>
              </Select>
            </div>
          </div>
          <div id="productCards">
            {items ? (
              <InfiniteScroll
              dataLength={items.length} //This is important field to render the next data
              next={this.paginate}
              hasMore={this.state.isMore}
              loader={<div style={{width: "100%", height: "40px"}}><Spin style={{width: "100%"}} size="large" /></div>}
              endMessage={
                <p style={{textAlign: 'center'}}>
                  <b>{items.length} results</b>
                </p>
              }
              style={{display: "flex", flexWrap: "wrap", justifyContent: "center", paddingBottom: "20px"}}
              >
              {this.cardComponents(items)}
            </InfiniteScroll>
            ) : null }
          </div>
      </Template>
      <style jsx>{`
          :global(#productCards p) {
            width: 100%;
          }

          #productCards {
            width: 100%;
            margin: 25px 0;
          }

          .hide {
            display: none;
          }

          #mainContent {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
    
          #filterResults {
            position: sticky;
            z-index: 30;
            display: flex;
            flex-direction: row;
            top: 0;
          }

          #orderBy {
            width: 50%
            
          }
          #searchHeader {
            padding: 25px 0px 15px 0px;
            justify-content: left;
          }
  
    
        `}</style>
    </>
    )
  }
}

export default asRep(BrowseDeals)
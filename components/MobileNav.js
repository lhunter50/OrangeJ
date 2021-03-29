import React from 'react'
import { Icon } from 'antd'
import PopMenu from './PopMenu'

class MobileNav extends React.Component {
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
  render() {

    return (
      <>
        <div id="contentWrapper">
          <div id="mainContent">
            <img src="OjblackAndOrangeCircle1.png" alt="OJLogo" style={{width: "60px", marginLeft: "10px"}} />
          </div>
          <div id="searchBarWrapper">
            <form id="form-inline">
              <input id="searchBar" type="search" placeholder="Search" />
            </form>
          </div>
          <div id="popoutWrapper">
            <PopMenu />
          </div>
        </div>

        <style jsx>{`
          #contentWrapper {
            background-color: #5ac5dc;
            height: 80px;
            display: flex;
            align-items: center;
          }

          #popoutWrapper {
            position: absolute;
            right: 32px;
          }

          #searchBarWrapper {
            position: absolute;
            right: 76px;
          }

          @media only screen and (min-width: 1024px) {
            #userButtonWrapper, #popoutWrapper {
              display: none;
            }
          }

          #searchBar {
            -webkit-appearance: textfield;
            -webkit-box-sizing: content-box;
            font-family: inherit;
            font-size: 100%;
          }
          
          #searchBar {
            background: #050505 url(https://static.tumblr.com/ftv85bp/MIXmud4tx/search-icon.png) no-repeat 11px center;
            border: solid 3px #5ac5dc;
            background-color: #5ac5dc;
            padding: 12px 10px 5px 32px;
            width: 8px;
            border-radius: 10em;
            -webkit-transition: all .5s;
            -moz-transition: all .5s;
            transition: all .5s;
            color: transparent;
          }

          #searchBar:focus {
            width: 38vw;
            color: #000;
            background-color: #fff;
            outline: none;
          }

          #searchBar:-moz-placeholder {
            color: transparent;
          }

          #searchBar::-webkit-input-placeholder {
            color: transparent;
          }
        `}</style>
      </>
    )
  }
}

export default MobileNav
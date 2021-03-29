import React from 'react'
import Nav from './nav'
import OurFooter from './OurFooter'
import MobileNav from './MobileNav'
import DesktopNav from './DesktopNav'
import { Layout, Menu, Breadcrumb } from 'antd'
import PopMenu from './PopMenu'

const { Header, Content, Footer } = Layout

class Template extends React.Component {
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

  displayNavBar = () => {
    if(this.state.width <= 1024 ){
      return (
        <>
          <MobileNav />
        </>
      )
    } else {
      return (
        <DesktopNav />
      )
    }
  }

  render() {

    return (
      <Layout>
        {this.displayNavBar()}
        <Content className="site-layout" style={{  }}>
          <div className="site-layout-background">
            {this.props.children}
          </div>
        </Content>
        <OurFooter />
        <style jsx>
          {`
            .site-layout .site-layout-background {
              background: #fff;
              min-height: 100%;
            }
          `}
        </style>
      </Layout>
    )
  }
}

export default Template
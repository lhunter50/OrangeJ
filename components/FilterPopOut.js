import React from 'react'
import { Drawer, Button, Radio, Menu } from 'antd'
import {
  FilterFilled,
} from '@ant-design/icons';

const { SubMenu } = Menu

class PopMenu extends React.Component {
  state = {
    visible: false,
    placement: 'left',
  }

  handleClick = (e) => {

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

  render() {
    return(
      <>
        <Button type="primary"
          onClick={this.showDrawer}
          style={{
            height: 32, 
            width: "100%", 
            backgroundColor: "#5ac5dc", 
            borderColor: "#5ac5dc", 
            color: "white", 
            fontSize: "16px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          
        >
          <FilterFilled style={{fontSize: '20px', color: 'white', marginTop: "-3px"}}/>
          Filter
        </Button>
        <Drawer
          title="Filter"
          placement={this.state.placement}
          closeable="false"
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <Menu 
            onClick={this.handleClick}
            style={{ width: '100vw' }}
            mode="inline"
            defaultOpenKeys="sub1"
          >
            <SubMenu
              key="sub1"
              title={
                <span>
                  <span>Categories</span>
                </span>
              }
            >
              <SubMenu title="Food/Drink">
                <Menu.Item>Option 1</Menu.Item>
              </SubMenu>
              <SubMenu title="Beuty/Wellness/Healthcare">
                <Menu.Item>Option 1</Menu.Item>
              </SubMenu>
              <SubMenu title="Home/Auto/Local">
                <Menu.Item>Option 1</Menu.Item>
              </SubMenu>
              <SubMenu title="Leisure Offers/Activites">
                <Menu.Item>Option 1</Menu.Item>
              </SubMenu>
              <SubMenu title="Services">
                <Menu.Item>Option 1</Menu.Item>
              </SubMenu>
              <SubMenu title="Tickets">
                <Menu.Item>Option 1</Menu.Item>
              </SubMenu>
              <SubMenu title="Goods/Retail">
                <Menu.Item>Option 1</Menu.Item>
              </SubMenu>
              <SubMenu title="Travel">
                <Menu.Item>Option 1</Menu.Item>
              </SubMenu>
            </SubMenu>
          </Menu>
        </Drawer>
      </>
    )
  }
}

export default PopMenu
import React from 'react'
import { Menu } from 'antd'
import {
  CaretRightFilled,
  UserOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import { MenuContainer } from './MenuContainer'

const { SubMenu } = Menu

class SlideMenu extends React.Component {
  render(){
    var visibility = "hide"

    if(this.props.menuVisibility) {
      visibility = "show"
    }

    if(this.props.onMouseDown){

    }

    return (
      <>
        <div id="flyoutMenu"
          className={visibility}>
            
        <div id="menuTest"style={
          {
            width:"100%", 
            height:'100%', 
            backgroundColor:"white",           
          }}>
          <Menu 
              style={{ width: '75vw' }}
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
            >
              <SubMenu 
                key="sub1"
                title={
                  <span>
                    <MenuOutlined />
                  </span>
                }
              >
                <Menu.ItemGroup key="g1" title="Item 1">
                  <Menu.Item key="1">Option 1</Menu.Item>
                  <Menu.Item key="2">Option 2</Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup key="g2" title="Item 2">
                  <Menu.Item key="3">Option 3</Menu.Item>
                  <Menu.Item key="4">Option 4</Menu.Item>
                </Menu.ItemGroup>
              </SubMenu>
              <SubMenu
                key="sub2"
                title={
                  <span>
                    <MenuOutlined />
                  </span>
                }
              >
                <Menu.Item key="5">Option 5</Menu.Item>
                <Menu.Item key="6">Option 6</Menu.Item>
              </SubMenu>
              <SubMenu key="sub3"
                title={
                  <span>
                    <MenuOutlined />
                  </span>
                }              
              >
                <Menu.Item key="7">Option 7</Menu.Item>
                <Menu.Item key="8">Option8</Menu.Item>
              </SubMenu>
              <SubMenu key="sub4"
                title={
                  <span>
                    <MenuOutlined />
                  </span>
                }            
              >
                <Menu.Item key="9">Option 9</Menu.Item>
                <Menu.Item key="10">option 10</Menu.Item>
              </SubMenu>
              <div 
                  id="buttonThing"
                  onMouseDown={this.props.handleMouseDown}
                  className={visibility}
                  style={{width: '25vw', height: '100vh', color: 'grey'}}     
              >
          <p>WHAAAA</p>
        </div>

            </Menu> 
          </div>
        </div>
        <style jsx>
          {`
            #flyoutMenu {
              top: 0;
              left: 0;
              transition: transform .3s cubic-bezier(0, .52, 0, 1);
              overflow: auto;
              z-index: 1000;
              width: 100vw;
              height 100vh;
              position: fixed;

            }

            #flyoutMenu.hide {
              transform: translate3d(-75vw, 0, 0);
              width: 0vw;
              transition: transform .3s cubic-bezier(0, .52, 0, 1);

            }

            #flyoutMenu.show {
              color: rgba(0, 0, 0, 0.8); 
            }

            #menuTest {
              overflow-y: auto;
              overflow-x: hidden;
              width: 75vw;
            }

            #buttonThing.hide {
              transform: translate3d(-75vw, 0, 0);
              transition: transform .3s cubic-bezier(0, .52, 0, 1);
            }

            #buttonThing.show{
              transform: translate3d(0vw, 0, 0);
              overflow: hidden;
              background-color: rgba(0, 0, 0, .5);
              position: absolute;
              right: 0;
              top: 0;
              overflow: hidden;
              height: 100%;
              opacity: .50;
            }
          `}
        </style>
      </>
    )
  }
}

export default SlideMenu
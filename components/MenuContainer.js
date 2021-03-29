import React from 'react'
import SlideMenu from './Menu'
import { Menu } from 'antd'

const { SubMenu } = Menu

class MenuContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
 
    this.state = {
      visible: false
    };
 
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }
 
  toggleMenu() {
    this.setState({
      visible: !this.state.visible
    })
  }

  handleMouseDown(e) {
    this.toggleMenu()

    e.stopPropagation()
  }


  render(){
    return (
      <>
        <button id="roundButton"
            onMouseDown={this.handleMouseDown}>PRESS ME</button>
            
          <SlideMenu handleMouseDown={this.handleMouseDown}
                    menuVisibility={this.state.visible} />
        <style jsx>{`

        `}</style>
      </>      
    )
  }
}

export default MenuContainer
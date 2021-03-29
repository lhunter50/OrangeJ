import React, { useState } from 'react'
import {
  Collapse,
  Button,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap'
import { auth, firebase } from './../firebase/index'
import Router from 'next/router'

class nav extends React.Component {
  state = {
    isOpen: this.props.isOpen,
    signedIn: this.props.signedIn
  }

  static async getInitialProps(ctx) {
    const signedIn = await auth.currentUser ? true : false
    return { isOpen: false, signedIn: signedIn }
  }

  toggle = () => {
    this.setState(oldState => {
      if (oldState.isOpen) return {...oldState, isOpen: false,} 
      else return {...oldState, isOpen: true}
    })
  }
  
  handleLogout = () => {
    auth.signOut().then(function () {
      console.log('Logout successful');
      Router.push("/")
    }).catch(function (error) {
      console.log('Oops something went wrong check your console');
      console.log(err);
    });
  }

  render() {

    let currentUserMessage = ""
    auth.currentUser ? currentUserMessage = "Hi, " + auth.currentUser.email + "!" : null

    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">
          OrangeJacket
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                {auth.currentUser ? null : <NavLink href="/login">Login/Signup</NavLink>}
              </NavItem>
              <NavItem>
                <NavLink href="#">All Deals</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Option 1
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <form className="form-inline">
                <input className="form-control mr-sm-2" type="search" palceholder="Search"></input>
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
              </form>
              <NavItem >
                <Button onClick={this.handleLogout}>Logout</Button>
              </NavItem>
            </Nav>
  
            <NavbarText>{currentUserMessage}</NavbarText>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default nav;
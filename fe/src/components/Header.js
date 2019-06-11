import React, { Component } from 'react'
import { withRouter } from 'react-router'
import '../App.css'
import {
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  NavLink,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
const io = require('socket.io-client')
const socket = io()
const axios = require('axios')

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      isOpen: false,
      loggedIn: false
    }
  }

  componentWillMount() {
    if (!sessionStorage.getItem('token')) {
      this.props.history.push('/')
    } else {
      const newState = {
        username: sessionStorage.getItem('username'),
        loggedIn: true,
        isOpen: true
      }
      this.setState(newState)
    }
  }

  logout = () => {
    const address = `/api/logout?token=${sessionStorage.getItem('token')}`
    console.log(address)
    return axios
      .get(
        address,
        {
          email: sessionStorage.getItem('userId')
        },
        {
          headers: {
            accept: 'application/json',
            'accept-language': 'en_US',
            'content-type': 'application/json'
          }
        }
      )
      .then(response => {
        if (response.data.success === true) {
          console.log('GOT SOME RESPONSE', response)
          sessionStorage.clear()
          this.setState({ username: '', isOpen: false, loggedIn: false })
          this.props.history.push('/')
        } else {
          console.log(response.error)
        }
      })
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {
    const username = this.state.username ? this.state.username : 'Guest'
    let logoutBtn
    if (this.state.loggedIn) {
      logoutBtn = (
        <a
          onClick={e => {
            e.stopPropagation()
            e.nativeEvent.stopImmediatePropagation()
            this.logout()
          }}
        >
          Logout
        </a>
      )
    }
    const adderBtn = (
      <Button
        color="primary"
        onClick={e => {
          e.stopPropagation()
          e.nativeEvent.stopImmediatePropagation()
          socket.emit('increment')
          console.log(`Plus Clicked and countUpdated`)
        }}
      >
        Plus 1
      </Button>
    )
    return (
      <React.Fragment>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">reactstrap</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <NavLink>{adderBtn}</NavLink>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  {username}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>{logoutBtn}</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    <button>Plus 1</button>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </React.Fragment>
    )
  }
}

export default withRouter(Header)

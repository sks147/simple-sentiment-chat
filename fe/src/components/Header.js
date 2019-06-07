import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { NavLink } from 'react-router-dom'
import '../App.css'
import { Navbar, NavbarBrand } from 'reactstrap'
import axios from 'axios'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: ''
    }
  }

  componentWillMount() {
    if (!sessionStorage.getItem('token')) {
      this.props.history.push('/')
    } else {
      const newState = {
        username: sessionStorage.getItem('username'),
        loggedIn: true
      }
      this.setState(newState)
    }
  }

  logout = () => {
    return axios
      .get(
        process.env.REACT_APP_LOGOUT_API +
          `?token=${sessionStorage.getItem('token')}`,
        {
          email: sessionStorage.getItem('userid')
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
          sessionStorage.clear()
          this.props.history.push('/')
        } else {
          console.log(response.error)
        }
      })
  }

  render() {
    return (
      <React.Fragment>
        <Navbar color="dark" dark expand="lg" className="fixed-top">
          <NavbarBrand href="">
            <NavLink to={`/homepage`} className="nav-link">
              Sentiment
            </NavLink>
          </NavbarBrand>
        </Navbar>
      </React.Fragment>
    )
  }
}

export default withRouter(Header)

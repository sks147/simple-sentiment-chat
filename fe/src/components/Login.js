import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { NavLink } from 'react-router-dom'
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Button,
  Label
} from 'reactstrap'
import '../App.css'
import Alert from './Alert'
const axios = require('axios')

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      statusMsg: '',
      statusType: ''
    }
    if (sessionStorage.token) {
      this.props.history.push('/homepage')
    }
  }

  handleChange = event => {
    event.preventDefault()
    console.log('event= ', event, 'id=', event.target.id)
    this.setState({ ...this.state, [event.target.id]: event.target.value })
  }

  validateForm = () => {
    return this.state.email.length > 0 && this.state.password.length > 0
  }

  handleLoginSubmit = event => {
    event.preventDefault()
    axios
      .post(
        `/api/signin`,
        {
          email: this.state.email,
          password: this.state.password
        },
        {
          headers: {
            accept: 'application/json',
            'accept-language': 'en_US',
            'content-type': 'application/json',
            withCredentials: true
          }
        }
      )
      .then(response => {
        console.log('response:', response)

        if (response) {
          console.log('response:', response)
          if (response.data.success === true) {
            sessionStorage.setItem('token', response.data.token)
            sessionStorage.setItem('username', response.data.name)
            sessionStorage.setItem('userId', response.data.userId)

            axios.defaults.headers.common.token = sessionStorage.getItem(
              'token'
            )
            axios.defaults.headers.common[
              'session-id'
            ] = sessionStorage.getItem('token')

            this.props.history.push('/homepage')
          } else {
            this.setState({
              statusMsg: response.data.message,
              statusType: 'danger',
              password: ''
            })
          }
        } else {
          this.setState({
            statusMsg: 'Server Error',
            statusType: 'danger',
            password: ''
          })
        }
      })
      .catch(e => {
        this.setState({
          statusMsg: 'Something went wrong. Please try again',
          statusType: 'danger',
          password: ''
        })
        console.log(`ERROR in handleLoginSubmit: ${e.stack}`)
      })
  }

  render() {
    return (
      <React.Fragment>
        <Container>
          <h2 className="text-center">Log In</h2>
          <Form>
            <Alert type={this.state.statusType} msg={this.state.statusMsg} />
            <Row>
              <Col sm={{ size: 6, offset: 3 }}>
                <FormGroup>
                  <Label for="email">
                    <b>Email</b>
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    placeholder="Enter email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col sm={{ size: 6, offset: 3 }}>
                <FormGroup>
                  <Label for="password">
                    <b>Password</b>
                  </Label>
                  <Input
                    type="password"
                    id="password"
                    placeholder="Enter password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col sm={{ size: 3, offset: 3 }}>
                <Button
                  type="submit"
                  color="primary"
                  className="btn-block"
                  disabled={!this.validateForm()}
                  onClick={this.handleLoginSubmit}
                >
                  Login
                </Button>
              </Col>
              <Col sm={{ size: 3 }}>
                <NavLink to={'/signup'}>
                  <Button type="button" className="btn-block" color="danger">
                    Sign Up
                  </Button>
                </NavLink>
              </Col>
            </Row>
          </Form>
        </Container>
      </React.Fragment>
    )
  }
}

export default withRouter(Login)

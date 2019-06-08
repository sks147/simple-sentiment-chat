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

class SignUp extends Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleSignUpSubmit = this.handleSignUpSubmit.bind(this)
    this.validateForm = this.validateForm.bind(this)

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
    this.setState({ ...this.state, [event.target.id]: event.target.value })
  }
  validateForm = () => {
    return (
      this.state.name.length > 0 &&
      this.state.email.length > 0 &&
      this.state.password.length > 0
    )
  }

  handleSignUpSubmit = event => {
    event.preventDefault()
    const address = `/api/signup`
    axios
      .post(
        address,
        {
          name: this.state.name,
          password: this.state.password,
          email: this.state.email
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
        if (response) {
          if (response.data.success === true) {
            this.setState({
              statusMsg: response.data.message,
              statusType: 'success',
              password: ''
            })
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
        console.log(`ERROR in handleSignUpSubmit: ${e.stack}`)
      })
  }

  render() {
    return (
      <Container>
        <h2 className="text-center">Sign Up</h2>
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
                <Label for="name">
                  <b>Username</b>
                </Label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Enter username"
                  value={this.state.name}
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
          <br />
          <Row>
            <Col sm={{ size: 3, offset: 3 }}>
              <Button
                type="submit"
                color="primary"
                className="btn-block"
                disabled={!this.validateForm()}
                onClick={this.handleSignUpSubmit}
              >
                SignUp
              </Button>
            </Col>
            <Col sm={{ size: 3 }}>
              <NavLink to={'/'}>
                <Button type="button" className="btn-block" color="danger">
                  Cancel
                </Button>
              </NavLink>
            </Col>
          </Row>
        </Form>
      </Container>
    )
  }
}

export default withRouter(SignUp)

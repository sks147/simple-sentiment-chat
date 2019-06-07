import React, { Component } from 'react'
import { Route, HashRouter } from 'react-router-dom'
import Login from './components/Login'
import SignUp from './components/SignUp'
import './App.css'

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="App">
          <Route exact path="/" render={Login} />
          <Route exact path="/signup" component={SignUp} />
        </div>
      </HashRouter>
    )
  }
}

export default App

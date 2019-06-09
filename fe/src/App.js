import React, { Component } from 'react'
import { Route, HashRouter } from 'react-router-dom'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Homepage from './components/Homepage'
import Header from './components/Header'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Header></Header>
        <div className="App">
          <Route exact path="/" render={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/homepage" component={Homepage} />
        </div>
      </HashRouter>
    )
  }
}

export default App

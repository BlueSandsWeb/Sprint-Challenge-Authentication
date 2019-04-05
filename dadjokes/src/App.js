import React, { Component } from 'react';
import './App.css';
import { Route, NavLink } from 'react-router-dom';

import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Jokes from './components/Jokes/Jokes';

class App extends Component {
  render() {
    return (
      <div className="App">
        <nav>
          <NavLink to="/">Home</NavLink>&nbsp;|&nbsp;
          <NavLink to="/register">Register</NavLink>&nbsp;|&nbsp;
          <NavLink to="/login">login</NavLink>&nbsp;|&nbsp;
          <NavLink to="/jokes">jokes</NavLink>
        </nav>
        <main>
          <h1>Dad Jokes</h1>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/jokes" component={Jokes} />
        </main>
      </div>
    );
  }
}

function Home() {
  return (
    <>
      <p>we promise they're real groaners</p>
    </>
  )
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './Login';
import { Router } from "@reach/router"

class SignupPage extends React.Component {
  render() {
    return (
      <div>
        <h1>Signup Page</h1>
        <p className="centered-text">Back to <a href="/">login</a> Page</p>
      </div>
    );
  }
}

ReactDOM.render(
  <div>
    <Router>
      <Login path="/" />
    </Router>
    <Router>
      <SignupPage path="/sign_up" />
    </Router>
  </div>,
  document.getElementById('root')
);

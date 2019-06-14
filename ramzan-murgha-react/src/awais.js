import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Router, Link } from "@reach/router"
import { navigate } from "@reach/router"
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class ReqTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.props.onInputChange(event.target.value);
  }
  render() {
    return (
      <div>
        <label>
          <b>
            {this.props.label}:
          </b>
        </label>
        <input type={this.props.type} placeholder={this.props.label} onChange={this.handleChange} required />
      </div>
    )
  }
}
// ===================     Product Form Start     =====================
class ProductForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { product_name: '', device_number: '', device_type: 'mobile' };
    this.handleProductNameChange = this.handleProductNameChange.bind(this);
    this.handleDeviceNumberChange = this.handleDeviceNumberChange.bind(this);
    this.handleDeviceTypeChange = this.handleDeviceTypeChange.bind(this);
    // this.handleSubmit = this.handleSubmit(this);
  }
  handleProductNameChange(product_name) {
    console.log(product_name)
    this.setState({product_name: product_name});
  }
  handleDeviceNumberChange(device_number) {
    toast.info("Login Successfully !", {
      position: toast.POSITION.BOTTOM_CENTER
    });
    this.setState({device_number: device_number});
  }
  handleDeviceTypeChange(event) {
    this.setState({device_type: event.target.value});
  }
  handleSubmit = event => {
    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
      }
    };
    axios.post('http://localhost:3000/v1/products', {
      product: { name: this.state.product_name, number: this.state.device_number, device_type: this.state.device_type }
    }, axiosConfig)
    .then((res) => {
      console.log("RESPONSE RECEIVED: ", res);
      navigate("/add_product")
    });
    event.preventDefault();
  }
  render() {
    return(
      <div>
        <form className='signup-form'  onSubmit={this.handleSubmit}>
          <div className='container'>
            <div className='form-container'>
              <h1> Add product </h1>
              <hr />
              <div className='mar-bot-15'>
                <label>
                  <b> Pick your device type: </b>
                </label>
                <select value={this.state.value} className='form-control' onChange={this.handleDeviceTypeChange}>
                  <option value="mobile">Mobile</option>
                  <option value="laptop">Laptop</option>
                  <option value="computer">Computer</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className='row'>
                <div className='col-md-6'>
                  <ReqTextInput type='text' label='Product Name' onInputChange={this.handleProductNameChange} />
                </div>
                <div className='col-md-6'>
                  <ReqTextInput type='text' label='Device Number' onInputChange={this.handleDeviceNumberChange} />
                </div>
              </div>
              <input type="submit" className='registerbtn' value="Add Product" />
            </div>
          </div>
        </form>
      </div>
    )
  }
}
// ===================     Product Form End     =====================
// ===================     Login Form End     =====================
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email: '', password: '', error: false};
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleEmailChange(email) {
    this.setState({email: email});
  }
  handlePasswordChange(password) {
    this.setState({password: password});
  }
  handleSubmit(event) {
    // axios.post('http://localhost:3000/v1/users/sign_in', {
    //  email: this.state.email, password: this.state.password
    // });
    // console.log(this.state.password, this.state.email);
    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
      }
    };
    axios.post('http://localhost:3000/v1/users/sign_in', {
      email: this.state.email, password: this.state.password
    }, axiosConfig)
    .then((res) => {
      this.setState({error: true});
      toast.info("Login Successfully !", {
        position: toast.POSITION.BOTTOM_CENTER
      });
      console.log("RESPONSE RECEIVED: ", res);
      navigate("/add_product");
    });
    event.preventDefault();
  }
  render() {
    return (
      <div>
        <form className='signup-form' onSubmit={this.handleSubmit}>
          <div className='container'>
            <div className='form-container'>
              <h1>Login</h1>
              <p>Enter email and password to proceed.</p>
              <hr />
              <ReqTextInput type='text' label='Email' onInputChange={this.handleEmailChange} />
              <ReqTextInput type='password' label='Password' onInputChange={this.handlePasswordChange} />
              <hr />
              <input type="submit" className='registerbtn' value="Login" />
            </div>
          </div>
        </form>
        <div className="container signin">
          <span>Don't have an account? <Link to="/signup">Sign up</Link>.</span>
        </div>
      </div>
    );
  }
}
// ===================     Login Form End     =====================
class HomePage extends React.Component {
  render() {
    return (
      <div className='home-page'>
        <div className='container'>
          <div className='form-container'>
            <h3> Device Tracker Plus installs instantly and keeps your phone, and your family, safe.
                 But every second you're not tracking is a second they're not safe. So start tracking now.
            </h3>
            <hr />
            <div className='row'>
              <div className='col-md-6'>
                <h5> Lost Phone? </h5>
                <span> As a Device Tracker Plus member, if you lose your phone you can locate it instantly.
                    Plus we can also text and call any phone for 60 days to give you the best chance of getting it back. </span>
              </div>
              <div className='col-md-6'>
                <h5> Worried Parents? </h5>
                <p> Track your family's phones in real time to make sure they stay safe and are where they should be </p>
              </div>
            </div>
            <hr />
            <div className='row'>
              <div className='col-md-6'>
                <h5> Concerned adults </h5>
                <p> Track your wife's, husband's boyfriend's or girlfriend's phone so you always know where they are. </p>
              </div>
              <div className='col-md-6'>
                <h5> Anxious carers </h5>
                <p> Track your elderly, vulnerable parents' phones for that extra peace of mind. Are they out when they should be in? </p>
              </div>
            </div>
            <hr />
            <div className='btn-area'>
              <div className="row">
                <div className='col-md-6'>
                  <button className='btn btn-primary'>
                    <Link to="/signup">Sign up</Link>
                  </button>
                </div>
                <div className='col-md-6'>
                  <button className='btn btn-primary'>
                    <Link to="/login">Log in</Link>
                  </button>
                  <button className='btn btn-primary'>
                    <Link to="/add_product">Add Product</Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
// ===================     Signup Form Start     =====================
class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {first_name: '', last_name: '', email: '', password: '', password_confirmation: ''};
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePasswordConfirmationChange = this.handlePasswordConfirmationChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleFirstNameChange(first_name) {
    this.setState({first_name: first_name});
  }
  handleLastNameChange(last_name) {
    this.setState({last_name: last_name});
  }
  handleEmailChange(email) {
    this.setState({email: email});
  }
  handlePasswordChange(password) {
    this.setState({password: password});
  }
  handlePasswordConfirmationChange(password_confirmation) {
    this.setState({password_confirmation: password_confirmation});
  }
  handleSubmit(event) {
    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
      }
    };
    axios.post('http://localhost:3000/v1/users', {
      user: { first_name: this.state.first_name, last_name: this.state.last_name, email: this.state.email,
              password: this.state.password, password_confirmation: this.state.password_confirmation }
    }, axiosConfig)
    .then((res) => {
      if (res.data.status === 200) {
        navigate("/add_product");
      } else {
        alert(res.data.errors);
      }
    });
    // axios.post('http://localhost:3000/v1/users', {
    //   user: { first_name: this.state.first_name, last_name: this.state.last_name, email: this.state.email,
    //           password: this.state.password, password_confirmation: this.state.password_confirmation }
    // });
    console.log(this.state.first_name, this.state.last_name, this.state.email);
    event.preventDefault();
  }
  render() {
    return (
      <div>
        <form className='signup-form' onSubmit={this.handleSubmit}>
          <div className='container'>
            <div className='form-container'>
              <h1>Register</h1>
              <p>Please fill in this form to create an account.</p>
              <hr />
              <div className='row'>
                <div className='col-md-6'>
                  <ReqTextInput type='text' label='First Name' onInputChange={this.handleFirstNameChange} />
                </div>
                <div className='col-md-6'>
                  <ReqTextInput type='text' label='Last Name' onInputChange={this.handleLastNameChange} />
                </div>
              </div>
              <ReqTextInput type='text' label='Email' onInputChange={this.handleEmailChange} />
              <ReqTextInput type='password' label='Password' onInputChange={this.handlePasswordChange} />
              <ReqTextInput type='password' label='Password Confirmation' onInputChange={this.handlePasswordConfirmationChange} />
              <hr />
              <input type="submit" className='registerbtn' value="Create Account" />
            </div>
          </div>
        </form>
        <div className="container signin">
          <span>Already have an account? <Link to="/login">Sign in</Link>.</span>
        </div>
      </div>
    );
  }
}
// ===================     Signup Form End     =====================
ReactDOM.render(
  <div>
    <Router>
      <LoginForm path="/login" />
    </Router>
    <Router>
      <SignUpForm path="/signup" />
    </Router>
    <Router>
      <ProductForm path="/add_product" />
    </Router>
    <Router>
      <HomePage path="/" />
    </Router>
  </div>,
  document.getElementById('root')
);

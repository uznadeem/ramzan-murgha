import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
import './App.css';

class CockLogo extends React.Component {
  render () {
    return (
      <div className="text-center">
        <img src="https://cdn.pixabay.com/photo/2017/01/31/13/32/animals-2024070_960_720.png" alt="" width={this.props.width} />
      </div>
    );
  }
}

class InputField extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onInputChange(event.target.value);
  }

  render() {
    let req = null;
    if (this.props.req === 'true') {
      req = <span className="req">*</span>
    }

    let labelClass = null;
    if (this.props.value !== '') {
      labelClass = "active highlight"
    }

    return (
      <div className="field-wrap">
        <label className={labelClass}>
          {this.props.label}
          {req}
        </label>
        <input type={this.props.type} required autoComplete={this.props.auto_complete} onChange={this.handleChange} />
      </div>
    );
  }
}

class CredFields extends React.Component {
  render() {
    return (
      <div>
        <InputField label="Email Address" type="email" auto_complete="off" req="true" value={this.props.email} onInputChange={this.props.email_change} />
        <InputField label="Password" type="password" auto_complete="off" req="true" value={this.props.password} onInputChange={this.props.password_chage} />
      </div>
    );
  }
}

class LoginErrors extends React.Component {
  render () {
    const errorClass = this.props.has_error === 'true' ? 'alert alert-danger' : 'alert alert-danger hidden';
    return (
      <div className={errorClass} role="alert">
        <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
        <span className="sr-only">Error:</span>
        {this.props.errorMessage}
      </div>
    );
  }
}

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email: '', password: ''};
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
    console.log('Email: ' + this.state.email + ' Password: ' + this.state.password);

    const axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
      }
    };

    const params = {
      email: this.state.email,
      password: this.state.password,
    };

    axios.get('http://localhost:3000/users/sign_in', {
        params
      }, axiosConfig)
      .then(function (response) {
        if(response.data["resource"] !== null) {
          console.log(response);
          const cookies = new Cookies();
          cookies.set('current_user', response.data);
          console.log(cookies.get('current_user'));
          ReactDOM.render(
            <Login errorsClass='false' errorText='' />, document.getElementById('root')
          );
        }
        else {
          console.log(response.data["error"]);
          ReactDOM.render(
            <Login errorsClass='true' errorText={response.data["error"]} />, document.getElementById('root')
          );
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    event.preventDefault();
  }

  render() {
    const email = this.state.email;
    const password = this.state.password;
    return (
      <form onSubmit={this.handleSubmit}>
        <CredFields email={email} email_change={this.handleEmailChange} password={password} password_chage={this.handlePasswordChange} />
        <LoginErrors errorMessage={this.props.errorText} has_error={this.props.errorsClass} />

        <p className="centered-text"><a href="/">Forgot Password?</a></p>
        <button type="submit" className="button button-block">Log In</button>
        <p className="centered-text">Don't have an account?  <a href="sign_up">Sign up</a></p>
      </form>
    );
  }
}


class SettingsList extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const cookies = new Cookies();
    cookies.remove('current_user');
    ReactDOM.render(
      <Login errorsClass='false' errorText='' />, document.getElementById('root')
    );
  }

  render() {
    const cookies = new Cookies();
    const user = cookies.get('current_user');
    return (
      <ul className="nav navbar-nav navbar-right">
        <li><a><span className="glyphicon glyphicon-user"></span> {user.email} </a></li>
        <li><a onClick={this.handleClick}><span className="glyphicon glyphicon-log-out"></span> Logout</a></li>
      </ul>
    );
  }
}

class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="/">Ramzan Murgha!!</a>
          </div>
          <SettingsList />
        </div>
      </nav>
    );
  }
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <h1>{new Date().toLocaleTimeString()}</h1>
    );
  }
}

class AlarmTime extends React.Component {
  constructor(props) {
    var moment = require('moment');
    super(props);
    this.state = {
      inEditMode: false,
      inputTime: moment(this.props.alarm.alarmTime).format("HH:mm"),
      widgetTime: moment(this.props.alarm.alarmTime).format("hh:mm A")
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({inputTime: event.target.value});
  }

  handleClick() {
    this.setState(prevState => ({ inEditMode: !prevState.inEditMode }));
  }

  handleSubmit(alarmId) {
    var moment = require('moment');
    console.log('Hi');
    const cookies = new Cookies();
    var userCookie = cookies.get('current_user');

    const alarm_params = {
      id: alarmId,
      alarmTime: this.state.inputTime,
    };

    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    };

    axios.put(`http://localhost:3000/users/${userCookie.id}/alarms/${alarmId}`, {
        alarm_params
      }, axiosConfig)
      .then((response) => {
        if(response.status === 200) {
          this.setState(prevState => ({ inEditMode: !prevState.inEditMode,
                                        inputTime: moment(response.data.alarmTime).format("HH:mm"),
                                        widgetTime: moment(response.data.alarmTime).format("hh:mm A") }));
        }
      })
      .catch(function (response) {
        console.log('Error');
      });
  }

  render() {
    if (this.state.inEditMode) {
      return (
        <div>
          <input type="time" name="usrtime" value={this.state.inputTime} onChange={this.handleChange} />
          <span className="glyphicon glyphicon-ok margin-left-sm"
                aria-hidden="true"
                onClick={() => this.handleSubmit(this.props.alarm.id)} >
          </span>
        </div>
      );
    }
    else {
      return (
        <div>
          <div className="alarm_time"> {this.state.widgetTime} </div>
          <span onClick={this.handleClick}
                className="glyphicon glyphicon-pencil margin-left-sm"
                aria-hidden="true">
          </span>
        </div>
      );
    }
  }
}

class AlarmWidget extends React.Component {
  render () {
    return (
      <div className="col-md-3">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title text-center">
              {this.props.alarm.title}
            </h3>
          </div>
          <div className="panel-body text-center">
            <AlarmTime alarm={this.props.alarm} />
          </div>
        </div>
      </div>
    );
  }
}

class DashboardMainWidget extends React.Component {
  render () {

    const alarms = this.props.alarms

    const alarmWidgets = alarms.map((alarm) =>
      <AlarmWidget key={alarm.id} alarm={alarm} />
    );

    return (
      <div className="container">
        <div className="jumbotron">
          <CockLogo width="8%"/>
          <Clock />
          <p>Ramzan Murgha is an Islamic Alarm Application that reminds you of your prayers during Ramadhan.</p>
          <div className="row">
            {alarmWidgets}
          </div>
        </div>
      </div>
    );
  }
}

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {alarms: []};
  }

  componentDidMount() {
    const cookies = new Cookies();
    var userCookie = cookies.get('current_user');

    axios.get(`http://localhost:3000/users/${userCookie.id}/alarms`)
      .then((response) => {
        this.setState({ alarms: response.data });
      })
      .catch(function (response) {
        console.log('Error');
      });
  }

  render() {
    return (
      <div>
        <Navbar />
        <DashboardMainWidget alarms={this.state.alarms} />
      </div>
    );
  }
}

class Login extends React.Component {
  render() {
    const cookies = new Cookies();
    var userCookie = cookies.get('current_user');
    if (userCookie == null) {
      return (
        <div className="form">
          <CockLogo width="12%"/>
          <h1>Ramzan Murghaa!!</h1>
          <LoginForm errorsClass={this.props.errorsClass} errorText={this.props.errorText} />
        </div>
      );
    }
    return (
      <Dashboard />
    );
  }
}

export default Login;

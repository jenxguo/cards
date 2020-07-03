import React from 'react';
import {firebaseConnect} from 'react-redux-firebase'
import {connect} from 'react-redux';
import {compose} from 'redux';
import {Redirect} from 'react-router-dom';
import {Link, withRouter} from 'react-router-dom';
import './Register.css';

class PageRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      username: '',
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value, error: ''});
  }

  register = async () => {
    const credentials = {
      email: this.state.email,
      password: this.state.password,
    };

    const profile = {
      email: this.state.email,
      username: this.state.username
    }

    try {
      await this.props.firebase.createUser(credentials, profile);
    } catch (error) {
      this.setState({error: error.message});
    }
  };

  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to="/"/ >;
    }

    return (
      <div className="register">
        <h2>Register</h2>
        <div>
          <div>{this.state.error}</div>
          <input name="email" onChange={this.handleChange} placeholder="Email" value={this.state.email}/>
          <br/>
          <input name="username" onChange={this.handleChange} placeholder="Username" value={this.state.username}/>
          <br/>
          <input name="password" type="password" onChange={this.handleChange} placeholder="Password" value={this.state.password}/>
        </div>
        <br/>
        <button disabled={!this.state.username.trim()} onClick={this.register}>Register!</button>
        <hr/>
        <Link to="/">Home</Link> / <Link to="/login">Login</Link>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {isLoggedIn: state.firebase.auth.uid};
};

export default compose(
  firebaseConnect(),
  connect(mapStateToProps))(PageRegister);

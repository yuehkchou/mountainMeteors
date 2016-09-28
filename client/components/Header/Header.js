import React from 'react';

// import { Nav, Navbar, NavItem, Header, Brand } from 'react-bootstrap';
import { Link } from 'react-router';
import css from '../../styles/style.css';

import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { signUpUser, loginUser } from '../../actionCreators/accountActions'

class Header extends React.Component {

  constructor(){
    super();
    this.state = {
      authenticated: false,
      signUpEmail: '',
      signUpPassword: '',
      loginEmail: '',
      loginPassword: ''
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.signUpSubmit = this.signUpSubmit.bind(this);
    this.loginSubmit = this.loginSubmit.bind(this);
  }

  login(){
   this.setState({authenticated: true});
  }

  logout(){
   this.setState({authenticated: false});
  }

  handleInputChange(input) {
    // console.log('SETTING STATE AT', input.target.name, 'TO', input.target.value);
    var stateObj = {};
    stateObj[input.target.name] = input.target.value;
    this.setState(stateObj);
  }

  signUpSubmit(e) {
    e.preventDefault();
    this.props.signUpUser({email: this.state.signUpEmail, password: this.state.signUpPassword});
  }

  loginSubmit(e) {
    e.preventDefault();
    this.props.loginUser({email: this.state.loginEmail, password: this.state.loginPassword});
  }

  renderLinks(){
    if(this.state.authenticated){
      return <li className="nav-item">
        <Link className="nav-link" to="/signout">Sign Out</Link>
      </li>
    } else {
      return [
      <li className="nav-item" key={1}>
        {/*<Link className="nav-link" to="/signin">Sign In</Link>*/}
        <form onSubmit={this.signUpSubmit}>
          <input name="signUpEmail" value={this.state.signUpEmail} placeholder="e-mail" onChange={this.handleInputChange}></input>
          <input name="signUpPassword" type="password" value={this.state.signUpPassword} placeholder="password" onChange={this.handleInputChange}></input>
          <button type="submit">Signup</button>
        </form>
      </li>,
      <li className="nav-item" key={2}>
        {/*<Link className="nav-link" to="/signup">Sign Up</Link>*/}
        <form onSubmit={this.loginSubmit}>
          <input name="loginEmail" value={this.state.loginEmail} placeholder="e-mail" onChange={this.handleInputChange}></input>
          <input name="loginPassword" type="password" value={this.state.loginPassword} placeholder="password" onChange={this.handleInputChange}></input>
          <button type="submit">Login</button>
        </form>
      </li>
      ];
    }
  }


 render(){
  return (
    <nav className="navbar navbar-light">
      <ul className="nav navbar-nav">
        {this.renderLinks()}
      </ul>
      <h1 className="title">
        <Link to="/">seekPad</Link>
      </h1>
    </nav>
  );
 }

}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ signUpUser, loginUser }, dispatch)
}

export default connect(null, mapDispatchToProps)(Header)

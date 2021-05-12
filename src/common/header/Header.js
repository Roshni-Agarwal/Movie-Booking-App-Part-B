import React, { Component } from "react";
import MovieLogo from "../../assets/logo.svg";
import "./Header.css";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import PropTypes from "prop-types";
import FormHelperText from "@material-ui/core/FormHelperText";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
const TabContainer = function (props) {
  return (
    <Typography component="div" style={{ padding: 0, textAlign: "center" }}>
      {props.children}
    </Typography>
  );
};
TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

//changing to function component
class Header extends Component {

  constructor() {
    super();
    this.state = {
      modalIsOpen: false,
      value: 0,
      usernameRequired: "dispNone",
      username: "",
      loginPasswordRequired: "dispNone",
      loginPassword: "",
      firstnameRequired: "dispNone",
      firstname: "",
      lastnameRequired: "dispNone",
      lastname: "",
      emailRequired: "dispNone",
      email: "",
      registerPasswordRequired: "dispNone",
      registerPassword: "",
      contactRequired: "dispNone",
      contact: "",
      login:"dispNone",
      isLoggedin: false,
      registrationSuccess: false,
      loggedIn: sessionStorage.getItem("access-token") == null ? false : true,
    };
  }
  openModalHandler = () => {
    this.setState({
      modalIsOpen: true,
      value: 0,
      usernameRequired: "dispNone",
      username: "",
      loginPasswordRequired: "dispNone",
      loginPassword: "",
      firstnameRequired: "dispNone",
      firstname: "",
      lastnameRequired: "dispNone",
      lastname: "",
      emailRequired: "dispNone",
      email: "",
      registerPasswordRequired: "dispNone",
      registerPassword: "",
      contactRequired: "dispNone",
      contact: "",
    });
  };
  closeModalHandler = () => {
    this.setState({ modalIsOpen: false });
  };
  tabChangeHandler = (event, value) => {
    this.setState({ value });
  };
  loginClickHandler = async () => {
    this.state.username === ""
      ? this.setState({ usernameRequired: "dispBlock" })
      : this.setState({ usernameRequired: "dispNone" });
    this.state.loginPassword === ""
      ? this.setState({ loginPasswordRequired: "dispBlock" })
      : this.setState({ loginPasswordRequired: "dispNone" });
    let that = this;

      const requestOptions = {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa(this.state.username + ':' + this.state.loginPassword)
       },
    };
    let resp = await fetch('http://localhost:8085/api/v1/auth/login/', requestOptions)
let data =  await resp.json();
console.log(data);
             if (data && data.status == "ACTIVE") {
            //this.setState.isLoggedin = true;
            //this.setState.modalIsOpen = false;
            this.setState({ isLoggedin: true });
            this.setState({ modalIsOpen: false });
          }    
    // .then(response => response.json())
        // .then(function(data) {
        //   console.log(that);
 
        // });
    };
  inputUsernameChangeHandler = (e) => {
    this.setState({ username: e.target.value });
  };
  inputLoginPasswordChangeHandler = (e) => {
    this.setState({ loginPassword: e.target.value });
  };
  registerClickHandler = () => {
    this.state.firstname === ""
      ? this.setState({ firstnameRequired: "dispBlock" })
      : this.setState({ firstnameRequired: "dispNone" });
    this.state.lastname === ""
      ? this.setState({ lastnameRequired: "dispBlock" })
      : this.setState({ lastnameRequired: "dispNone" });
    this.state.email === ""
      ? this.setState({ emailRequired: "dispBlock" })
      : this.setState({ emailRequired: "dispNone" });
    this.state.registerPassword === ""
      ? this.setState({ registerPasswordRequired: "dispBlock" })
      : this.setState({ registerPasswordRequired: "dispNone" });
    this.state.contact === ""
      ? this.setState({ contactRequired: "dispBlock" })
      : this.setState({ contactRequired: "dispNone" });
      (this.state.firstname !== ""&&this.state.lastname !== ""&&this.state.email !== ""&&this.state.registerPassword !== ""&& this.state.contact !== "")?this.setState({login:"dispBlock"}):(this.setState({login:"dispNone"}));
    
    
    // payload

    const registerPayload = {
      "email_address": this.state.email,
      "first_name": this.state.firstname,
      "last_name": this.state.lastname,
      "mobile_number": this.state.contact,
      "password": this.state.registerPassword
    }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registerPayload)
  };
  fetch('http://localhost:8085/api/v1/signup/', requestOptions)
      .then(response => response.json())
      .then(data => this.setState(console.log(data)));


    };
  inputFirstNameChangeHandler = (e) => {
    this.setState({ firstname: e.target.value });
  };
  inputLastNameChangeHandler = (e) => {
    this.setState({ lastname: e.target.value });
  };
  inputEmailChangeHandler = (e) => {
    this.setState({ email: e.target.value });
  };
  inputRegisterPasswordChangeHandler = (e) => {
    this.setState({ registerPassword: e.target.value });
  };
  inputContactChangeHandler = (e) => {
    this.setState({ contact: e.target.value });
  }; 
  logoutHandler = (e) => {
    sessionStorage.removeItem("uuid");
    sessionStorage.removeItem("access-token");

    this.setState({
      loggedIn: false,
    });
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <header className="header">
          <img src={MovieLogo} alt="logo" id="image" />
          {!this.state.loggedIn ? (
          <div className="login-button">
            <Button
              variant="contained"
              color="default"
              onClick={this.openModalHandler}
            >
              Login
            </Button>
          </div>
          ):(
            <div className="login-button">
              <Button
                variant="contained"
                color="default"
                onClick={this.logoutHandler}
              >
                Logout
              </Button>
            </div>
          )}
          {this.props.showBookShowButton && this.state.isLoggedin ? (
            <div className="booknow-button">
              <Link to={"/bookshow/" + this.props.id} style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="primary" >
                  Book Show
                </Button>
              </Link>
            </div>
          ) : this.props.showBookShowButton ? (
            <div className="booknow-button">
              <Button variant="contained" color="primary" onClick={this.openModalHandler}>
                  Book Show
                </Button>
            </div>
          ) : (
            ""
          )}
        </header>

        <Modal
          ariaHideApp={false}
          isOpen={this.state.modalIsOpen}
          contentLabel="Login"
          onRequestClose={this.closeModalHandler}
          style={customStyles}
        >
          <Tabs
            className="tabs"
            value={this.state.value}
            onChange={this.tabChangeHandler}
          >
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>
          {this.state.value === 0 && (
            <TabContainer>
              <FormControl required>
                <InputLabel htmlFor="username">Username</InputLabel>
                <Input
                  id="username"
                  type="text"
                  username={this.state.username}
                  onChange={this.inputUsernameChangeHandler}
                />
                <FormHelperText className={this.state.usernameRequired}>
                  <span className="red">required</span>
                </FormHelperText>
              </FormControl>
              <br />
              <br />
              <FormControl required>
                <InputLabel htmlFor="loginPassword">Password</InputLabel>
                <Input
                  id="loginPassword"
                  type="password"
                  loginpassword={this.state.loginPassword}
                  onChange={this.inputLoginPasswordChangeHandler}
                />
                <FormHelperText className={this.state.loginPasswordRequired}>
                  <span className="red">required</span>
                </FormHelperText>
              </FormControl>
              <br />
              <br />
              {this.state.loggedIn === true && (
                <FormControl>
                  <span className="successText">Login Successful!</span>
                </FormControl>
              )}
              <br />
              <br />
              <Button
                variant="contained"
                color="primary"
                onClick={this.loginClickHandler}
              >
                LOGIN
              </Button>
            </TabContainer>
          )}
          {this.state.value === 1 && (
            <TabContainer>
              <FormControl required>
                <InputLabel htmlFor="firstname">First Name</InputLabel>
                <Input
                  id="firstname"
                  type="text"
                  firstname={this.state.firstname}
                  onChange={this.inputFirstNameChangeHandler}
                />
                <FormHelperText className={this.state.firstnameRequired}>
                  <span className="red">required</span>
                </FormHelperText>
              </FormControl>
              <br />
              <br />
              <FormControl required>
                <InputLabel htmlFor="lastname">Last Name</InputLabel>
                <Input
                  id="lastname"
                  type="text"
                  lastname={this.state.lastname}
                  onChange={this.inputLastNameChangeHandler}
                />
                <FormHelperText className={this.state.lastnameRequired}>
                  <span className="red">required</span>
                </FormHelperText>
              </FormControl>
              <br />
              <br />
              <FormControl required>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input
                  id="email"
                  type="text"
                  email={this.state.email}
                  onChange={this.inputEmailChangeHandler}
                />
                <FormHelperText className={this.state.emailRequired}>
                  <span className="red">required</span>
                </FormHelperText>
              </FormControl>
              <br />
              <br />
              <FormControl required>
                <InputLabel htmlFor="registerPassword">Password</InputLabel>
                <Input
                  id="registerPassword"
                  type="password"
                  registerpassword={this.state.registerPassword}
                  onChange={this.inputRegisterPasswordChangeHandler}
                />
                <FormHelperText className={this.state.registerPasswordRequired}>
                  <span className="red">required</span>
                </FormHelperText>
              </FormControl>
              <br />
              <br />
              <FormControl required>
                <InputLabel htmlFor="contact">Contact No.</InputLabel>
                <Input
                  id="contact"
                  type="text"
                  contact={this.state.contact}
                  onChange={this.inputContactChangeHandler}
                />
                <FormHelperText className={this.state.contactRequired}>
                  <span className="red">required</span>
                </FormHelperText>
              </FormControl>
              <br />
              <br />
              <FormHelperText className={this.state.login} style={{textAlign:'center', marginBottom:'1%',justifyContent:'center'}}>
                <span >Registration Successful. Please Login!</span>
              </FormHelperText>
              <Button
                variant="contained"
                color="primary"
                onClick={this.registerClickHandler}
              >
                REGISTER
              </Button>
            </TabContainer>
          )}
        </Modal>
      </div>
    );
  }
}
export default Header;

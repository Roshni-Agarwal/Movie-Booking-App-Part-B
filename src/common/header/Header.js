import React, { Component } from "react";
import MovieLogo from "../../assets/logo.svg";
import "./Header.css";
import Button from "@material-ui/core/Button";


class Header extends Component {
  render() {
    let token;
    return (
      <div>
        <header class="header">
          <img src={MovieLogo} alt="logo" id="image" />
          
        </header>
        
       
      </div>
    );
  }
}
export default Header;
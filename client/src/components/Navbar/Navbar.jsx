import React from 'react';
import {  NavLink } from "react-router-dom";
import logo from '../../Assets/img/tftLogo.png';
import "./navBar.css";
const Navbar =({handleLoginClick}) =>{
  const handleClick = () => {
    handleLoginClick();
  };
  return (
    <>
    <nav className="main-nav">
      {/* 1st logo part  */}
      <div className="logo">
      <img src={logo} alt={'Logo'}/>
        <h2>
          <span>C</span>rowd
          <span> F</span>unding
        </h2>
      </div>

      {/* 2nd menu part  */}
      <div
        className="menu-link">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/Projects">Projects</NavLink>
          </li>
          <li>
            <NavLink to="/Create">Create Project</NavLink>
          </li>
        </ul>
      </div>
      <div className='btnContainer'>
        <button onClick={handleClick}>Sign Up</button>
        </div>
    </nav>
    </>
  );
}
export default Navbar;
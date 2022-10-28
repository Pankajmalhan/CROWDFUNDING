import React from 'react';
import {  NavLink } from "react-router-dom";
import logo from '../../Assets/img/tftLogo.png';
import "./navBar.css";
import {
  checkCorrectNetwork,
  checkWalletAvailable,
  getMainBalance,
  getUserAddress,
} from "../../actions/Web3Actions";

const connectMetamask=async() =>{
  let checkWallet = await checkWalletAvailable();
  let userAddress = await getUserAddress();

  if(checkWallet === true){
   console.log('Wallet is available');
   console.log('Address:',userAddress);
  }
  else{
   console.log('Wallet is not available');
  }
}

const Navbar= () =>{
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
            <NavLink to="/AboutUs">About Us</NavLink>
          </li>
          <li>
            <NavLink to="/contact">contact</NavLink>
          </li>
        </ul>
      </div>
      <div className='btnContainer'>
        <button onClick={connectMetamask}>Sign Up</button>
        </div>
    </nav>
    </>
  );
}
export default Navbar;
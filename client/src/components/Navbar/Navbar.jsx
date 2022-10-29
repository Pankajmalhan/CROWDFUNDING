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
import {AiFillLock ,AiOutlineUsergroupAdd} from 'react-icons/ai'


const Navbar= ({handleLoginClick}) =>{
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
        <div className='connect'>
        <button onClick={connectMetamask}>Connect Wallet <AiFillLock/></button>
        </div>
        <div className='signUp'>
        <button onClick={handleClick}>Sign Up <AiOutlineUsergroupAdd/></button>
        </div>
        </div>
    </nav>
    </>
  );
}
export default Navbar;
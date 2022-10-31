import React,{useEffect, useContext} from 'react';
import {  NavLink } from "react-router-dom";
import logo from '../../Assets/img/tftLogo.png';
import "./navBar.css";
import {AiFillLock ,AiOutlineUsergroupAdd} from 'react-icons/ai'
import ProfileCard from '../Cards/ProfileCard';
import Web3 from 'web3';

import { WalletContext } from '../../web3context/walletContext';



const Navbar= ({handleLoginClick}) =>{

  const context = useContext(WalletContext);
  console.log(context)
  const {connect, wallet } = context;


   const handleSignMessage = async (
    publicAddress,
    nonce)=> {
    try {
      let web3=new Web3(window.ethereum);
      const signature = await web3.eth.personal.sign(
        `I am signing my one-time nonce: ${nonce}`,
        publicAddress,
        '' // MetaMask will ignore the password argument here
      );
     handleAuthenticate(publicAddress,signature);
    } catch (err) {
      console.log(err);
      throw new Error('You need to sign the message to be able to log in.');
    }
  };

 const  handleAuthenticate = (
    publicAddress,
    signature
  ) =>{
    fetch(`http://localhost:4080/validateUser`, {
      body: JSON.stringify({ publicAddress, signature }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    }).then(response => response.json()).then((data)=>{console.log(data)});
  }

 const handleSignup =async (publicAddress) => {
     fetch(`http://localhost:4080/register`, {
      body: JSON.stringify({ publicAddress }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    }).then(response => response.json()).then((user)=>{handleSignMessage(user?.data.publicAddress,user?.data.nonce)}).catch((err)=>console.log(err));
  };

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
        <button style={{backgroundColor: !false ? "rgba(0, 0, 0, 0.5)" : ""}} onClick={connect}>Connect Wallet <AiFillLock/></button>
        </div>
        <div className='signUp'>
        {!wallet ? <button onClick={handleClick}>Sign Up <AiOutlineUsergroupAdd/></button> : 
        <ProfileCard/>}
        </div> 
        </div>
    </nav>
    <div className='container' >
      <h3 style={{color: !!wallet ? "green" : "red"}}> Metamask Wallet: {!!wallet ? `${wallet} (Connected)` :  "Not connected"}</h3>
    </div>
    
    </>
  );
}
export default Navbar;
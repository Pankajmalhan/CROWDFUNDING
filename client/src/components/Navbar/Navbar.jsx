import React,{useEffect} from 'react';
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
import ProfileCard from '../Cards/ProfileCard';


const Navbar= ({handleLoginClick}) =>{
  const [address,setAddress] = React.useState("")

  useEffect(()=>{
    setAddress(address)
  },[address])
  
  const connectMetamask=async() =>{
    let checkWallet = await checkWalletAvailable();
    let userAddress = await getUserAddress();
  
    if(checkWallet === true){
     console.log('Wallet is available');
     console.log('Address:',userAddress);
     setAddress(userAddress)
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
        <button style={{backgroundColor: !false ? "rgba(0, 0, 0, 0.5)" : ""}} onClick={connectMetamask}>Connect Wallet <AiFillLock/></button>
        </div>
        <div className='signUp'>
        {!true ? <button onClick={handleClick}>Sign Up <AiOutlineUsergroupAdd/></button> : 
        <ProfileCard/>}
        </div> 
        </div>
    </nav>
    <div className='container' >
      <h3 style={{color: !!address ? "green" : "red"}}> Metamask Wallet: {!!address ? `${address} (Connected)` :  "Not connected"}</h3>
    </div>
    
    </>
  );
}
export default Navbar;
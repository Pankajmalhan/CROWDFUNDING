import React,{useEffect} from 'react';
import {  NavLink } from "react-router-dom";
import logo from '../../Assets/img/tftLogo.png';
import "./navBar.css";
import Web3 from 'web3';
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
     setAddress(userAddress);
     if(userAddress){
        fetch(`http://localhost:4080/users/getNonce`, {
      body: JSON.stringify({ publicAddress:userAddress }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
      .then(response => response.json())
      // If yes, retrieve it. If no, create it.
      .then((user)=>{
        if(!user.data){
          console.log("hii");
          handleSignup(userAddress);
        }
        else{
          console.log("byee");
          handleSignMessage(user?.data.publicAddress,user?.data.nonce)
        }
       //  users.length ? users[0] : handleSignup(userAddress)})
     })
          //  .then(handleSignMessage())
      // Send signature to backend on the /auth route
      // .then(handleAuthenticate)
      // Pass accessToken back to parent component (to save it in localStorage)
      // --snip--
  };
     }
    
    else{
     console.log('Wallet is not available');
    }
  }

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
        <button style={{backgroundColor: !false ? "rgba(0, 0, 0, 0.5)" : ""}} onClick={connectMetamask}>Connect Wallet <AiFillLock/></button>
        </div>
        <div className='signUp'>
        {true ? <button onClick={handleClick}>Sign Up <AiOutlineUsergroupAdd/></button> : 
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
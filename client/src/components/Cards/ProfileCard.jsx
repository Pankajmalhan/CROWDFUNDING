import React from "react";
import Image from '../../Assets/img/ethereum-boost.webp'
const ProfileCard = (userAddress , networkInfo) => {
  console.log(networkInfo, "networkInfo")
  function addressView(userAddress){
    if(!!userAddress){
      let address = `${userAddress.slice(0,5)}....${userAddress.slice(-5)}`
      return address
    }
    else return
  }
  return(
    <div className="profile">
        <div className="profileTop">
            {/* top */}
            <img src={Image}></img>
            <div> connected to : {`${networkInfo}`}<br/>{addressView(userAddress?.publicAddress)} </div>
        </div>
    </div>
  ) 
};

export default ProfileCard;

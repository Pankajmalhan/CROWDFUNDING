import React from "react";
import Image from '../../Assets/img/ethereum-boost.webp'
const ProfileCard = () => {
  return(
    <div className="profile">
        <div className="profileTop">
            {/* top */}
            <img src={Image}></img>
            <div> Logged in as : <br/>Admin </div>
        </div>
    </div>
  ) 
};

export default ProfileCard;

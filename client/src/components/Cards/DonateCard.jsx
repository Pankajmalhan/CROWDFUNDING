import React from "react";
import {SiEthereum} from "react-icons/si"

function DonateCard(){
    return (
        <div className="donateCard">
            <h1>Contribute Now !</h1>
            <p>Amount in Ether you want to contribute</p>
            <input  type={"number"} min={"10"} placeholder="Enter Ammount"/>
            <button name="Donate"> Donate Now<SiEthereum style={{fontSize:"2rem"}}/></button>
        </div>
    )
}
export default DonateCard
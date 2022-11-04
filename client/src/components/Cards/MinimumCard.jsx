import React from "react";
import ProgressBar from "../ProgressBar/ProgressBar";
function Minimum({text1, text2 , target}){
    React.useEffect(() => {
        // setInterval(() => setCompleted(Math.floor(Math.random() * 100) + 1), 2000);
      }, []);
    return <>
    <div className="minimumCard">
        <h1>{text1}</h1><hr/>
        <p>{text2}</p>
        {target && (<>
            <ProgressBar  bgcolor={"hsla(0, 100%, 26%, 1)"} completed={47}/>
        </>)}
    </div>
    </>
}

export default Minimum;
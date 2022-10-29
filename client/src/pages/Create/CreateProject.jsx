import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "../../Assets/img/eth.png";
export const CreateProject = () => {
  function handleSubmit() {
    console.log("handlesubmit part");
  }
  return (
    <div className="container">
      <div className="divider">
      
        <div className="form-campaign">
        
          <h1>Create your project</h1>
          <form>
            <div className="projecttitle">
              <h2>Title</h2>
              <input></input>
            </div>
            <div className="description">
              <h2>Description:</h2>
              <input className="desc"></input>
            </div>
            <div className="deadline">
              <h2>Deadline:</h2>
              <input></input>
            </div>
            <div className="targetprice">
              <h2>Target Price</h2>
              <input></input>
            </div>
            <div className="mincontribution">
              <h2>Minimum Contribution</h2>
              <input></input>
            </div>
            <div className="address">
              <h2>Metamask Address</h2>
              <input></input>
            </div>
            <button
              type="submit"
              class="btn btn-primary btn-lg"
              style={{
                justifyContent: "center",
                alignSelf: "flex-start",
                padding: "1rem",
                margin: "1rem",
                backgroundColor: "hsla(0, 100%, 26%, 1)",
              }}
            >
              Submit
            </button>
          </form>
        </div>
        <div className="imgholder">
          <img src={Image}></img>
        </div>
      </div>
    </div>
  );
};

import React from "react";
import Image from "../../Assets/img/eth.png";
import { getUserAddress } from "../../actions/Web3Actions";
export const CreateProject = () => {
  const [userAddress, setUserAddress] = React.useState("");
  function handleSubmit() {
    console.log("handlesubmit part");
  }

  React.useEffect(() => {
    setAddress();
  }, [userAddress]);
  async function setAddress() {
    const address = await getUserAddress();
    console.log(address, "ad");
    setUserAddress(address);
    return address;
  }
  function copy(text) {
    navigator.clipboard.writeText(text);
  }
  return (
    <div className="container">
      <div className="divider">
        <div className="form-campaign">
          <h1>Create your project</h1>
          <form>
            <div className="projecttitle">
              <h2>Title:</h2>
              <input></input>
            </div>
            <div className="description">
              <h2>Description:</h2>
              <input type={"textarea"} className="desc"></input>
            </div>
            <div className="deadline">
              <h2>Deadline:</h2>
              <input></input>
            </div>
            <div className="targetprice">
              <h2>Target Price:</h2>
              <input></input>
            </div>
            <div className="mincontribution">
              <h2>Minimum Contribution:</h2>
              <input></input>
            </div>
            <div className="address">
              <h2>Metamask Address:</h2>
              <label
                className="metamask"
                style={{ fontSize: "1.5rem" }}
                onClick={copy(userAddress)}
              >
                {userAddress}
              </label>
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
              onClick={handleSubmit}
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

import React from "react";
import Image from "../../Assets/img/eth.png";
import { getUserAddress } from "../../actions/Web3Actions";
import { useForm, useWatch } from "react-hook-form";
import { copy } from "../../helper/function";

import ABI from "../../contracts/ProjectFactory.json";
import { ethers, utils } from "ethers";
import { useContext } from "react";
import Web3 from "web3";
import { WalletContext } from "../../web3context/walletContext";

export const CreateProject = () => {
  const context = useContext(WalletContext);
  const { wallet } = context;

  const [userAddress, setUserAddress] = React.useState("");
  const {
    register,
    control,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const data = useWatch({ control });

  React.useEffect(() => {
    setAddress();
  }, [userAddress]);

  async function setAddress() {
    const address = await getUserAddress();
    setUserAddress(address);
    return address;
  }

  function onSubmit(e) {
    if (data) {
      const res = { ...data, ...{ publicAddress: userAddress ?? "" } };
      console.log(res, "data");
    }
  }

  const submitToBlockchain = async (e) => {
    // e.preventDefault();
    const factoryContractAddress = "0x224b4beFf9d3Eb0e2A241e1ba631f007eC0f6d86";
    const abi = ABI.abi;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const wallet_signer = provider.getSigner(wallet);

    if (data) {
      const res = { ...data, ...{ publicAddress: userAddress ?? "" } };
      console.log(res, "data");
    }

    const factoryContract = new ethers.Contract(
      factoryContractAddress,
      abi,
      wallet_signer
    );

    let tx = await factoryContract.createNewProject("Title", "Desc", 100, 0, 1);
    console.log(tx);
    console.log(await tx.wait(3));
  };

  return (
    <div className="container">
      <div className="divider">
        <div className="form-campaign">
          <h1>Create your project</h1>
          <form>
            <div className="projecttitle">
              <h2>Title:</h2>
              <input
                style={{ fontSize: "1.5rem" }}
                placeholder="Enter title"
                {...register("title")}
                type={"text"}
              ></input>
            </div>
            <div className="description">
              <h2>Description:</h2>
              <input
                style={{ fontSize: "1.5rem" }}
                placeholder="Enter description"
                {...register("description")}
                type={"textarea"}
                className="desc"
              ></input>
            </div>
            <div className="deadline">
              <h2>Deadline:</h2>
              <input
                style={{ fontSize: "1.5rem" }}
                placeholder="Select last date"
                {...register("deadline")}
                type={"date"}
              ></input>
            </div>
            <div className="targetprice">
              <h2>Target Price:</h2>
              <input
                style={{ fontSize: "1.5rem" }}
                placeholder="Select Target Amount"
                {...register("targetPrice")}
                type={"number"}
              ></input>
            </div>
            <div className="mincontribution">
              <h2>Minimum Contribution:</h2>
              <input
                style={{ fontSize: "1.5rem" }}
                placeholder="Select Minimum Contribution"
                {...register("minimumContribution")}
                type={"number"}
              ></input>
            </div>
            <div className="address">
              <h2>Metamask Address:</h2>
              <label
                className="metamask"
                style={{ fontSize: "1.5rem" }}
                onClick={() => copy(userAddress)}
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
              onClick={handleSubmit(submitToBlockchain)}
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

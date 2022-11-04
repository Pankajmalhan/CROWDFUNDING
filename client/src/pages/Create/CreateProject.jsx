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

import { handleImageUpload } from "../../actions/web3storage";
import { createNewProjectFC } from "../../helper/contractFunction";
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
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const data = useWatch({ control });
  const mindate = new Date().toLocaleDateString();
  
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
      handleImageUpload().then(async(cid_id)=>{
          const res = { ...data, ...{ publicAddress: userAddress ?? "" , cid : !!cid_id ? cid_id : ""}};
          const payload = await createNewProjectFC(res);
          console.log(payload, "payload")
    })
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
                {...register("title", { required: "*Title Required" })}
                type={"text"}
              ></input>
            </div>
            {errors?.title && <p>{errors?.title.message}</p>}
            <div className="description">
              <h2>Description:</h2>
              <input
                style={{ fontSize: "1.5rem" }}
                placeholder="Enter description"
                {...register("description", {
                  required: "*Description Required",
                })}
                type={"textarea"}
                className="desc"
              ></input>
            </div>
            {errors?.description && <p>{errors?.description.message}</p>}
            <div className="deadline">
              <h2>Deadline:</h2>
              <input
                style={{ fontSize: "1.5rem" }}
                placeholder="Select last date"
                {...register("deadline", {
                  required: "*Deadline Required",
                  min: { mindate },
                })}
                type={"date"}
              ></input>
            </div>
            {errors?.deadline && <p>{errors?.deadline.message}</p>}
            <div className="targetprice">
              <h2>Target Price:</h2>
              <input
                style={{ fontSize: "1.5rem" }}
                placeholder="Select Target Amount"
                {...register("targetPrice", {
                  required: "*Target ammount Required",
                })}
                type={"number"}
                min="10"
                max="99999"
              ></input>
            </div>
            {errors?.targetPrice && <p>{errors?.targetPrice.message}</p>}
            <div className="mincontribution">
              <h2>Minimum Contribution:</h2>
              <input
                style={{ fontSize: "1.5rem" }}
                placeholder="Select Minimum Contribution"
                {...register("minimumContribution", {
                  required: "*Minimum Contribution Required",
                })}
                type={"number"}
                min="0"
                max="99999"
              ></input>
            </div>
            {errors?.minimumContribution && (
              <p>{errors?.minimumContribution.message}</p>
            )}
            <div>
              <h2>Upload Image:</h2>
              <input
                style={{ fontSize: "1.5rem" }}
                placeholder="Select File"
                {...register("image")}
                type={"file"}
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

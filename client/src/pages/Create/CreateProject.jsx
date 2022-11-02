import React from "react";
import Image from "../../Assets/img/eth.png";
import { getUserAddress } from "../../actions/Web3Actions";
import { useForm, useWatch } from "react-hook-form";
import { copy } from "../../helper/function";
import { Web3Storage } from "web3.storage/dist/bundle.esm.min.js";

export const CreateProject = () => {
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
  const API_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGZjZDJEMjcyMGE3YjMzYzRiQkExZjEwNEMxYmIwZTVhNjA1NzVmRGMiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjczMTMxNDg2OTEsIm5hbWUiOiJjcm93ZGZ1bmRpbmcifQ.wW-i0_7uqiM1Jyh7hTWfpPGrH7I18f6LS47nAZzj9Ts"
    React.useEffect(() => {
    setAddress();
  }, [userAddress]);

  async function setAddress() {
    const address = await getUserAddress();
    setUserAddress(address);
    return address;
  }

  async function handleImageUpload() {
    try{
      if(data?.image?.length) {
    const client = new Web3Storage({ token: API_TOKEN });
    const fileInput = document.querySelector('input[type="file"]');

    const rootCid = await client.put(fileInput.files);

    const info = await client.status(rootCid);
    console.log(info);
    // Fetch and verify files from web3.storage
    const res = await client.get(rootCid);
    const files = await res.files();
    for (const file of files) {
      console.log(`${file.cid} ${file.name} ${file.size}`);
      return `${file.cid}`
    }
  }
  else {
    return 
  }
  }
  catch (error) {
    console.log(error , "Error")
  }
  }
  function onSubmit(e) {
    if (data) {
      handleImageUpload().then((d)=>{
        if(d) {
          const res = { ...data, ...{ publicAddress: userAddress ?? "" , cid : d}};
          alert(" Project successfully Added")
      }
      else {
        const res = { ...data, ...{ publicAddress: userAddress ?? "" , cid : ""}};
      alert(" Project successfully Added")
      }
    })
    }
  }
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
              onClick={handleSubmit(onSubmit)}
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

import React from "react";
import Image from "../../Assets/img/eth.png";
import { getUserAddress } from "../../actions/Web3Actions";
import { useForm, useWatch } from "react-hook-form";
import { copy } from "../../helper/function";
// import { fetchProjectList } from "../../helper/apiRequests";
import { useContext } from "react";
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
      handleImageUpload().then(async (cid_id) => {
        var projectList = JSON.parse(localStorage.getItem("projList"));
        const res = {
          ...data,
          ...{ publicAddress: userAddress ?? "", cid: !!cid_id ? cid_id : "" },
        };
        const payload = await createNewProjectFC(res);
        console.log(res);
        if (payload) {
          let projectData = payload?.events.ProjectStarted.returnValues;
          let requiredData = {
            title: projectData._title,
            description: projectData._description,
            project_target_price: projectData._project_target_price,
            project_deadline_date: projectData._projest_deadline_date_unix,
            project_minimum_fund_price: projectData._project_minimum_fund_price,
            projectOwner: projectData._projectOwner,
            contractAddress: projectData._contractAddress,
          };
          if (projectList == null) projectList = [];
          projectList.push(requiredData);
          localStorage.setItem("projList", JSON.stringify(projectList));
        }
      });
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

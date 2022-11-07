import React, { useState } from "react";
import ProjectCard from "../../components/Cards/ProjectCard";
import { FaDonate, FaUserShield } from "react-icons/fa";
import { MdCampaign } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {fetchProjectList} from '../../helper/apiRequests'

export const Projects = () => {
 const navigate = useNavigate();
 const[projectList,setProjectList]=useState([]);

React.useEffect(() => {
  (async()=>{
  //  const data= await fetchProjectList();
    let data =  JSON.parse(localStorage.getItem("projList"))
   setProjectList(data);
  })();
}, [])

  function createNewProject(){
      navigate('/Create')
  }
  function NoData() {
    const noDataContainer = {
      display: "flex",
      height: "50rem",
      flexDirection: "column",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    };
    const noDataButton = {
      width: "30rem",
      backgroundColor: "white",
      padding: "2rem",
      justifyContent: "inherit",
      borderWidth: "0.3rem",
      fontSize: "2rem",
      borderStyle: "dashed",
      boxShadow: "1px 1px 1px 3px rgba(50, 50, 93, 0.25)",
    };
    return (
      <div style={noDataContainer}>
        <button  onClick={()=>createNewProject()} style={noDataButton}> Create New Project +</button>
      </div>
    );
  }
  return (
    <div className="container">
      <h1>Project</h1>
      <div className="sub">
        <h1>Bring your creative campaigns live with us</h1>
        {projectList ?
        <div className="mainpage-data">
          <div>
            <p>
              <FaDonate />
            </p>
            <h1>
              Total donations
              <br />
              100 Eth
            </h1>
          </div>
          <span />
          <div>
            <p>
              <MdCampaign />
            </p>
            <h1>
              Total Projects
              <br /> 10
            </h1>
          </div>
          <span />
          <div>
            <p>
              <FaUserShield />
            </p>
            <h1>
              Number of users
              <br />
              20
            </h1>
          </div>
        </div> : <NoData/>}
      </div>
      
      {projectList && <div className="card-container">
        {projectList.map((item) => <ProjectCard data={item} />)}
      </div> }
    </div>
  );
};

import React, { useState } from "react";
import ProjectCard from "../../components/Cards/ProjectCard";
import { FaDonate, FaUserShield } from "react-icons/fa";
import { MdCampaign } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export const Projects = () => {
 const navigate = useNavigate();
  const data = [
    {
      title: "New Prj",
      description: "Dummy content added for the description",
    },
    {
      title: "New Prj1",
      description: "Prj 1Dummy content added for the description",
    },
    {
      title: "New Prj2",
      description: "Prj 2 Dummy content added for the description",
    },
    {
      title: "New Prj2",
      description: "Prj 2 Dummy content added for the description",
    },
    {
      title: "New Prj2",
      description: "Prj 2 Dummy content added for the description",
    },
  ];
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
        {data ?
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
      
      {data && <div className="card-container">
        {data.map((item) => <ProjectCard data={item} />)}
      </div> }
    </div>
  );
};

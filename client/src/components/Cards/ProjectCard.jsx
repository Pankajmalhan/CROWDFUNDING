import React from "react";
import Image from "../../Assets/img/ethereum-boost.webp";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import ProgressBar from "../ProgressBar/ProgressBar";
import { useCountdown } from "../../helper/useCountdown";
import {useNavigate} from 'react-router-dom';
import { Loading } from "../Loader/Loader";

const ProjectCard = (projectData , detailsScreen) => {
  const targetDate = new Date("2022/11/04");
  const [days, hours, minutes, seconds] = useCountdown(targetDate);
  const { title, description } = projectData?.data;
  const navigate = useNavigate();
  const cardContainer = {
      width: "40rem",
      height: "auto",
      fontSize: "2rem",
      margin: "1rem",
  }
  const textStyle = {
    textAlign:'left',
    color: 'black',
    fontSize:"1.5rem",
  }
  const buttonStyle={
    backgroundColor:"hsla(0, 100%, 26%, 1)",
    marginTop:'1rem',
    color:"white",
    fontSize:'1.5rem',
    padding:"0.8rem",
    borderRadius:'1rem',
    width:"100%",
  }
  function handleDonateButton(){
    navigate('/ProjectDetails',{state: projectData?.data});
}

  return (
  <>
    <Card
      style={cardContainer}
    >
      {projectData?.data.title === "New Prj" ? <Loading/>
      :
      <>
      <Card.Img variant="top" src={Image} />
      <Card.Body>
        <Card.Title style={textStyle}>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <p style={textStyle}>{`Time Left: ${days} days ${hours} hours ${minutes} minutes ${seconds}seconds`}</p>
        <p style={textStyle}>Target Achieved: 
        <ProgressBar bgcolor={'hsla(0, 100%, 26%, 1)'} completed={23}/>
        </p>
        <Button
          style={buttonStyle}
          onClick={handleDonateButton}
        >
          Donate
        </Button>
      </Card.Body>
      </>
}
    </Card>
    </>
  );
};
export default ProjectCard;

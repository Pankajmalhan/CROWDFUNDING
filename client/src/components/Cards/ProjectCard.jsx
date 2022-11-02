import React from "react";
import Image from "../../Assets/img/ethereum-boost.webp";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import ProgressBar from "../ProgressBar/ProgressBar";
import { useCountdown } from "../../helper/useCountdown";


const ProjectCard = (item , detailsScreen) => {
  const targetDate = new Date("2022/11/04");
  const [days, hours, minutes, seconds] = useCountdown(targetDate);
  const { title, description } = item?.data;
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
  return (
  <>
    <Card
      style={cardContainer}
    >
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
        >
          Donate
        </Button>
      </Card.Body>
    </Card>
    </>
  );
};
export default ProjectCard;

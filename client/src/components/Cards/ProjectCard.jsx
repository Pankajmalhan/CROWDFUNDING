import React from "react";
import Image from "../../Assets/img/ethereum-boost.webp"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
const ProjectCard = (item) => {
  const {title, description } = item?.data
    return (
    
     <Card style={{ width: '40rem', height:'auto' , fontSize:'2rem', margin:'1rem' }}>
      <Card.Img variant="top" src={Image} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Title>Deadline: {"2 Days"}</Card.Title>
        <Card.Title>AmmountRaised: {'1000$'}</Card.Title>
        <Card.Text>
          {description}
        </Card.Text>
        <Button style={{width:'100%' , alignSelf:'center' ,justifyContent:'center',backgroundColor:'hsla(0, 100%, 26%, 1)'}} >Donate</Button>
      </Card.Body>
    </Card>
   
  );
};
export default ProjectCard;

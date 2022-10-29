import React from "react";
// import 'bootstrap/dist/css/bootstrap.min.css'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/button'

const LoginForm =({isShowLogin,handleClose}) =>{

  const [name,setName] = React.useState("")
  const [email,setEmail] = React.useState("")
  const [password,setPassword] = React.useState("")
function handleSubmit(){
  console.log("Log")
}
function handleChange(text){
  setName(text.target.value)
}
function handleEmailChange(text){
  setEmail(text.target.value)
}
function handlePasswordChange(text){
  setPassword(text.target.value)
}

  return(
    <Modal style={{ paddingTop:'20rem'}} show={isShowLogin} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title style={{fontSize: '2rem'}}>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form.Group>
              <Form.Label style={{fontSize: '1.5rem'}}>Name: </Form.Label>
              <Form.Control style={{fontSize: '1.5rem'}}type="text" onChange={(t)=>handleChange(t)} value={name} placeholder="Enter your Name"/>           
              <Form.Label style={{fontSize: '1.5rem'}}>Email: </Form.Label>
              <Form.Control style={{fontSize: '1.5rem',}} type="text" onChange={(t)=>handleEmailChange(t)} value={email} placeholder="Enter Email"/>           
              <Form.Label style={{fontSize: '1.5rem'}}>Password: </Form.Label>
              <Form.Control style={{fontSize: '1.5rem',}} type="password" onChange={(t)=>handlePasswordChange(t)} value={password} placeholder="Enter Password"/>           
          </Form.Group>
      </Modal.Body>
      <Modal.Footer style={{justifyContent:'center', padding:'2rem', fontSize: '2rem'}}>
        <Button style={{fontSize:'1.5rem'}}variant="primary" onClick={handleSubmit}>
          Submit 
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
export default LoginForm

import React from "react";
// import 'bootstrap/dist/css/bootstrap.min.css'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/button'
import { useForm, useWatch } from "react-hook-form";

const LoginForm =({isShowLogin,handleClose}) =>{
  const path = "http://localhost:4080/"
  const [name,setName] = React.useState("")
  const [email,setEmail] = React.useState("")
  const [password,setPassword] = React.useState("")
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

async function onLoggedIn(data){
try {
  fetch(path, {
    body: JSON.stringify({data}),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  }).then(response => response.json());
}
catch(e){
console.log(e , "Error")
}
}
function onLoginSubmit(e) {
  if (data) {
    const res = { ...data };
    if(res){
      onLoggedIn(res)
      console.log(res, "data");
    }


  }
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
              <Form.Control style={{fontSize: '1.5rem'}}type="text" {...register("name")}  placeholder="Enter your Name"/>           
              <Form.Label style={{fontSize: '1.5rem'}}>Email: </Form.Label>
              <Form.Control style={{fontSize: '1.5rem',}} type="text" {...register("email")}  placeholder="Enter Email"/>           
              <Form.Label style={{fontSize: '1.5rem'}}>Password: </Form.Label>
              <Form.Control style={{fontSize: '1.5rem',}} type="password" {...register("password")}  placeholder="Enter Password"/>           
          </Form.Group>
      </Modal.Body>
      <Modal.Footer style={{justifyContent:'center', padding:'2rem', fontSize: '2rem'}}>
        <Button style={{fontSize:'1.5rem'}}variant="primary" onClick={handleSubmit(onLoginSubmit)}>
          Submit 
        </Button>
        <Button style={{fontSize:'1.5rem'}}variant="primary" onClick={handleSubmit(onLoginSubmit)}>
          Sign Up by Metamask 
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
export default LoginForm

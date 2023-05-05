import React, { useEffect, useState,useRef } from "react";
import { Input, useInput, Grid, Button,Loading ,Row,Col} from "@nextui-org/react";
import { Link,useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_USER_BY_MAIL, SIGNIN } from "../GraphQL/Queries";
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { Label } from "gestalt";

const Signup = () => {
    const toast = useRef(null);

    const onUpload = () => {
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    };
    const navigate=useNavigate();
    const {
        value: emailValue,
        reset: emailReset,
        bindings: emailBindings,
    } = useInput("");
    const {
        value: passwordValue,
        reset: passwordReset,
        bindings: passwordBindings,
    } = useInput("");

    const{
        value:phoneNumberValue,
        reset:phoneNumberReset,
        bindings:phoneNumberBindings
    }=useInput("")

    const {loading,error,data,refetch}=useQuery(SIGNIN,{
        variables:{
            email:emailValue,
            password:passwordValue
        }
    });

    const [emailStatus,setEmailStatus]=useState({color:"",text:""})
    const [passwordStatus,setPasswordStatus]=useState({color:"",text:""})
    const [phoneNumberStatus,setPhoneNumberStatus]=useState({color:"",text:""})



  const validateEmail = (emailValue) => {
    return emailValue.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
  };

  const validatePassword = (passwordValue) => {
    return false;
  };

 

  useEffect(()=>{
    if (!passwordValue)
    setPasswordStatus({
      text: "",
      color: "",
  })
  if (!emailValue)
  setEmailStatus({
    text: "",
    color: "",
})
  },[emailValue,passwordValue])

  const loginHandler=()=>{
    refetch({email:emailValue,password:passwordValue});
    if(error){
        setPasswordStatus({
            text: "check your password",
            color: "error",
        })
        setEmailStatus({
            text:"check your email",
            color:"error"
        })
    }
    if(!loading && data){
        setPasswordStatus({
            text: "",
            color: "",
        })
        setEmailStatus({
            text:"",
            color:""
        })
        localStorage.setItem('token',data.signIn)
        navigate("/")
       }
    }

  

  return (
    <Grid.Container xs={12} justify="center" css={{ padding: "$15" }}>
         <Toast ref={toast}></Toast>
      <Grid css={{ display: "flex", justifyContent: "center", margin: "$14" }}>
        <Input 
        id="#email"
          {...emailBindings}
          clearable
          shadow={false}
          onClearClick={emailReset}
          status={emailStatus.color}
          color={emailStatus.color}
          helperColor={emailStatus.color}
          helperText={emailStatus.text}
          type="email"
          label="Email"
          placeholder="Enter your email.."
          css={{ width: "300px" }}
        />
      </Grid>
      <Grid css={{ display: "flex", justifyContent: "center", margin: "$14" }}>
        <Input.Password
        id="#password"
          {...passwordBindings}
          clearable
          onClearClick={passwordReset}
          color={passwordStatus.color}
          status={passwordStatus.color}
          initialValue="123"
          helperText={passwordStatus.text}
          helperColor={passwordStatus.color}
          type="password"
          label="Password"
          placeholder="Enter your password "
          css={{ width: "300px" }}
        />
      </Grid>
      <Grid css={{ display: "flex", justifyContent: "center", margin: "$14" }}>
        <Input
        id="#phoneNumber"
          {...phoneNumberBindings}
          clearable
          onClearClick={phoneNumberReset}
          color={phoneNumberStatus.color}
          status={phoneNumberStatus.color}
          initialValue="123"
          helperText={phoneNumberStatus.text}
          helperColor={phoneNumberStatus.color}
          type="string"
          label="phone number"
          placeholder="Enter your phone number "
          css={{ width: "300px" }}
        />
      </Grid>
      
      <Grid css={{ display: "flex", justifyContent: "center", margin: "$14" }}>
        <Button  color="gradient" css={{ marginRight: "10px" }} auto onClick={loginHandler}>
        Sign Up
        </Button>

        <Link to={"/login"}>
          <Button color="gradient" auto>
            Login 
          </Button>
        </Link>
      </Grid>
    </Grid.Container>
  );
};

export default Signup;

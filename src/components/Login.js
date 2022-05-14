/*
1155125519 Hon Wing Ngai	1155143564 Chiu Chak San	1155126052 Kong Ho Pak 
1155136412 Pau Chun Wai	    1155143814 Lam Tsz Hoi	
*/

import React, { useState, useContext }  from 'react';
import {useNavigate} from 'react-router-dom'
import { Container,TextField, Box, Button, Snackbar, Alert } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import { AuthContext } from '../context/AuthContext';

function Login(){
    const {auth, setAuth}=useContext(AuthContext);
    const [status, setStatus]=useState(null);
    const [username, setUsername]=useState("");
    const [password, setPassword]=useState("");
    const [unHelperText,setUnHelperText]=useState(null);
    const [pwHelperText,setPwHelperText]=useState(null);
    const [alertMessage,setAlertMessage]=React.useState("")
    const [alertColor,setAlertColor]=React.useState("");
    const [snackbarOpen, setSnackbarOpen]=React.useState(false)
    const handleSnackbarClose=()=>{
        setSnackbarOpen(false);
    }
    const handleUsernameChange=(event)=>{
        setUsername(event.target.value)
        setUnHelperText(null)
    }
    const handlePasswordChange=(event)=>{
        setPassword(event.target.value)
        setPwHelperText(null)
    }
    const navigate = useNavigate();
    const handleClick=(event)=>{
        //if verified
        /*if(username!=null&&password!=null){
            localStorage.setItem("user",username);
            window.location.assign("/location");
        }else{

            if(username==null){
                setUnHelperText("Username cannot be empty!")
            }
            if(password==null){
                setPwHelperText("Password cannot be empty!")
            }

        }*/

        fetch('/login', {
            method: 'POST', 
            body: new URLSearchParams({
                "username":username,
                "password":password
            }),   
            //credentials: 'include',
        })
        .then(res=>res.text().then(text=>{
            if(res.status==401){
                setAlertColor("error")
                setAlertMessage(text)
                setSnackbarOpen(true)
            }else if(res.status==500){
                setAlertColor("error")
                setAlertMessage(text)
                setSnackbarOpen(true)
            }else if(res.status==200){
                if(username=="admin")
                    setAuth(-1)
                else setAuth(1)
                navigate("/")
            }
        }))
        .catch((error) => {
            console.error('Error:', error);
        });

        
        
    }
    return(
        <>
            <div style={{
                height:"100vh",
                width:"100%",
                backgroundColor:"#75CFF0",
                backgroundSize: "cover",
                backgroundAttachment: "fixed",
                paddingTop:"22vh"
            }}>
                <Container maxWidth="sm" 
                    sx={{
                        backgroundColor:"white",textAlign:"center"
                    }} 
                        className="border border-light border-4"
                >
                    <Box sx={{
                        margin:{
                            xs:"2em 0em 2em 0em",
                            md:"5em 5em 5em 5em"
                        }
                    }} >
                        <h2 className="text-center ">Login</h2>
                        <hr className="divider divider-dark text-center" />
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent:"center", mb:2, 
                            mx:{
                                xs:1,
                                md:6
                            }}
                        }>
                            <AccountCircleIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                            <TextField 
                                label="Username" 
                                variant="standard" 
                                value={username}
                                onChange={handleUsernameChange}
                                helperText={unHelperText}
                                error={unHelperText!=null}
                                fullWidth
                            />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent:"center", mb:5, mx:{
                                xs:1,
                                md:6
                            }
                        }}>
                            <KeyIcon sx={{ color: "action.active", mr: 1, my: 0.5}} />
                            <TextField  
                                label="Password" 
                                variant="standard" 
                                value={password}
                                onChange={handlePasswordChange}
                                helperText={pwHelperText}
                                type="password"
                                error={pwHelperText!=null}
                                fullWidth
                            />
                        </Box>
                        <Box>
                            <a className="btn btn-primary btn-xl" onClick={handleClick}>
                                Login 
                            </a>
                        </Box>
                    </Box>   
                </Container>
                <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                    <Alert onClose={handleSnackbarClose} severity={alertColor} sx={{ width: '100%' }}>
                        {alertMessage}
                    </Alert>
                </Snackbar>
                
            </div>
        </>
    )

}

export default Login
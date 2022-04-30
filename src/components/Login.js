import React, { useState }  from 'react';
import {useNavigate} from 'react-router-dom'
import London from '../backgroundImage/London.png'
import { Container,TextField, Box, Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';

function Login(){
    const [status, setStatus]=useState(null);
    const [username, setUsername]=useState("");
    const [password, setPassword]=useState("");
    const [unHelperText,setUnHelperText]=useState(null);
    const [pwHelperText,setPwHelperText]=useState(null);
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

        fetch('http://localhost:4000/login', {
            method: 'POST', 
            body: new URLSearchParams({
                "username":username,
                "password":password
            }),   
            credentials: 'include',
        })
        .then(res=>setStatus(res.status))
        .catch((error) => {
            console.error('Error:', error);
        });

        
        
    }
    if(status==200){
        navigate("/")
    }
    else return(
        <>
            <div style={{
                height: "100vh",
                width: "100%",
                backgroundImage: `linear-gradient(rgba(182, 187, 205, 0.7), rgba(4,9,30,0.7)), url(${London})`,  
                backgroundPosition: "center",
                backgroundSize: "cover",
                position: "fixed",
            }}>
                <Container maxWidth="sm" 
                    sx={{
                        backgroundColor:"white",textAlign:"center"
                    }} 
                        className="border border-light border-4 balance"
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
                
            </div>
        </>
    )

}

export default Login
import React, { useState, useEffect }  from 'react';
import {useNavigate} from 'react-router-dom'
import London from '../backgroundImage/London.png'
import { Container,TextField, Box, Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';

function Login(){
    const [username, setUsername]=useState("");
    const [password, setPassword]=useState("");
    const handleUsernameChange=(event)=>{
        setUsername(event.target.value)
    }
    const handlePasswordChange=(event)=>{
        setPassword(event.target.value)
    }
    const navigate = useNavigate();
    const handleClick=(event)=>{
        //if verified
        localStorage.setItem("user",username);
        window.location.assign("/location");
    }
    return(
        <>
            <div style={{
                height: "100vh",
                width: "100%",
                backgroundImage: `linear-gradient(rgba(182, 187, 205, 0.7), rgba(4,9,30,0.7)), url(${London})`,  
                backgroundPosition: "center",
                backgroundSize: "cover",
                position: "fixed",
            }}>
                <Container maxWidth="sm" sx={{my:"15%", backgroundColor:"white",textAlign:"center"}} className="border border-light border-4">
                    <Box sx={{margin:5}} >
                        <h2 className="text-center ">Login</h2>
                        <hr className="divider divider-dark text-center" />
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent:"center", mb:2, mx:6}}>
                            <AccountCircleIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                            <TextField 
                                label="Username" 
                                variant="standard" 
                                value={username}
                                onChange={handleUsernameChange}
                                fullWidth
                            />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent:"center", mb:5, mx:6}}>
                            <KeyIcon sx={{ color: "action.active", mr: 1, my: 0.5}} />
                            <TextField  
                                label="Password" 
                                variant="standard" 
                                value={password}
                                onChange={handlePasswordChange}
                                type="password"
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
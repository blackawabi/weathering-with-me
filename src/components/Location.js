import React, { useState, useEffect }  from 'react';
import {useParams,useNavigate,useLocation,Link} from 'react-router-dom'
import London from '../backgroundImage/London.png'
import { Grid,Paper,Container, Box, List, ListItem, ListItemText, Typography, TextField } from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';
function Location(){
    /*
    useEffect(()=>{
        fetch("")
        .then(res=>res.json)
        .then(data=>setInfo(data))
    })
    */
    const [comment,setComment]=useState("")
    const [info, setInfo]=useState({
        name:"London",
        country:"UK",
        latitude:1,
        longitude:2,
        time: "date",
        commentList:[],
        temp_c:3,
        wind_kph: 4,
        wind_dir: 5,
        humidity: 6,
        precip_mm: 7,
        vis_km: 8
    })
    const handleInputComment=(event)=>{
        setComment(event.target.value)
    }
    return(
        <div style={{
            height: "auto",
            width: "100%",
            backgroundImage: `linear-gradient(rgba(182, 187, 205, 0.7), rgba(4,9,30,0.7)), url(${London})`,  
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundAttachment: "fixed"
        }}>
            <Box sx={{pr:"15vh", pt:"55vh", pb:"40vh"}}>
                <h1 class="display-1 text-right text-white" >
                    {info.name}
                </h1>
                <h6 class="display-1 text-right text-white">
                    {info.temp_c}°C
                </h6>
            </Box>
            <Box>
                <Container maxWidth="lg" sx={{height:700}} >
           
                    
                    <Grid 
                        container 
                        spacing={4} 
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid item xs={6}>
                            <Paper elevation={24} sx={{height:500}}>
                                <Typography variant='h4'>
                                    You are here...
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper elevation={24} sx={{height:500, px:2}} >
                                <Typography variant='h4' sx={{pt:2}}>
                                    <MessageIcon  fontSize="large"/>Comment
                                </Typography>
                                <List sx={{height:340, backgroundColor: "#e3f2fd", my:2}}>
                                    {info.commentList.map((data,i)=>(
                                        <ListItem key={i}>
                                            <ListItemText>
                                                {info.commentList[i].username}: {info.commentList[i].content}
                                            </ListItemText>
                                        </ListItem>
                                    ))}
                                </List>
                                <TextField
                                    label="Your Comment"
                                    value={comment}
                                    onChange={handleInputComment}
                                    fullWidth
                                />                                
                            </Paper>
                        </Grid>
                    </Grid>

                </Container>
            </Box>
            
            
        </div>
    );
}

export default Location;
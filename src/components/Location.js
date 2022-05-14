/*
1155125519 Hon Wing Ngai	1155143564 Chiu Chak San	1155126052 Kong Ho Pak 
1155136412 Pau Chun Wai	    1155143814 Lam Tsz Hoi	
*/

import React, { useState, useEffect, useRef }  from 'react';
import {useNavigate, useParams} from 'react-router-dom'
import { Grid,Paper,Container, CircularProgress,Box, Fab, List, ListItem, ListItemText, 
    FormControl, InputLabel, OutlinedInput,IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NorthIcon from '@mui/icons-material/North';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import EastIcon from '@mui/icons-material/East';
import SouthEastIcon from '@mui/icons-material/SouthEast';
import SouthIcon from '@mui/icons-material/South';
import SouthWestIcon from '@mui/icons-material/SouthWest';
import WestIcon from '@mui/icons-material/West';
import NorthWestIcon from '@mui/icons-material/NorthWest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudRain } from '@fortawesome/free-solid-svg-icons';
import { faDroplet } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faWind } from '@fortawesome/free-solid-svg-icons';
import SendIcon from '@mui/icons-material/Send';
import { InputAdornment } from '@mui/material';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
/* eslint import/no-webpack-loader-syntax: off */
import mapboxgl from '!mapbox-gl';
mapboxgl.accessToken = 'pk.eyJ1IjoicGF1Y3cwOTI1IiwiYSI6ImNsMjlvdXFvMTBsZHQzZW8wcjllOWExdXIifQ._ITgimxUOGgbCE1oi4U8MQ';

var textFade = function(){
    const weatherInfo = document.getElementById("weather-info");
    const weatherInfo2 = document.getElementsByClassName("weather-display")
    const weatherInfo3 = document.getElementsByClassName("update")

    const map0=document.getElementById("map0");
    const map1=document.getElementById("map1");
    const map2=document.getElementById("map2");
    //const map3=document.getElementById("map3");
    weatherInfo.style.opacity=1-(window.scrollY*3/window.innerHeight);
    weatherInfo2[0].style.opacity=1-(window.scrollY*3/window.innerHeight);
    weatherInfo2[1].style.opacity=1-(window.scrollY*3/window.innerHeight);
    weatherInfo2[2].style.opacity=1-(window.scrollY*3/window.innerHeight);
    weatherInfo2[3].style.opacity=1-(window.scrollY*3/window.innerHeight);
    weatherInfo3[0].style.opacity=1-(window.scrollY*3/window.innerHeight);
    
    map0.style.opacity=-0.1+(window.scrollY/window.innerHeight);
    map1.style.opacity=-0.2+(window.scrollY/window.innerHeight);
    map2.style.opacity=-0.4+(window.scrollY/window.innerHeight);


}


function Map(props){
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [zoom, setZoom] = useState(9);
    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [props.lng, props.lat],
            zoom: zoom
        });
        map.current.addControl(new mapboxgl.NavigationControl());
        const marker1 = new mapboxgl.Marker({ color: 'red', rotation: 45 })
        .setLngLat([props.lng, props.lat])
        .addTo(map.current);
    });
    return (
        <div>
            <div ref={mapContainer} className="map-container" />
        </div>
    );
}
function Location(){
    let navigate=useNavigate();
    let {code}=useParams();
    const [comment,setComment]=useState("")
    const [newDate, setNewDate]=useState()
    const [heartColor, setHeartColor]=useState()
    const [info, setInfo]=useState()
    const [background,setBackground]=useState()
    const scrollRef = useRef(null);
    useEffect(()=>{
        if(info==null  || background==null||heartColor==null){
            if(info==null){
                fetch("/location?name="+code)
                .then(res=>res.json())
                .then(data=>{
                    setInfo(data)
                })
                .catch(()=>navigate("/error"))
            }
            if(info!=null){
                if(newDate==null){
                    let d=new Date(info.updatedAt)
                    setNewDate(d)
                }
                
                if(background==null){
                    fetch("/background?country="+info.country)
                    .then(res=>res.text())
                    .then(bg=>setBackground(bg))
                    .catch(()=>navigate("/error"))
                }
                if(heartColor==null){
                    fetch("/getFavourite")
                    .then(res=>res.json())
                    .then(data=>{
                        for(let x of data){
                            if(x==info.country){
                                setHeartColor("error")
                                break;
                            }
                            setHeartColor("default")
                        }
                    })
                    .catch(()=>navigate("/error"))
                }
            }
            
        }
        document.addEventListener("scroll", textFade);      
    })
 
    const handleInputComment=(event)=>{
        setComment(event.target.value)
    }
    const handleSend=()=>{
        fetch('/addComment',{
            method:"POST",
            body: new URLSearchParams({
                "locationName":info.name,
                "comment":comment
            }),
        }).then(res=>{
            if(res.status==201){
                setComment("")
                fetch("/location?name="+code)
                .then(res=>res.json())
                .then(data=>setInfo(data))
            }
        })
        setTimeout(() => {
            if (scrollRef.current) {
                scrollRef.current.scrollIntoView({ behaviour: "smooth" });
            }
        }, 1000)
    }
    const gotobottom=()=>{
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behaviour: "smooth" });
        }
    }
    const handleFavorite=(event)=>{
        
        fetch('/updateFavourite',{
            method:"POST",
            body: new URLSearchParams({
                "locationName":info.name,
            }),
            credentials: 'include',
        }).then(res=>{
            res.text().then(text=>{
                if(res.status==200){
                    if(text.localeCompare('Successfully removed favourite location')==0){
                        setHeartColor("default")
                    }else{
                        setHeartColor("error")
                    }
                }
            })
        })

    }

    const handleMouseDown=(event)=>{
        event.preventDefault();
    }
    if(info==null || background==null){
        return(
            <>
                <div style={{
                    height:"100vh",
                    width:"100%",
                    backgroundColor:"#75CFF0",
                    backgroundSize: "cover",
                    backgroundAttachment: "fixed"
                }}>
                    <CircularProgress sx={{
                        right:{
                            xs:20,
                            md:40
                        }, 
                        bottom:{
                            xs:20,
                            md:40
                        }, 
                        position:"fixed"
                    }}/>
                </div>
            </>
        )
    }else return(
        <>
            <Fab color={heartColor} 
                sx={{
                    left:{
                        xs:20,
                        md:40
                    }, 
                    bottom:{
                        xs:20,
                        md:40
                    }, 
                    position:"fixed"
                }} onClick={handleFavorite}>
                <FavoriteIcon  />
            </Fab>
            <div style={{
                height: "auto",
                width: "100%",
                backgroundImage: `linear-gradient(rgba(182, 187, 205, 0.49), rgba(4,9,30,0.7)), url(${background})`,   
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundAttachment: "fixed"
            }}> 
                <Grid container spacing={2} columns={{xs:6, md:12}}>
                    <Grid item xs={4}>
                        <Box sx={{
                            pl:{
                                xs:"5vh",
                                md:"15vh"
                            },
                            pt:{
                                xs:"14vh",
                                md:"60vh"
                            }, 
                            pb:{
                                xs:"0vh",
                                md:"60vh"
                            },
                         
                        }}>
                            <p className="weather-display text-left text-white">
                                <FontAwesomeIcon icon={faWind} style={{ paddingRight:"1em"}} fullWidth/>
                                
                                {info.wind_dir=="N"?<NorthIcon sx={{color:"#fff"}} />:
                                info.wind_dir=="NE"?<NorthEastIcon sx={{color:"#fff"}}/>:
                                info.wind_dir=="E"?<EastIcon sx={{color:"#fff"}}/>:
                                info.wind_dir=="SE"?<SouthEastIcon sx={{color:"#fff"}}/>:
                                info.wind_dir=="S"?<SouthIcon sx={{color:"#fff"}}/>:
                                info.wind_dir=="SW"?<SouthWestIcon sx={{color:"#fff"}}/>:
                                info.wind_dir=="W"?<WestIcon sx={{color:"#fff"}}/>:
                                <NorthWestIcon sx={{color:"#fff"}}/>}
                                <span style={{userSelect: "none"}}> 
                                    {info.wind_kph}kph
                                </span>
                            </p>   
                            <p className="weather-display text-left text-white" >
                                <FontAwesomeIcon icon={faDroplet} style={{paddingRight:"1em"}} fullWidth/>
                                <span style={{userSelect: "none"}}> 
                                {info.humidity}%
                                </span>
                            </p>           
                            <p className="weather-display text-left text-white">
                                <FontAwesomeIcon icon={faCloudRain} style={{ paddingRight:"1em"}} fullWidth/>
                                <span style={{userSelect: "none"}}> 
                                {info.precip_mm}mm
                                </span>
                            </p>    
                            <p className="weather-display text-left text-white">
                                <FontAwesomeIcon icon={faEye} style={{ paddingRight:"1em"}} fullWidth/>
                                <span style={{userSelect: "none"}}> 
                                    {info.vis_km}km
                                </span>
                            </p>
                            <p className="update text-left text-white" style={{userSelect: "none"}}>
                                Updated at: {newDate.getDate()}/{newDate.getMonth()+1} {("0"+newDate.getHours()).slice(-2)}:{("0"+newDate.getMinutes()).slice(-2)}:{("0"+newDate.getSeconds()).slice(-2)}
                            </p>
                        </Box>
                        
                    </Grid>
                    <Grid item xs={8}>
                        <Box sx={{
                            pr:{
                                xs:"5vh",
                                md:"15vh"
                            }, 
                            pt:{
                                xs:"20vh",
                                md:"60vh"
                            }, 
                            pb:{
                                xs:"60vh"
                            }
                        }} id="weather-info" >
                            <h1 className="display-1 text-right text-white" style={{userSelect: "none"}}>
                                {
                                    info.country=="United Kingdom"?"U.K.":
                                    info.country=="United States of America"?"U.S.A.":info.country    
                                }

                            </h1>
                            <h6 className="display-1 text-right text-white"style={{userSelect: "none"}}>
                                {info.temp_c}°C
                            </h6>
                        </Box>
                    </Grid>
                
                </Grid>
                
                <Box sx={{
                    pl:{
                        xs:0,
                        md:"20vh",
                    }, 
                    pb:{
                        xs:"1vh",
                        md:"1vh"
                    }
                }}>
      

                    <h1>
                        <span className="display-2 text-left text-white" id="map0" sx={{display:"inline"}} style={{userSelect: "none"}}>
                            You&nbsp;   
                        </span>
                        <span className="display-2 text-left text-white" id="map1" sx={{display:"inline", opacity:0}} style={{userSelect: "none"}}>
                            are here...    
                        </span>
                    
                    </h1>              
                </Box>
                <Box sx={{pb:"40vh"}}>
                    <Container maxWidth="lg" id="map2">
                        
                        <Map lng={info.long} lat={info.lat}/>
            
                    </Container>

                </Box>
                <Box sx={{pb:"5vh"}}>
                    <Container maxWidth="md" 
                        sx={{
                            height:{
                                xs:500,
                                md:700
                            },
                        }} 
                    >


                        <h1 className="display-2 text-center text-white" id="map0" style={{userSelect: "none"}}>
                            Comment 
                        </h1>
                          
                        <Paper elevation={24} sx={{
                            height:{
                                xs:400,
                                md:500
                            }, 
                            p:2,
                            background: "linear-gradient(to bottom right, #33ccff 0%, #ff99cc 100%)",
                      
                        }} >
                            <List sx={{
                                height:{
                                    xs:280,
                                    md:380
                                }
                                ,overflow: 'auto'
                                , my:2}}>
                                {info.commentList.map((data,i)=>(
                                    <ListItem key={i}>
                                        <ListItemText>
                                            <p className="display-6 text-white">
                                                {info.commentList[i].username}: {info.commentList[i].content}
                                            </p>
                                        </ListItemText>
                                    </ListItem>
                                ))}
                                <li ref={scrollRef} />
                            </List>
                  
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Comment</InputLabel>
                                <OutlinedInput
                                    value={comment}
                                    onChange={handleInputComment}
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleSend}
                                            onMouseDown={handleMouseDown}
                                            edge="end"
                                        >
                                            <SendIcon/>
                                        </IconButton>
                                         <IconButton
                                            onClick={gotobottom}
                                        >
                                            <KeyboardDoubleArrowDownIcon/>
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                    label="Password"
                                />
                            </FormControl>                          
                        </Paper>
            

                    </Container>
                </Box>

            </div>
        </>
        
    );
}

export default Location;

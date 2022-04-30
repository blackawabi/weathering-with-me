import React, { useState, useEffect, useRef }  from 'react';
import {useParams,useNavigate,useLocation,Link} from 'react-router-dom'
import London from '../backgroundImage/London.png'
import { Grid,Paper,Container, Box, Fab, List, ListItem, ListItemText, Typography, TextField } from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';
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

/* eslint import/no-webpack-loader-syntax: off */
import mapboxgl from '!mapbox-gl';
mapboxgl.accessToken = 'pk.eyJ1IjoicGF1Y3cwOTI1IiwiYSI6ImNsMjlvdXFvMTBsZHQzZW8wcjllOWExdXIifQ._ITgimxUOGgbCE1oi4U8MQ';

var textFade = function(){
    let plus=true;
    const weatherInfo = document.getElementById("weather-info");
    const weatherInfo2 = document.getElementsByClassName("weather-display")

    const map0=document.getElementById("map0");
    const map1=document.getElementById("map1");
    const map2=document.getElementById("map2");
    //const map3=document.getElementById("map3");
    weatherInfo.style.opacity=1-(window.scrollY*3/window.innerHeight);
    weatherInfo2[0].style.opacity=1-(window.scrollY*3/window.innerHeight);
    weatherInfo2[1].style.opacity=1-(window.scrollY*3/window.innerHeight);
    weatherInfo2[2].style.opacity=1-(window.scrollY*3/window.innerHeight);
    weatherInfo2[3].style.opacity=1-(window.scrollY*3/window.innerHeight);
    
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
    
    useEffect(()=>{
        fetch("http://localhost:4000/location",{
            body: new URLSearchParams({
                "name":"france update"
            }),
        })   
        .then(res=>res.json)
        .then(data=>console.log(data))
        
        document.addEventListener("scroll", textFade);
        
    })
    const [comment,setComment]=useState("")
    const [heartColor, setHeartColor]=useState("default")
    const [status,setStatus]=useState(null);
    const [info, setInfo]=useState({
        name:"London",
        country:"UK",
        latitude:42.3,
        longitude:-70.9,
        time: "2021-02-21 08:30",
        commentList:[],
        temp_c:3,
        wind_kph: 4,
        wind_dir: "SW",
        humidity: 6,
        precip_mm: 7,
        vis_km: 8
    })
    const handleInputComment=(event)=>{
        setComment(event.target.value)
    }
    const handleFavorite=(event)=>{
        fetch('http://localhost:4000/addFavourite',{
            method:"POST",
            body: new URLSearchParams({
                "locationName":info.name,
            }),
            credentials: 'include'
        }).then(res=>setStatus(res.status))
        .then(()=>{
            if(status==200){
                //if(heartColor.localeCompare("#ffffff")==0){
                    setHeartColor("error")
                //}
                //else{
                //    setHeartColor("#ffffff")
                //}
            }
        })       
    }
    return(
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
                backgroundImage: `linear-gradient(rgba(182, 187, 205, 0.7), rgba(4,9,30,0.7)), url(${London})`,  
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundAttachment: "fixed"
            }}> 
                <Grid container spacing={2} columns={{xs:6, md:12}}>
                    <Grid item xs={6}>
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
                        </Box>
                        
                    </Grid>
                    <Grid item xs={6}>
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
                            <h1 class="display-1 text-right text-white" style={{userSelect: "none"}}>
                                {info.name}
                            </h1>
                            <h6 class="display-1 text-right text-white"style={{userSelect: "none"}}>
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
                        <span class="display-2 text-left text-white" id="map0" sx={{display:"inline"}} style={{userSelect: "none"}}>
                            You&nbsp;   
                        </span>
                        <span class="display-2 text-left text-white" id="map1" sx={{display:"inline", opacity:0}} style={{userSelect: "none"}}>
                            are here...    
                        </span>
                    
                    </h1>              
                </Box>
                <Box sx={{pb:"40vh"}}>
                    <Container maxWidth="lg" id="map2">
                        
                        <Map lng={info.longitude} lat={info.latitude}/>
            
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

                        <Paper elevation={24} sx={{
                            height:{
                                xs:400,
                                md:500
                            }, 
                            px:2
                        }} >
                            <Typography variant='h4' sx={{pt:2}}>
                                <MessageIcon  fontSize="large"/>Comment
                            </Typography>
                            <List sx={{
                                height:{
                                    xs:240,
                                    md:340
                                }
                                , backgroundColor: "#e3f2fd", my:2}}>
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
            

                    </Container>
                </Box>

            </div>
        </>
        
    );
}

export default Location;
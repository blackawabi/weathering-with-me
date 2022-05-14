/*
1155125519 Hon Wing Ngai	1155143564 Chiu Chak San	1155126052 Kong Ho Pak 
1155136412 Pau Chun Wai	    1155143814 Lam Tsz Hoi	
*/

import React from 'react';
import ReactDOM from 'react-dom';
/* eslint import/no-webpack-loader-syntax: off */
import mapboxgl from '!mapbox-gl';
import Btable from './Btable';
import {CircularProgress} from '@mui/material';
mapboxgl.accessToken = 'pk.eyJ1IjoidmFuaG9ubm4iLCJhIjoiY2wyaG1oYXJtMGV6bjNkb2p1ZDFtZ2JyNiJ9.GujAFNhl0AWRIMuXI2R1zA';



class Markmap extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            lng: 114.177216,
            lat: 22.302711,
            zoom:10,
            info:null
        }
    }

    componentDidMount(){
        const map = new mapboxgl.Map({
            container:this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom
        })
        
        fetch('/locations')
        .then(res => res.json())
        .then(data => {
            this.setState({info:data})
            data.forEach((mark)=>{
                var marker = new mapboxgl.Marker()
                .setLngLat([mark.long, mark.lat])
                .setPopup(new mapboxgl.Popup({offset: 30})
                .setHTML('<a href="/location/' + mark.name + '">' + mark.country + '</a>')) // onclick here and jump to the location detail
                .addTo(map);
            }
            
            );
        })
        .catch();
         
    }

    render(){
        return(
            <>
            
                <div>
                    <div ref={el => this.mapContainer =el} style={{width:'100%', height:'100vh'}}></div>
                </div>
                {this.state.info!=null?
                    <div className="container">
                        <Btable info={this.state.info}/>
                    </div>
                :
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
                }
            </>
            
        );
    }
}

export default Markmap

import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import Btable from './Btable';

mapboxgl.accessToken = 'pk.eyJ1IjoidmFuaG9ubm4iLCJhIjoiY2wyaG1oYXJtMGV6bjNkb2p1ZDFtZ2JyNiJ9.GujAFNhl0AWRIMuXI2R1zA';


// to be confimed
// const list = [
//     {country: "US", name: "Manhattan", lng: -74, lat: 40.7128, t:0, ws:0, wd:0, h:0, vis:0},
//     {country: "UK" ,name: "London" , lng: -0.118092 , lat: 51.509865 , t: 12 , ws: 0 , wd: 0 , h: 0, vis: 0},
//     {country: "HK", name: "Hongkong" , lng: 114.177216 , lat: 22.302711 , t: 0 , ws: 0 , wd: 0 , h: 0, vis: 0},
//     {country: "FR", name: "Paris" , lng: 2.349014 , lat: 48.864716 , t: 0 , ws: 0 , wd: 0 , h: 0, vis: 0},
//     {country: "GM", name: "Berlin" , lng: 	13.404954 , lat: 52.520008 , t: 0 , ws: 0 , wd: 0 , h: 0, vis: 0}
// ];



class Markmap extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            lng: 114.177216,
            lat: 22.302711,
            zoom:10
        }
    }

    componentDidMount(){
        const map = new mapboxgl.Map({
            container:this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom
        })
        
        fetch('http://localhost:4000/locations',
              {
                method:'GET'
               })
        .then(res => res.json())
        .then(data => {
            data.forEach((mark)=>{
                var marker = new mapboxgl.Marker()
                .setLngLat([mark.long, mark.lat])
                .setPopup(new mapboxgl.Popup({offset: 30})
                .setHTML('<a href="http://localhost/location/' + mark.name + '">' + mark.name + '</a>')) // onclick here and jump to the location detail
                .addTo(map);
            });
        })
        .catch();
         
    }

    render(){
        return(
            <>
            
                <div>
                    <div ref={el => this.mapContainer =el} style={{width:'100%', height:'500px'}}></div>
                </div>
                <div className="container">
                    <Btable />
                </div>
            </>
            
        );
    }
}

export default Markmap

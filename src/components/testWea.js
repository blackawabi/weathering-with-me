// 1. List all locations in a table, and allow sorting of the table with one of the listed fields,
// linking to single locations
// 2. Show all locations in a map, with links to each single location
// [ Suggested APIs: Google Maps, MapBox ]
// 3. Search for locations which contain keywords in one field chosen by the user which
// will result in a table of location results  

import React, { useRef, useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoidmFuaG9ubm4iLCJhIjoiY2wyaG1oYXJtMGV6bjNkb2p1ZDFtZ2JyNiJ9.GujAFNhl0AWRIMuXI2R1zA';

export default function Wea() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(114.177216);
    const [lat, setLat] = useState(22.302711);
    const [zoom, setZoom] = useState(5);
    // const map = new mapboxgl.Map({
    //     container: 'map', // container ID
    //     style: 'mapbox://styles/mapbox/streets-v11', // style URL
    //     center: [ 114.177216, 22.302711], // starting position [lng, lat]
    //     zoom: 5 // starting zoom
    // });

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });
    });

    const list = [
        {name: "London" , lng: -0.118092 , lat: 51.509865 , t: 0 , ws: 0 , wd: 0 , h: 0, vis: 0},
        {name: "Hongkong" , lng: 114.177216 , lat: 22.302711 , t: 0 , ws: 0 , wd: 0 , h: 0, vis: 0},
        {name: "Paris" , lng: 2.349014 , lat: 48.864716 , t: 0 , ws: 0 , wd: 0 , h: 0, vis: 0},
        {name: "Berlin" , lng: 	13.404954 , lat: 52.520008 , t: 0 , ws: 0 , wd: 0 , h: 0, vis: 0}
    ];


    
    // map.on('load', function(e){

        // const ptOnMap = {
        //     "type": "geojson",
        //     "data": {
        //         "type": "FeatureCollection",
        //         "features": [

        //             {"type": "Feature", "geometry": { "type": "Point", "coordinates": [list[0].lng, list[0].lat] },
        //                 "properties": { "name": "pt1",}
        //             },
        //             {"type": "Feature", "geometry": { "type": "Point", "coordinates": [list[1].lng, list[1].lat] },
        //                 "properties": { "name": "pt2",}
        //             },
        //             {"type": "Feature", "geometry": { "type": "Point", "coordinates": [list[2].lng, list[2].lat] },
        //                 "properties": { "name": "pt3",}
        //             },
        //             {"type": "Feature", "geometry": { "type": "Point", "coordinates": [list[3].lng, list[3].lat] },
        //                 "properties": { "name": "pt4",}
        //             }
        //         ]
        //     }
        // }

        // map.addSource('source1', ptOnMap)
        //     map.addLayer({
        //         "id": "testLayer",
        //         "source": 'source1',
        //         "type": "circle",
        //         "paint": {
        //             "circle-color": "#FF0000",
        //             "circle-radius": 20
        //         }
        //     });
    // }); 

    const flon = (num) => {
        map.flyTo({center:[list[num].lng, list[num].lat]});
        console.log(list[num].name);
    }

    const sortTable = (noOfRow) => {
        var table, rows, switching, i, x, y, ifsw , num;
        table = document.getElementById("mainTable");
        switching = true;
        num = noOfRow;
        while(switching){
            switching = false;
            rows = table.rows;

            for (i = 1; i < (rows.length - 1) ; i++){
                ifsw = false;

                x = rows[i].getElementsByTagName("TD")[num];
                y = rows[i + 1].getElementsByTagName("TD")[num];

                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    ifsw = true;
                    break;
                }
            }

            if (ifsw) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
            }
        }

    }

    const search = () => {
        var text, filt, table, tr, td, i, value;

        text = document.getElementById("searchBox");
        filt = text.value.toUpperCase();
        
        table = document.getElementById("mainTable");
        tr = table.getElementsByTagName("tr");
        
        for (i = 0; i < tr.length ; i++){
            td = tr[i].getElementsByTagName("td")[0];
            if (td){
                value  = td.textContent || td.innerHTML;
                if (value.toUpperCase().indexOf(filt) > -1){
                    tr[i].style.display = "";
                }
                else{
                    tr[i].style.display = "none";
                }
            }
        }

    }

    const updateList=()=>{
        //Promise
    }

    return(
        <>
        <div>
            <br />
            <br />
            <br />
            <br />
        </div>
        <div class="container col-12">
            <div ref={mapContainer} className="map-container" style={{width: "800px", height: "500px"}}/>
        </div>
        <div class="container col-12">
            <input type="text" id="searchBox" onKeyUp={()=>{search();}} placeholder="Search location name"/>
        </div>
        <div class="container col-12">
            <table id="mainTable" class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col" style={{backgroundColor: "azure"}} onclick={()=>{sortTable(0);}}>Location</th>
                        <th scope="col" style={{backgroundColor: "azure"}} onclick={()=>{sortTable(1);}}>Long/Lat</th>
                        <th scope="col" style={{backgroundColor: "azure"}} onclick={()=>{sortTable(2);}}>Temperature</th>
                        <th scope="col" style={{backgroundColor: "azure"}}>Wind Speed</th>
                        <th scope="col" style={{backgroundColor: "azure"}}>Wind Direction</th>
                        <th scope="col" style={{backgroundColor: "azure"}}>Humidity</th>
                        <th scope="col" style={{backgroundColor: "azure"}}>Precipitation</th>
                        <th scope="col" style={{backgroundColor: "azure"}}>Vis</th>
                        
                    </tr>
                </thead>
                <tr>
                    <td onclick={()=>{flon(0);}}><strong>London</strong></td>
                    <td>-0.118</td>
                    <td>28</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                </tr>
                <tr>
                    <td onclick={()=>{flon(1);}}><strong>Hongkong</strong></td>
                    <td>114.177</td>
                    <td>25</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                </tr>
                <tr>
                    <td onclick={()=>{flon(2);}}><strong>Paris</strong></td>
                    <td>2.349</td>
                    <td>10</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                </tr>
                <tr>
                    <td onclick={()=>{flon(3);}}><strong>Berlin</strong></td>
                    <td>13.404</td>
                    <td>10</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                </tr>
            </table>
        </div>
        </>
    );
}

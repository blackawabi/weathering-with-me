import React, {useEffect, useState, Component} from 'react';
// import { UserContext } from './UserContext';
// import Axios from "axios"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Navbar, Container } from 'react-bootstrap';
import {location} from './favlocation';
import background from "./england.jpg";
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

function ProfilePage() {
    return (
    <>
      <section style={{
            minHeight: "60vh",
            width: "100%",
            height: `100%`,
            // backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0,0,0,0)), url(${background})`,  
            // backgroundColor: "#5d4e99",
            backgroundPosition: "center",
            backgroundSize: "cover",
            position: "relative",
        }}>
        <Profile />
        </section>
     
    </>
    );
  }

function Profile(location) {

    const [listofLocation, setListofLocation] = useState([]);
    
    return(
        <>
        <Navbar bg="dark" variant="dark">
            <Container>
            <Navbar.Brand href="#home">
            Weather with you
            </Navbar.Brand>
            </Container>
        </Navbar>


        <MDBTable striped>

        <MDBTableHead>
            <tr>
            <th>#</th>
            <th>Location</th>
            </tr>
        </MDBTableHead>

        <MDBTableBody>
            <tr>
            <td>1</td>
            <td>Hong Kong</td>
            
            </tr>
            <tr>
            <td>2</td>
            <td>Endland</td>
            
            </tr>
            <tr>
            <td>3</td>
            <td>Japan</td>
            
            </tr>
        </MDBTableBody>
        </MDBTable>

        </>
    );
    
}


export default ProfilePage;




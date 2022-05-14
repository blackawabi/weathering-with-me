/*
1155125519 Hon Wing Ngai	1155143564 Chiu Chak San	1155126052 Kong Ho Pak 
1155136412 Pau Chun Wai	    1155143814 Lam Tsz Hoi	
*/
/**
 * The style of font is adapt from 
 * https://codepen.io/ziteboard/pen/vVyZBa
 */

import React from 'react';
import { Container, Button } from '@mui/material';
import './NotFoundPage.css';
import { Link } from 'react-router-dom';

const errorboxstyle ={
    display: "table",
    width: "100%",
    height: "30vh",
    textAlign: "center",
}

const errorh1 = {
    fontSize: "50px",
    display: "inline-block",
    paddingRIght: "12px",
    animation: "type .5s alternate infinite",
}


const errorh2 = {
    fontSize: "30px",
    display: "inline-block",
    paddingRIght: "12px",
    animation: "type .5s alternate infinite",
}



function NotFoundPage() {
    return(
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
                        backgroundColor:"white",textAlign:"center",
                        shadow: "0 2px 0 rgba(0, 0, 0, 0.05), 0 5px 20px rgba(0, 0, 0, 0.1)"
                    }} 
                        className="border border-light border-4"
            >
                <div id="error-box" style={errorboxstyle}>
                    <div class="error-message" >
                            <h1 style={errorh1}>Error 404</h1>
                            <h2 style={errorh2}>THAT PAGE DOES NOT EXIST</h2>
                    </div>
                </div>

                <Link to='/' style={{textDecoration: 'none'}}>
                    <Button sx={{color: '#5D4E99'}}>Go back to Home</Button>
                </Link>
            </Container>
        </div>
    );
}

export default NotFoundPage;

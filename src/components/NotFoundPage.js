import React from 'react';
import London from '../backgroundImage/London.png'
import { Container, Button } from '@mui/material';
import './NotFoundPage.css';
import { Link } from 'react-router-dom';

function NotFoundPage() {
    return(
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
                        backgroundColor:"white",textAlign:"center",
                        shadow: "0 2px 0 rgba(0, 0, 0, 0.05), 0 5px 20px rgba(0, 0, 0, 0.1)"
                    }} 
                        className="border border-light border-4 balance"
            >
                <div id="main">
                    <div class="fof">
                            <h1>Error 404</h1>
                            <h2>THAT PAGE DOES NOT EXIST</h2>
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

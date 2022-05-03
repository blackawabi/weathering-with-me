import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useContext }  from 'react';
import { Button } from "@mui/material";
import { AuthContext } from "../context/AuthContext";


function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

function NavBar(){
    const {auth, setAuth}=useContext(AuthContext)
    const navigate = useNavigate();
    const logout=()=>{
        fetch('http://localhost:4000/logout',{
            credentials: 'include',
        })
        .then(res=>{
            setAuth(false)
            navigate("/login")
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    return(
        <nav className="navbar navbar-expand-lg navbar-light fixed-top py-3" id="mainNav">
            <div className="container px-4 px-lg-5">
                <div className="navbar-brand">
                    {auth==false &&
                    <Link to="/login" className="navbar-brand">
                        Weathering with me
                    </Link>
                    }
                    {auth==true &&
                    <Link to="/" className="navbar-brand">
                        Weathering with me
                    </Link>
                    }
                </div>
                <button className="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ms-auto my-2 my-lg-0">
                    {auth!=false && getCookie("username")!="admin" &&
                        <>
                            <li className="nav-item">
                                
                                <Link to="/" className="nav-link">
                                    {getCookie("username")}
                                </Link>
                            </li>  
                            <li className="nav-item">
                                <Link to="profile" className="nav-link">
                                    Favourite Location
                                </Link>    
                            </li>        
                            <li className="nav-item">
                                <Link to="#" className="nav-link" onClick={logout}>
                                    Logout
                                </Link>
                            </li>
                        </>
                    }
                    {getCookie("username")=="admin" &&
                        <>
                            <li className="nav-item">
                                <Link to="/admin" className="nav-link">
                                    {getCookie("username")}
                                </Link>
                            </li>  
                            <li className="nav-item">
                                <Link to="#" className="nav-link" onClick={logout}>
                                    Logout
                                </Link>
                            </li>
                        </>
                    }
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;

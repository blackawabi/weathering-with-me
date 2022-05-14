/*
1155125519 Hon Wing Ngai	1155143564 Chiu Chak San	1155126052 Kong Ho Pak 
1155136412 Pau Chun Wai	    1155143814 Lam Tsz Hoi	
*/

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
        fetch('/logout',{
            //credentials: 'include',
        })
        .then(res=>{
            setAuth(0)
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
                    {auth==0 &&
                    <Link to="/login" className="navbar-brand">
                        Weathering with me
                    </Link>
                    }
                    {auth!=0 &&
                    <Link to="/" className="navbar-brand">
                        Weathering with me
                    </Link>
                    }
                </div>
                <button className="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ms-auto my-2 my-lg-0">
                    {auth==1 &&
                        <>
                            <li className="nav-item">
                                
                                <Link to="/profile" className="nav-link">
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
                    {auth==-1 &&
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

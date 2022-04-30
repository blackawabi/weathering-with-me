import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useState }  from 'react';


function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

function NavBar(){
    const [status, setStatus]=React.useState(null)
    const navigate = useNavigate();
    const logout=()=>{
        fetch('http://localhost:4000/logout',{
            credentials: 'include',
        })
        .then(res=>setStatus(res.status))
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    if(status==200){
        navigate(0)
    }
    else return(
        <nav className="navbar navbar-expand-lg navbar-light fixed-top py-3" id="mainNav">
            <div className="container px-4 px-lg-5">
                <div className="navbar-brand">
                    <Link to="/" className="navbar-brand">
                        Weathering with me
                    </Link>
                </div>
                <button className="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ms-auto my-2 my-lg-0">
                    {getCookie("username")!=null && getCookie("username")!="admin" &&
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
                                <Link to="/" className="nav-link" onClick={logout}>
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
                                <Link to="/" className="nav-link" onClick={logout}>
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

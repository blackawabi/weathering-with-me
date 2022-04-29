import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function NavBar(){
    const navigate = useNavigate();
    const logout=()=>{
        localStorage.clear();
        window.location.assign("/login");
    }
    return(
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
                    {localStorage.getItem("user")!=null &&     
                        <>
                            <li className="nav-item">
                                <Link to="profile" className="nav-link">{localStorage.getItem("user")}{" "}
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
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;

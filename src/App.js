import logo from './logo.svg';
import './App.css';
import { Routes, Route, useNavigate,Navigate,useParams} from "react-router-dom";
import Location from './components/Location';
import NavBar from './components/NavBar';
import Login from './components/Login'
import StickyHeadTable from './components/Profile';
import React, { useState, useEffect }  from 'react';
import Admin from './components/Admin';
import London from './backgroundImage/London.png'

//ref
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function App() {
  const [auth, setAuth]=useState(false);
  useEffect(()=>{
      let user=getCookie("username");
      if(user!=null){
          setAuth(true);
      }
  })
  return (
    <>
      <NavBar/>
      <Routes>
        {auth==false &&
        <Route path="/login" element={<Login />}/>
        }
        {auth==true &&
        <Route path="/" element={<Home />}/>
        }
        {auth==true &&
          <Route path="/location/:code" element={<Location />}/>   
        }
        {auth==true &&
          <Route path="/profile" element={<StickyHeadTable />} />
        }
        {getCookie("username")=="admin" &&
          <Route path="/admin" element={<Admin />} />
        }
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </>
    
  );
}
function Home(){
  return(
    <div style={{
      height: "100vh",
      width: "100%",
      backgroundImage: `linear-gradient(rgba(182, 187, 205, 0.7), rgba(4,9,30,0.7)), url(${London})`,  
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundAttachment: "fixed"
  }}> homepage, http://localhost:3000/location/"country code here" </div>
  )
}

function NotFound(){
  return(
    <div style={{
      height: "100vh",
      width: "100%",
      backgroundImage: `linear-gradient(rgba(182, 187, 205, 0.7), rgba(4,9,30,0.7)), url(${London})`,  
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundAttachment: "fixed"
  }}> 404 </div>
  )
}

export default App;

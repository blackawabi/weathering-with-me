import logo from './logo.svg';
import './App.css';
import { Routes, Route, useNavigate,Navigate,useParams} from "react-router-dom";
import Location from './components/Location';
import NavBar from './components/NavBar';
import Login from './components/Login'
import StickyHeadTable from './components/Profile';
import React, { useState, useEffect, useMemo }  from 'react';
import Admin from './components/Admin';
import London from './backgroundImage/London.png' 
import { AuthContext } from './context/AuthContext';
//ref
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function App() {
  const [auth, setAuth]=useState(false);
  const value=useMemo(()=>({auth,setAuth}),[auth,setAuth])
  useEffect(()=>{
    if(getCookie("username")!=null){
      setAuth(true)
    }
  })
 

  return (
    <AuthContext.Provider value={value}>
      <NavBar/>
      <Routes>
        {auth==false&&
          <Route path="/login" element={<Login />}/>
        }
        {auth==true &&
          <>
          <Route path="/" element={<Home />}/>
          <Route path="/location/:code" element={<Location />}/>   
          <Route path="/profile" element={<StickyHeadTable />} />
            {
              getCookie("username")=="admin" &&
              <Route path="/admin" element={<Admin />} />
            }
          </>
        }
          <Route path="error" element={<NotFound/>}/>
          <Route path="*" element={auth==false?<Navigate to="/login"/>:<Navigate to="error"/>}/>
      </Routes>
    </AuthContext.Provider>
    
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

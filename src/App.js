import logo from './logo.svg';
import './App.css';
import { Routes, Route, useNavigate,Navigate,useParams} from "react-router-dom";
import Location from './components/Location';
import NavBar from './components/NavBar';
import Login from './components/Login'
import StickyHeadTable from './components/Profile';
import React, { useState, useEffect, useMemo }  from 'react';
import Admin from './components/Admin';
import Wea from './components/testWea';
import London from './backgroundImage/London.png' 
import { AuthContext } from './context/AuthContext';
import Markmap from './components/Markmap';
//ref
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function App() {
  const [auth, setAuth]=useState();
  const value=useMemo(()=>({auth,setAuth}),[auth,setAuth])
  useEffect(()=>{
    if(getCookie("username")=="admin"){
      setAuth(-1)
    }else if(getCookie("username")!=null){
      setAuth(1)
    }else setAuth(0)
  })
 

  return (
    <AuthContext.Provider value={value}>
      <NavBar/>
      <Routes>
        {auth==0&&
          <Route path="/login" element={<Login />}/>
        }
        {auth!=0 &&
          <>
          <Route path="/" element={<Wea />}/>
          <Route path="/location/:code" element={<Location />}/>   
          <Route path="/profile" element={<StickyHeadTable />} />
            
          </>
        }
        {
          auth==-1 &&
          <Route path="/admin" element={<Admin />} />
        }
          <Route path="error" element={<NotFound/>}/>
          <Route path="*" element={auth==0?<Navigate to="/login"/>:<Navigate to="error"/>}/>
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

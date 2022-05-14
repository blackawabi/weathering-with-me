import { Routes, Route,Navigate} from "react-router-dom";
import Location from './components/Location';
import NavBar from './components/NavBar';
import Login from './components/Login'
import Profile from './components/Profile';
import React, { useState, useEffect, useMemo }  from 'react';
import Admin from './components/Admin'; 
import { AuthContext } from './context/AuthContext';
import Markmap from './components/Markmap';
import NotFoundPage from './components/NotFoundPage';


// Code adapted from kirlich on stackoverflow:
// https://stackoverflow.com/questions/10730362/get-cookie-by-name
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
          <Route path="/" element={<Markmap />}/>
          <Route path="/location/:code" element={<Location />}/>   
          <Route path="/profile" element={<Profile />} />
   
            <Route path="/admin" element={<Admin />} />
          
          <Route path="error" element={<NotFoundPage />}/> 
          </>
        }

          <Route path="*" element={auth==0?<Navigate to="/login"/>:<NotFoundPage />}/>
      </Routes>
    </AuthContext.Provider>
    
  );
}

export default App;

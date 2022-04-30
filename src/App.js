import logo from './logo.svg';
import './App.css';
import { Routes, Route, useNavigate,Navigate } from "react-router-dom";
import Location from './components/Location';
import NavBar from './components/NavBar';
import Login from './components/Login'
import StickyHeadTable from './components/Profile';
import React, { useState, useEffect }  from 'react';
import Admin from './components/Admin';

//ref
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function App() {
  const [auth, setAuth]=useState(0);
  const navigate = useNavigate();
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
        {auth==0 &&
          <Route path="/login" element={<Login />}/>
        }
        {auth!=0 &&
          <Route path="/location" element={<Location />} />
        }
        {auth!=0 && getCookie("username")=="admin" &&
          <Route path="/admin" element={<Admin />} />
        }
        <Route path="/profile" element={<StickyHeadTable />} />
        <Route path="*" element={<Navigate to={auth==0 ?  "/login": getCookie("username")=="admin"?"/admin":"/location" } />} />
      </Routes>
    </>
    
  );
}

export default App;

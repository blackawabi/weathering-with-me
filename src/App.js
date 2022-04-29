import logo from './logo.svg';
import './App.css';
import { Routes, Route, useNavigate,Navigate } from "react-router-dom";
import Location from './components/Location';
import NavBar from './components/NavBar';
import Login from './components/Login'
import StickyHeadTable from './components/Profile';
import React, { useState, useEffect }  from 'react';


function App() {
  const [auth, setAuth]=useState(0);
  const navigate = useNavigate();
  useEffect(()=>{
      let user = localStorage.getItem("user");
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
        <Route path="/profile" element={<StickyHeadTable />} />
        <Route path="*" element={<Navigate to={auth==0 ?  "/login": "/location" } />} />
      </Routes>
    </>
    
  );
}

export default App;

// import * as React from 'react';
import React, { useState, useContext, useEffect, useRef }  from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TablePagination from '@mui/material/TablePagination';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {useNavigate} from 'react-router-dom'
import London from '../backgroundImage/London.png'
import { Container,TextField, Box, Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import { AuthContext } from '../context/AuthContext';

import users from "./userdata";

const columns = [
  { id: 'name', label: 'Location', minWidth: 170 },
];

// function createData(name, code, population, size) {
//   // const density = population / size;
//   return { name, code, population, size };
// }

// const rows = [
//   createData('India'),
//   createData('China'),
//   createData('Italy'),
//   createData('United States'),
//   createData('Canada'),
//   createData('Australia'),
//   createData('Germany'),
//   createData('Ireland'),
//   createData('Mexico'),
//   createData('Japan'),
//   createData('France'),
//   createData('United Kingdom'),
//   createData('Russia'),
//   createData('Nigeria'),
// //   createData('Brazil'),
// ];

function createUserData(username, password, favourite, permission) {
  // const density = population / size;
  return { username, password, favourite, permission};
};

// function extractUserFavourite({users}) {
//   return {users.favourite}
// }; 


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      fontSize: 16,
      textAlign:"center",
    },
    [`&.${tableCellClasses.body}`]: {
      textAlign:"center",
      fontSize: 12,
    },
  }));
  
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

// function Profile({users}) {
//   return(
//     <div>
//       <StickyHeadTable user={users}/>
//     </div>
//   );
// }

export default function StickyHeadTable() {
  const {auth, setAuth}=useContext(AuthContext);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [info, setInfo]=useState([])
  const [fetchFinish,setFetchFinish]=useState(false)

  useEffect(() => {
    if(fetchFinish==false)
    //fetch("http://localhost:4000/getFavourite",{
    fetch("/getFavourite",{
           // credentials: 'include',
        })
    .then(res=>res.json())
    .then(data=>{
        setInfo(data)
        setFetchFinish(true)
    })
  })


//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

  return (
    <div style={{
        height: "100vh",
        width: "100%",
        backgroundImage: `linear-gradient(rgba(182, 187, 205, 0.7), rgba(4,9,30,0.7)), url(${London})`,  
        backgroundPosition: "center",
        backgroundSize: "cover",
        position: "fixed",
    }}>
    
        <Container maxWidth='lg'
        // height = '100%'
        sx={{
            backgroundColor:"white",textAlign:"center"
        }} 
        className="border border-light border-4 balance"
        >
            <Box sx={{
            margin:{
                xs:"2em 0em 2em 0em",
                md:"3em 3em 3em 3em"
                // lg:"10em 10em 10em 10em"
            }
            }} >
                <h2 className="text-center ">Favourite Location</h2>
                {/* <p>{info.map(infos =>{
                  return <option value={infos}>{infos}</option>
                })}</p> */}
                <hr className="divider divider-dark text-center" />
                
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                  <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                          <StyledTableRow>
                          {columns.map((column) => (
                              <StyledTableCell
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth }}
                                >
                                {column.label}
                              </StyledTableCell>
                          ))}
                          </StyledTableRow>
                      </TableHead>

                      {/* <TableBody>
                          {rows
                          // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((row) => {
                              return (
                              <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                  {columns.map((column) => {
                                  const value = row[column.id];
                                  return (
                                      <StyledTableCell key={column.id} align={column.align}>
                                      {column.format && typeof value === 'number'
                                          ? column.format(value)
                                          : value}
                                      </StyledTableCell>
                                  );
                                  })}
                              </StyledTableRow>
                              );
                          })}
                      </TableBody> */}

                      <TableBody>
                        {/* {users[0].favourite.map((row) => ( */}
                        {info.map((row) => ( 
                          <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">
                              {row}
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                      
                    </Table>
                  </TableContainer>
                  {/* <TablePagination
                      rowsPerPageOptions={[10, 25, 100]}
                      component="div"
                      count={rows.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                  /> */}
                </Paper>
            </Box>   
        </Container>        
    </div>
  );
}

// export default Profile; 

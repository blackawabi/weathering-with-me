/*
1155125519 Hon Wing Ngai	1155143564 Chiu Chak San	1155126052 Kong Ho Pak 
1155136412 Pau Chun Wai	    1155143814 Lam Tsz Hoi	
*/

/**
 * Code below is reference from MUI
 * https://mui.com/zh/material-ui/react-table/
 */

import React, { useState, useEffect }  from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';

import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { Container, Box } from '@mui/material';

const Stylecell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    textAlign:"center",
  },
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.common.black,
    textAlign:"center",
    fontSize: 16,
  },
}));

const columns = [
  { 
    id: 'name', 
    label: 'Location', 
    minWidth: 170 
  },
];


const Stylerow = styled(TableRow)(({ theme }) => ({
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));


  


export default function Profile() {
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


  return (
    <div style={{
        height:"100vh",
        width:"100%",
        backgroundColor:"#75CFF0",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        paddingTop:"22vh"
    }}>
    
        <Container maxWidth='lg'
        // height = '100%'
        sx={{
            backgroundColor:"white",textAlign:"center"
        }} 
        className="border border-light border-4"
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
                          <Stylerow>
                          {columns.map((column) => (
                              <Stylecell
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth }}
                                >
                                {column.label}
                              </Stylecell>
                          ))}
                          </Stylerow>
                      </TableHead>

                      <TableBody>
                        {info.map((row) => ( 
                          <Stylerow key={row.name}>
                            <Stylecell component="th" scope="row">
                              {row}
                            </Stylecell>
                          </Stylerow>
                        ))}
                      </TableBody>
                      
                    </Table>
                  </TableContainer>
                
                </Paper>
            </Box>   
        </Container>        
    </div>
  );
}

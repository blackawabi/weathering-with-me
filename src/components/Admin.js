import London from '../backgroundImage/London.png'
import { DataGrid } from '@mui/x-data-grid';
import * as React from 'react';
import { Container, Grid, Dialog, TextField, Button, DialogTitle, 
    DialogContent, DialogActions, Snackbar, Alert, CircularProgress} from '@mui/material';

export default function Admin(){
    const [rows1,setRows1]=React.useState([]);
    const [rows2,setRows2]=React.useState([]);
    const [locName,setLocName]=React.useState("");
    const [lat, setLat]=React.useState(0);
    const [lng, setLng]=React.useState(0);
    const [currentUsername,setCurrentUsername]=React.useState("")
    const [currentLocName,setCurrentLocName]=React.useState("")
    const [username, setUsername]=React.useState("");
    const [password,setPassword]=React.useState("");
    const [openAddLoc,setOpenAddLoc]=React.useState(false)
    const [openEditLoc,setOpenEditLoc]=React.useState(false)
    const [openDelLoc,setOpenDelLoc]=React.useState(false)
    const [openAddUser,setOpenAddUser]=React.useState(false)
    const [openEditUser,setOpenEditUser]=React.useState(false)
    const [openDelUser,setOpenDelUser]=React.useState(false)
    const [status,setStatus]=React.useState(0)
    const [alertMessage,setAlertMessage]=React.useState("")
    const [alertColor,setAlertColor]=React.useState("");
    const [snackbarOpen, setSnackbarOpen]=React.useState(false)
    const handleOpenAddLoc=()=>{
        setOpenAddLoc(true);
    }
    const handleOpenEditLoc=()=>{
        setOpenEditLoc(true);
    }
    const handleOpenDelLoc=()=>{
        setOpenDelLoc(true);
    }
    const handleOpenAddUser=()=>{
        setOpenAddUser(true);
    }
    const handleOpenEditUser=()=>{
        setOpenEditUser(true);
    }
    const handleOpenDelUser=()=>{
        setOpenDelUser(true);
    }
    const handleSnackbarClose=()=>{
        setSnackbarOpen(false);
    }
    const handleClose=()=>{
        setOpenAddLoc(false)
        setOpenDelLoc(false)
        setOpenEditLoc(false)
        setOpenAddUser(false)
        setOpenEditUser(false)
        setOpenDelUser(false)
        setLocName("")
        setLat("")
        setLng("")
        setUsername("")
        setCurrentLocName("")
        setCurrentUsername("")
        setPassword("")
        setSnackbarOpen(false);
    }
    const handleCurrentLocName=(event)=>{
        setCurrentLocName(event.target.value);
    }
    const handleLocName=(event)=>{
        setLocName(event.target.value);
    }
    const handleLng=(event)=>{
        setLng(event.target.value);
    }
    const handleLat=(event)=>{
        setLat(event.target.value);
    }
    const handleUsername=(event)=>{
        setUsername(event.target.value);
    }
    const handleCurrentUsername=(event)=>{
        setCurrentUsername(event.target.value);
    }
    const handlePassword=(event)=>{
        setPassword(event.target.value);
    }
    const submitCreateUser=()=>{
        if(username.length>=4 && username.length<=20 && password.length>=4 && password.length<=20){
            fetch("/account",{
                method:"POST",
                body: new URLSearchParams({
                    "username":username,
                    "password":password
                }),
            })   
            .then(res=>{
                res.text()
                .then(text=>{
                    if(res.status==401){
                        setAlertColor("error")
                        setAlertMessage(text)
                        setSnackbarOpen(true)
                    }else if(res.status==201){
                        handleClose()
                        setAlertColor("success")
                        setAlertMessage(text)
                        setSnackbarOpen(true)
                        reload()
                    }
                })
            })
        }else{
            setAlertColor("error")
            setAlertMessage("Username and Password must be in length of 4-20")
            setSnackbarOpen(true)
        }
        


    }
    const submitDeleteUser=()=>{
        fetch("/account",{
            method:"DELETE",
            body: new URLSearchParams({
                "username":username,
            }),
        })   
        .then(res=>{
            res.text().then(text=>{
                if(res.status==401){
                    setAlertColor("error")
                    setAlertMessage(text)
                    setSnackbarOpen(true)
                }else if(res.status==200){
                    handleClose()
                    setAlertColor("success")
                    setAlertMessage(text)
                    setSnackbarOpen(true)
                    reload()
                }
            })
            
        })
    }
    const reloadWeather=()=>{
        fetch("/locations")
        .then(res=>{
            if(res.status==200){
                setAlertColor("success")
                setAlertMessage("Weather reloaded")
                setSnackbarOpen(true)
            }
        })
    }
    const submitEditUser=()=>{
        fetch("/account",{
            method:"PUT",
            body: new URLSearchParams({
                "original_username":currentUsername,
                "new_username":username,
                "new_password":password
            }),
        })   
        .then(res=>{
            res.text().then(text=>{
                if(res.status==401){
                    setAlertColor("error")
                    setAlertMessage(text)
                    setSnackbarOpen(true)
                }else if(res.status==200){
                    handleClose()
                    setAlertColor("success")
                    setAlertMessage(text)
                    setSnackbarOpen(true)
                    reload()
                }
            })
            
        })   
    }
    const submitCreateLocation=()=>{
        fetch("/location",{
            method:"POST",
            body: new URLSearchParams({
                "name":locName,
                "lat":lat,
                "long":lng
            }),
        })   
        .then(res=>{
            res.text().then(text=>{
                if(res.status==401){
                    setAlertColor("error")
                    setAlertMessage(text)
                    setSnackbarOpen(true)
                }else if(res.status==201){
                    handleClose()
                    setAlertColor("success")
                    setAlertMessage(text)
                    setSnackbarOpen(true)
                    reload()
                }
            })
            
        })   
    }
    const submitEditLocation=()=>{
        fetch("/location",{
            method:"PUT",
            body: new URLSearchParams({
                "original_locationName":currentLocName,
                "new_locationName":locName,
                "lat":lat,
                "long":lng
            }),
        })   
        .then(res=>{
            res.text().then(text=>{
                if(res.status==401){
                    setAlertColor("error")
                    setAlertMessage(text)
                    setSnackbarOpen(true)
                }else if(res.status==200){
                    handleClose()
                    setAlertColor("success")
                    setAlertMessage(text)
                    setSnackbarOpen(true)
                    reload()
                }
            })
            
        })   
    }
    const submitDeleteLocation=()=>{
        fetch("/location",{
            method:"DELETE",
            body: new URLSearchParams({
                "locationName":locName,
            }),
        })   
        .then(res=>{
            res.text().then(text=>{
                if(res.status==401){
                    setAlertColor("error")
                    setAlertMessage(text)
                    setSnackbarOpen(true)
                }else if(res.status==204){
                    handleClose()
                    setAlertColor("success")
                    setAlertMessage(text)
                    setSnackbarOpen(true)
                    reload()
                }
            })
            
        })   
    }


    const columns1=[

        {
            field: 'username',
            headerName: 'username',
            width: 200,
            editable: true,
        },
        {
            field: 'password',
            headerName: 'password',
            width: 200,
            editable: true,
        },

    ]
    const columns2=[

        {
            field: 'name',
            headerName: 'name',
            width: 133,
            editable: true,
        },
        {
            field: 'lat',
            headerName: 'lat',
            width: 133,
            editable: true,
        },
        {
            field: 'long',
            headerName: 'long',
            width: 133,
            editable: true,
        },

    ]

    function reload(){
        fetch("/accounts")
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            setRows1(data)
        })
        fetch("/locations")
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            setRows2(data)
        })
    }

    React.useEffect(()=>{
        let data1,data2
        if(rows1.length==0 && rows2.length==0)
        Promise.all([
            fetch("/accounts")
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
                data1=data
            }),
            fetch("/locations")
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
                data2=data
            })
        ]).then(()=>{setRows1(data1);setRows2(data2)});
        
    })
    return(
        <>
            <div style={{
                height: "100vh",
                width: "100%",
                backgroundImage: `linear-gradient(rgba(182, 187, 205, 0.7), rgba(4,9,30,0.7)), url(${London})`,  
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundAttachment: "fixed"
            }}> 
            
                <Container maxWidth="lg" style={{padding:"6em 0em 2em 0em",}}>
                    <Grid container spacing={2} >
                        <Grid item xs={6} >
                            <h1 class="display-1 text-center text-white" style={{userSelect: "none"}}>
                                User
                            </h1>
                            <div style={{ height: 450, width: '100%', backgroundColor:"white"}}>
                                <DataGrid
                                    rows={rows1}
                                    columns={columns1}
                                    pageSize={6}
                                    rowsPerPageOptions={[6]}
                                    getRowId={(row) => row._id}
                                    
                                />
                            </div>
                            <Button color="success" variant="contained" onClick={handleOpenAddUser}>
                                Create User
                            </Button>
                            <Button color="secondary" variant="contained" onClick={handleOpenEditUser}>
                                Edit User
                            </Button>
                            <Button color="error" variant="contained"onClick={handleOpenDelUser}>
                                Delete User
                            </Button>
                            <Dialog onClose={handleClose} open={openAddUser}>
                                <DialogTitle>Create User</DialogTitle>
                                <DialogContent>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        label="New Username"
                                        value={username}
                                        onChange={handleUsername}  
                                        fullWidth     
                                        variant="standard"                 
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        label="Password"
                                        value={password}
                                        type="password"
                                        onChange={handlePassword}  
                                        fullWidth           
                                        variant="standard"           
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button onClick={submitCreateUser}>Submit</Button>
                                </DialogActions>
                            </Dialog>
                            <Dialog onClose={handleClose} open={openEditUser}>
                                <DialogTitle>Edit User</DialogTitle>
                                <DialogContent>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        label="Current Username"
                                        value={currentUsername}
                                        onChange={handleCurrentUsername}  
                                        fullWidth     
                                        variant="standard"                 
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        label="Username"
                                        value={username}
                                        onChange={handleUsername}  
                                        fullWidth     
                                        variant="standard"                 
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        label="Password"
                                        value={password}
                                        type="password"
                                        onChange={handlePassword}  
                                        fullWidth           
                                        variant="standard"           
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button onClick={submitEditUser}>Submit</Button>
                                </DialogActions>
                            </Dialog>
                            <Dialog onClose={handleClose} open={openDelUser}>
                                <DialogTitle>Delete User</DialogTitle>
                                <DialogContent>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        label="Username"
                                        value={username}
                                        onChange={handleUsername}  
                                        fullWidth     
                                        variant="standard"                 
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button onClick={submitDeleteUser}>Submit</Button>
                                </DialogActions>
                            </Dialog>
                            
                        </Grid>
                        <Grid item xs={6} >
                            <h1 class="display-1 text-center text-white" style={{userSelect: "none"}}>
                                Location
                            </h1>
                            <div style={{ height: 450, width: '100%', backgroundColor:"white"}}>
                                <DataGrid
                                    rows={rows2}
                                    columns={columns2}
                                    pageSize={6}
                                    rowsPerPageOptions={[6]}
                                    getRowId={(row) => row._id}
    
                                />
                            </div>
                            <Button color="success"variant="contained" onClick={handleOpenAddLoc}>
                                Create Location
                            </Button>
                            <Button color="secondary" variant="contained"onClick={handleOpenEditLoc}>
                                Edit Location
                            </Button>
                            <Button color="error" variant="contained"onClick={handleOpenDelLoc}>
                                Delete Location
                            </Button>
                            <Button color="success" variant="contained"onClick={reloadWeather}>
                                Reload Weather 
                            </Button>
                            <Dialog onClose={handleClose} open={openAddLoc}>
                                <DialogTitle>Add Location</DialogTitle>
                                <DialogContent>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        label="Location Name"
                                        value={locName}
                                        onChange={handleLocName}  
                                        fullWidth     
                                        variant="standard"                 
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        label="Lng"
                                        type="number"
                                        value={lng}
                                        onChange={handleLng}  
                                        fullWidth           
                                        variant="standard"           
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        label="Lat"
                                        type="number"
                                        value={lat}
                                        onChange={handleLat}
                                        fullWidth
                                        variant="standard"
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button onClick={submitCreateLocation}>Submit</Button>
                                </DialogActions>
                            </Dialog>
                            <Dialog onClose={handleClose} open={openEditLoc}>
                                <DialogTitle>Edit Location</DialogTitle>
                                <DialogContent>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        label="Current Location Name"
                                        value={currentLocName}
                                        onChange={handleCurrentLocName}  
                                        fullWidth     
                                        variant="standard"
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        label="Location Name"
                                        value={locName}
                                        onChange={handleLocName}  
                                        fullWidth     
                                        variant="standard"                 
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        label="Lng"
                                        type="number"
                                        value={lng}
                                        onChange={handleLng}  
                                        fullWidth           
                                        variant="standard"           
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        label="Lat"
                                        type="number"
                                        value={lat}
                                        onChange={handleLat}
                                        fullWidth
                                        variant="standard"
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button onClick={submitEditLocation}>Submit</Button>
                                </DialogActions>
                            </Dialog>
                            <Dialog onClose={handleClose} open={openDelLoc}>
                                <DialogTitle>Delete Location</DialogTitle>
                                <DialogContent>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        label="Location Name"
                                        value={locName}
                                        onChange={handleLocName}  
                                        fullWidth     
                                        variant="standard"                 
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button onClick={submitDeleteLocation}>Submit</Button>
                                </DialogActions>
                            </Dialog>
                        </Grid>
                    </Grid>
                        
                   
                
                </Container>
                <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                    <Alert onClose={handleSnackbarClose} severity={alertColor} sx={{ width: '100%' }}>
                        {alertMessage}
                    </Alert>
                </Snackbar>
                {rows1.length==0 || rows2.length==0?
                <CircularProgress sx={{
                        right:{
                            xs:20,
                            md:40
                        }, 
                        bottom:{
                            xs:20,
                            md:40
                        }, 
                        position:"fixed"
                }}/>:
                <></>
                }
                
                
            </div>
        </>
    );
}
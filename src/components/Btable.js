
import {useState, useEffect} from "react";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory,{textFilter} from "react-bootstrap-table2-filter";
import { useNavigate } from "react-router-dom";
import paginationFactory from 'react-bootstrap-table2-paginator';


function Btable(props) {
  const navigate=useNavigate();
  const [data,setData] = useState([]);
  const [time,setTime] = useState();

  

  useEffect(() => {
    if (time==null){
      getData();
    }
    
  }, []);
  const getData = () => {
    setData(props.info);
    let newDate = new Date(Date.now())
    setTime(`${newDate.getDate()}/${newDate.getMonth()+1} ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`);
  };

  const columns=[
  {
    dataField:"name",
    text:"Name",
    sort:true,
    filter: textFilter(),      
    headerStyle:{
      backgroundColor:"white"
    } 
  },
  {
    dataField:"country",
    text:"Country",
    sort: true,
    filter: textFilter(),
    headerStyle:{
      backgroundColor:"white"
    } 
  },
  {
    dataField:"lat",
    text:"Lat",
    sort:true,
    headerStyle:{
      backgroundColor:"white"
    } 
  },
  {
    dataField:"long",
    text:"Lng",
    sort:true,
    headerStyle:{
      backgroundColor:"white"
    } 
  },
  {
    dataField:"temp_c",
    text:"Temperature",
    sort:true,
    headerStyle:{
      backgroundColor:"white"
    } 
  },
  {
    dataField:"wind_kph",
    text:"Wind Speed",
    sort:true,
    headerStyle:{
      backgroundColor:"white"
    } 
  },
  {
    dataField:"wind_dir",
    text:"Wind Direction",
    headerStyle:{
      backgroundColor:"white"
    } 
  },
  {
    dataField:"humidity",
    text:"Humidiity(%)",
    sort:true,
    headerStyle:{
      backgroundColor:"white"
    } 
  },
  {
    dataField:"precip_mm",
    text:"Precipitation(mm)",
    sort:true,
    headerStyle:{
      backgroundColor:"white"
    } 
  },
  {
    dataField:"vis_km",
    text:"Visibility(km)",
    sort:true,
    headerStyle:{
      backgroundColor:"white"
    } 
  }
  ]
  const rowEvents={
    onClick:(e,row,rowIndex)=>{
      navigate("/location/"+row.name)
    }
  }
  let width=window.innerWidth>1024?4:2
  return (
    <>
    <div className="App weather-table">
      <div className="text-right">
        Latest weather before: {time}
      </div>
      <BootstrapTable
        keyField="id"
        data={data} 
        columns={columns}
        striped
        hover
        condensed
        filter={filterFactory()}
        rowEvents={rowEvents}
        pagination={ 
          paginationFactory({
            paginationSize: 5,
            withFirstAndLast: true,
            alwaysShowAllBtns: true,
            sizePerPageList: [{
              text: '5', value: width
            }],
            hideSizePerPage: true,
          }) 
        }
        rowStyle={ { backgroundColor: 'white' } }
      />
  
    </div>

    
    
  </>

  );
}

export default Btable;

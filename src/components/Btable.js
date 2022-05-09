
import axios from "axios";
import {useState, useEffect} from "react";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory,{textFilter} from "react-bootstrap-table2-filter";

let form_body = {
  username: 'testervan',
  password: '111222',
  permission: 'true'
};


function Btable() {

  const [data,setData] = useState([]);

  

  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
        fetch('http://localhost:4000/locations', {
        method: 'GET',

        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setData(data);
        })
        .catch();
  };

  const columns=[
  {
    dataField:"name",
    text:"Name",
    sort:true,
    filter: textFilter()
  },
  {
    dataField:"country",
    text:"Country",
    sort: true,
    filter: textFilter()
  },
  {
    dataField:"lat",
    text:"Lat",
    sort:true,
  },
  {
    dataField:"long",
    text:"Lng",
    sort:true,
  },
  {
    dataField:"temp_c",
    text:"Temperature",
    sort:true,
  },
  {
    dataField:"wind_kph",
    text:"Wind Speed",
    sort:true,
  },
  {
    dataField:"wind_dir",
    text:"Wind Direction",
  },
  {
    dataField:"humidity",
    text:"Humidiity(%)",
    sort:true,
  },
  {
    dataField:"precip_mm",
    text:"Precipitation(mm)",
    sort:true,
  },
  {
    dataField:"vis_km",
    text:"Visibility(km)",
    sort:true,
  }
  ]
  return (
    <div className="App">
      <BootstrapTable
        keyField="id"
        data={data} 
        columns={columns}
        striped
        hover
        condensed
        filter={filterFactory()}
        />
    </div>

  );
}

export default Btable;


import axios from "axios";
import {useState, useEffect} from "react";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory,{textFilter} from "react-bootstrap-table2-filter";

let form_body = {
  username: 'tester01',
  password: '1234',
  permission: 'true'
};


function Btable() {

  const [data,setData] = useState([]);

  

  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    // axios("https://jsonplaceholder.typicode.com/comments").then((res)=>
    //   {console.log(res.data);
    //   setData(res.data);
    //   //res.date.forEach(obj,ind=>obj.__id=ind)
    //   }
    // );
        fetch('http://119.246.79.200:8080/locations', {
        method: 'POST',
        body: new URLSearchParams(form_body),
        })
        .then(res => res.text())
        .then(data => {
            console.log(data);
            setData(data);
        })
        .catch();
  };

  const columns=[
  //   {
  //   dataField:"email",
  //   text:"Email",
  //   sort: true ,
  //   filter: textFilter()
  // },
  // {
  //   dataField:"postId",
  //   text:"P id"
  // },
  // {
  //   dataField:"name",
  //   text:"Name"
  // }
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
    text:"Lat",
    sort:true,
  },
  {
    dataField:"temp_c",
    text:"Temperature",
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

import React, { useState, useEffect } from "react";
import _ from "lodash";
const pageSize = 4;
function App() {
  const [data, setuserData] = useState([]);
  const [paginated, setPaginated] = useState([]);
  const [currentpage, setCurrentpage] = useState(1);
    const [bid,setBid]=useState(true);
  useEffect(() => {
    fetch("https://intense-tor-76305.herokuapp.com/merchants")
      .then((response) => response.json())
      .then((json) => {
        setuserData(json);
        setPaginated(_(json).slice(0).take(pageSize).value());
      });
  }, []);

    const handler=()=>{
      setBid(!bid);
    } 
    const rowhandler=(id)=>{
        return "working"
    } 

  const userrows = () => {
    return paginated.map((dt) => {
      return (
        <tr onClick={rowhandler} key={dt.id} style={{cursor:"pointer"}}>
          <td>{dt.id}</td>
     
          <td><img style={{height:"40px",width:"40px"}} src={dt.avatarUrl}/>{`${dt.firstname} ${dt.lastname}`}</td>
          <td>{dt.email}</td>
          <td>{dt.phone}</td>
          <td>{`${(dt.hasPremium)}`}</td>
          
          <td>{bid ? `${dt.bids.reduce((acc,item)=>acc =acc >item.amount ? item:item.amount,0)}`:`${dt.bids.reduce((acc,item)=>acc =acc < item.amount ? acc:item.amount)}` }
              </td>
          
        </tr>
      );
    });
  };
  //pagination
  const pagecount = data ? Math.ceil(data.length / pageSize) : 0;
  if (pagecount === 1) return null;
  const pages = _.range(1, pagecount + 1);

  const pagination = (pageNO) => {
    setCurrentpage(pageNO);
    const startIndex = (pageNO - 1) * pageSize;
    const paginationdata = _(data).slice(startIndex).take(pageSize).value();
    setPaginated(paginationdata);
  };

  return (
    <div>
      <table className="table">
        <thead>
          {/* <tr style={{ background: "gray" }}> {handlehead()}</tr> */}
          <td><b>Id</b></td>
          <td><b>Name</b></td>
          <td><b>Email</b></td>
          <td><b>Phone_no</b></td>
          <td><b>Premium</b></td>
          <td><b>Max/Min bid</b></td>
          <td></td>
        
        </thead>
        <tbody>{userrows()}</tbody>
      </table>
      <nav className="d-flex justify-content-center">
        <ul
          className="pagination"
          style={{ marginTop: "50px", position: "fixed" }}
        >
          {pages.map((page) => {
            return (
              <li
                className={
                  page === currentpage ? "page-item active" : "page-item"
                }
              >
                <p className="page-link" onClick={() => pagination(page)}>
                  {" "}
                  {page}
                </p>
              </li>
            );
          })}
        </ul>
            <button onClick={handler}>Max/Min bid</button>
      </nav>
    </div>
  );
}

export default App;

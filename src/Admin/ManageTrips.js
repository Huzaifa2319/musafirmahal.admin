import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import "../style/Style.css";

const ManageTrips = () => {
  const [trips, setTrips] = useState([{}]);

  function fetchT() {
    let token = localStorage.getItem("adtoken");
    const options = {
      url: "https://musafirmahalbackend.vercel.app/getTrips",
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios(options)
      .then((response) => {
        console.log(response.data);
        setTrips(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchT();
  }, []);

  function Show(obj) {
    {
      console.log("------", obj);
    }
    return (
      <Row
        tripid={obj._id}
        name={obj.name}
        img={obj.img}
        price={obj.price}
        depLocation={obj.depLocation}
        estTime={obj.estTime}
        date={obj.date}
        depTime={obj.depTime}
        duration={obj.duration}
        contact={obj.contact}
        isExpire={obj.isExpire}
        fetchT={fetchT}
      />
    );
  }

  return (
    <>
      <div className="mtrip">
        <h1>Manage Trips</h1>
        <div className="box">
          <table className="table table-striped table-hover">
            <thead>
              <th>Trip id</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Location</th>
              <th>Time</th>
              <th>Est-Time</th>
              <th>Date</th>
              <th>Duration</th>
              <th>Contact</th>
              <th>Expire</th>
              <th>T/F Action</th>
              <th>Delete</th>
            </thead>

            <tbody>{trips.map(Show)}</tbody>
          </table>
        </div>
      </div>
    </>
  );
};

const Row = (props) => {
  const delHandel = () => {
    let token = localStorage.getItem("adtoken");
    alert(props.tripid);
    const request = {
      url: `https://musafirmahalbackend.vercel.app/deleteTrip/${props.tripid}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios(request)
      .then((response) => {
        console.log(response);
        props.fetchT();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const expireHandel = () => {
    let token = localStorage.getItem("adtoken");
    const request = {
      url: `https://musafirmahalbackend.vercel.app/updateTrips/${props.tripid}`,
      method: "PUT",
      data: { isExpire: props.isExpire },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios(request)
      .then((response) => {
        console.log(response);
        props.fetchT();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <tr className="trows">
        <td>{props.tripid}</td>
        <td>
          <img style={{}} src={props.img} alt="loading" />
        </td>
        <td>{props.name}</td>
        <td>{props.price}</td>
        <td>{props.depLocation}</td>
        <td>{props.depTime}</td>
        <td>{props.estTime}</td>
        <td>{props.date}</td>
        <td>{props.duration}</td>
        <td>{props.contact}</td>
        <td>{props.isExpire + "."}</td>
        {/* <td>{props.description}</td> */}
        <td>
          <button className="btn btn-warning" onClick={expireHandel}>
            Open
          </button>
        </td>
        <td>
          <div style={{}}>
            <button className="btn btn-danger" onClick={delHandel}>
              Delete
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default ManageTrips;

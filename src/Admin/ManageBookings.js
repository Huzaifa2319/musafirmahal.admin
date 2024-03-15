import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import "../style/Style.css";
import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Logout from "../Logout";
const ManageBookings = () => {
  const [trips, setTrips] = useState([{}]);
  const navigate = useNavigate();
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
        Logout();
        console.log(err);
        localStorage.removeItem("adtoken");
        navigate("/login");
      });
  }

  useEffect(() => {
    fetchT();
  }, []);

  function Show(obj) {
    // {
    //   console.log("------", obj);
    // }
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
        <h1>Manage Bookings</h1>
        <div className="box">
          <div class="table-responsive">
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
                <th>Bookings</th>
              </thead>

              <tbody>{trips.map(Show)}</tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

const Row = (props) => {
  const navigate = useNavigate();
  // console.log(props.tripid);
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
          <div style={{}}>
            <Link
              to={`/bookingdetails/${props.tripid}`}
              className="btn btn-primary"
            >
              Bookings
            </Link>
          </div>
        </td>
      </tr>
    </>
  );
};

export default ManageBookings;

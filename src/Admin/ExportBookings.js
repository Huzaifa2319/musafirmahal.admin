import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Logout from "../Logout";
import { useNavigate, useParams } from "react-router-dom";
import "../style/Style.css";
import { CSVLink } from "react-csv";

const ExportBookings = () => {
  const { id } = useParams();
  const [book, setBook] = useState([]);
  const [trip, setTrip] = useState({});
  const navigate = useNavigate();
  function fetchT() {
    let token = localStorage.getItem("adtoken");
    const options = {
      url: `https://musafirmahalbackend.vercel.app/tripBooked/${id}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios(options)
      .then((response) => {
        setBook(response.data);
        console.log("<><><>", response.data);
      })
      .catch((err) => {
        console.log(err);
        Logout();
        localStorage.removeItem("adtoken");
        navigate("/login");
      });
  }

  useEffect(() => {
    const token = localStorage.getItem("adtoken");
    fetchT();
    axios({
      url: `https://musafirmahalbackend.vercel.app/searchTrip/${id}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setTrip(response.data);
      })
      .catch((err) => {
        Logout();
        localStorage.removeItem("adtoken");
        navigate("/login");
      });
  }, []);

  function Show(obj) {
    return <Row data={obj} fetchT={fetchT} />;
  }

  const headers = [
    // { label: "First Name", key: "firstname" },
    // { label: "Last Name", key: "lastname" },
    // { label: "Email", key: "email" },
  ];

  return (
    <>
      <div className="bookingPage" style={{ minHeight: "100vh" }}>
        <div className="mtrip">
          <div className="clrbtn">
            <CSVLink
              className="btn btn-primary"
              data={book}
              filename={trip.name + " " + trip.date}
            >
              Export as .csv
            </CSVLink>

            <button
              className="btn btn-success"
              style={{ marginLeft: "5px" }}
              onClick={() => {
                const token = localStorage.getItem("adtoken");
                axios({
                  url: "https://musafirmahalbackend.vercel.app/confirmAll",
                  method: "PUT",
                  data: { id: id },
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                })
                  .then((res) => {
                    fetchT();

                    Swal.fire({
                      position: "top-end",
                      // icon: "success",
                      title: "All bookings are Confirmed",
                      showConfirmButton: false,
                      timer: 700,
                    });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              Confirm All
            </button>
          </div>
          <h1>My Bookings</h1>
          <div className="box">
            <table className="table table-striped table-hover">
              <thead>
                <th>Image</th>
                <th>Trip Name</th>
                {/*  */}
                <th>Customer Name</th>
                <th>CNIC</th>
                <th>Phone Number</th>
                <th>Email</th>
                {/*  */}
                <th>No of Seats</th>
                <th>Total</th>
                <th>Discount</th>
                <th>Grand Total</th>
                <th>Status</th>
                <th>Confirm Action</th>
                <th>Cancel Action</th>
              </thead>

              <tbody>{book.map(Show)}</tbody>
            </table>
          </div>
          {/* <CSVLink data={book}>Download me</CSVLink>; */}
        </div>
      </div>
    </>
  );
};

const Row = (props) => {
  const navigate = useNavigate();
  console.log("props are == ", props);
  const [trip, setTrip] = useState({});
  useEffect(() => {
    const token = localStorage.getItem("adtoken");
    axios({
      url: `https://musafirmahalbackend.vercel.app/searchTrip/${props.data.tripId}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log("-->", response.data);
        setTrip(response.data);
      })
      .catch((err) => {
        Logout();
        localStorage.removeItem("adtoken");
        navigate("/login");
        console.log(err);
      });
  }, []);

  return (
    <>
      <tr className="trows" style={{}}>
        <td>
          <img src={trip.img} alt="loading" />
        </td>
        <td>{trip.name}</td>
        <td>{props.data.name}</td>
        <td>{props.data.cnic}</td>
        <td>{props.data.phone}</td>
        <td>{props.data.email}</td>
        <td>{props.data.no_tickets}</td>
        <td>{props.data.total}</td>
        <td>{props.data.discount}</td>
        <td>{props.data.grandTotal}</td>
        <td>{props.data.status}</td>

        <td>
          <div style={{}}>
            <button
              className="btn btn-success"
              onClick={() => {
                const token = localStorage.getItem("adtoken");
                axios({
                  url: "https://musafirmahalbackend.vercel.app/confirmBooking",
                  method: "PUT",
                  data: { id: props.data._id },
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                })
                  .then((res) => {
                    props.fetchT();
                    Swal.fire({
                      position: "top-end",
                      // icon: "success",
                      title: "Booking Status Confirmed",
                      showConfirmButton: false,
                      timer: 700,
                    });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              Confirm
            </button>
          </div>
        </td>
        <td>
          <div style={{}}>
            <button
              className="btn btn-danger"
              onClick={() => {
                const token = localStorage.getItem("adtoken");
                axios({
                  url: "https://musafirmahalbackend.vercel.app/cancelBooking",
                  method: "PUT",
                  data: { id: props.data._id },
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                })
                  .then((res) => {
                    props.fetchT();
                    Swal.fire({
                      position: "top-end",
                      // icon: "success",
                      title: "Booking Cancelled",
                      showConfirmButton: false,
                      timer: 700,
                    });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              Reject
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default ExportBookings;

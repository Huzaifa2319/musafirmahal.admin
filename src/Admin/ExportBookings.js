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
    return <Row data={obj} fetchT={fetchT} trip={trip} />;
  }

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
          <h1>Booking Detail</h1>
          <div className="box">
            <div class="table-responsive">
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
                  <th>Send Confirmation Email</th>
                  <th>Confirm Action</th>
                  <th>Cancel Action</th>
                </thead>

                <tbody>{book.map(Show)}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Row = (props) => {
  const navigate = useNavigate();
  console.log("props are == ", props);

  return (
    <>
      <tr className="trows" style={{}}>
        <td>
          <img src={props.trip.img} alt="loading" />
        </td>
        <td>{props.trip.name}</td>
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
          <button
            className="btn btn-warning"
            onClick={() => {
              if (props.data.status === "confirmed") {
                axios({
                  url: "https://musafirmahalbackend.vercel.app/sendemail",
                  method: "POST",
                  data: {
                    trip: props.trip,
                    book: props.data,
                  },
                })
                  .then((response) => {
                    console.log(response.data);
                    Swal.fire({
                      icon: "success",
                      title: "Email Sent",
                      text: "Confirmation Email has been sent to the Customer",
                    });
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Please Confirm the  Booking First! to send Confirmation Email",
                });
              }
            }}
          >
            Send Email
          </button>
        </td>
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

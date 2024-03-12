import React, { useState } from "react";
import "../style/Feedback.css";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Logout from "../Logout";
const Feedback = () => {
  const [feed, setFeed] = useState([]);
  const navigate = useNavigate();
  function getTrips() {
    let token = localStorage.getItem("adtoken");
    axios({
      method: "GET",
      url: "https://musafirmahalbackend.vercel.app/viewFeedback",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response.data);
        setFeed(response.data);
      })
      .catch((error) => {
        console.log(error);
        Logout();
        localStorage.removeItem("adtoken");
        navigate("/login");
      });
  }

  useEffect(() => {
    getTrips();
  }, []);

  const clearHandle = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        let token = localStorage.getItem("adtoken");
        axios({
          method: "DELETE",
          url: "https://musafirmahalbackend.vercel.app/clearFeedback",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            console.log(response.data);
            Swal.fire({
              title: "Deleted!",
              text: "All feedbacks have been deleted!",
              icon: "success",
            });
            getTrips();
          })
          .catch((error) => {
            console.log(error);
            Logout();
            localStorage.removeItem("adtoken");
            navigate("/login");
          });

        getTrips();
      }
    });
  };

  return (
    <>
      <div className="clrbtn">
        <button className="btn btn-warning" onClick={clearHandle}>
          Clear all
        </button>
        <button
          className="btn btn-primary"
          style={{ marginLeft: "5px" }}
          onClick={() => {
            getTrips();
            Swal.fire({
              position: "top-end",
              // icon: "success",
              title: "Feedback refreshed",
              showConfirmButton: false,
              timer: 700,
            });
          }}
        >
          Refresh
        </button>
      </div>
      <div>
        <div className="data">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Email</th>
                <th>Title</th>
                <th>Date</th>
                <th>Feedback</th>
              </tr>
            </thead>
            <tbody>
              {feed.map((e) => {
                return (
                  <>
                    <tr>
                      <td>{e.name}</td>

                      <td>{e.title}</td>
                      <td>{e.createdAt.split("T")[0]}</td>
                      <td>{e.feedback}</td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
          {feed.length === 0 && (
            <h3 style={{ color: "red", textAlign: "center" }}>
              No feedback is given yet
            </h3>
          )}
        </div>
      </div>
    </>
  );
};

export default Feedback;

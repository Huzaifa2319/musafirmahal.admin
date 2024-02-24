import React, { useState } from "react";
import "../style/Feedback.css";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
        localStorage.removeItem("adtoken");
        navigate("/login");
      });
  }

  useEffect(() => {
    getTrips();
  }, []);

  const clearHandle = () => {
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
        getTrips();
      })
      .catch((error) => {
        console.log(error);
        localStorage.removeItem("adtoken");
        navigate("/login");
      });

    getTrips();
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
          onClick={getTrips}
        >
          Refresh
        </button>
      </div>
      <div>
        <div className="data">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
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
                      <td>Anonymous</td>

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

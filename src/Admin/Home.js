import React from "react";
import "../style/Style.scss";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <h1 style={{ textAlign: "center", margin: "30px 0 30px 0" }}>
        Welcome to Musafir Mahal Admin Pannel
      </h1>
      <div className="container2">
        <Link className="card1 link-style" to="addTrip">
          <h3>Add Trip</h3>
          <p className="small">
            You can Add new Trips by just filling out the form
          </p>
          <div className="go-corner">
            <div className="go-arrow">→</div>
          </div>
        </Link>

        <Link className="card2 link-style" to="manageTrips">
          <h3>Manage Trip</h3>
          <p className="small">Delete and Edit status of existing trips here</p>

          <div className="go-corner">
            <div className="go-arrow">→</div>
          </div>
        </Link>
        <Link className="card1 link-style" to="viewfeedbacks">
          <h3>Read Feedback</h3>
          <p className="small">Customers feedbacks are shown here</p>
          <div className="go-corner">
            <div className="go-arrow">→</div>
          </div>
        </Link>

        <Link className="card2 link-style" to="bookings">
          <h3>Bookings</h3>
          <p className="small">All the booked trips are shown here</p>

          <div className="go-corner">
            <div className="go-arrow">→</div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Home;

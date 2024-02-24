import React from "react";
import "../style/Footer.css";
import { Link } from "react-router-dom";
const log3 = require("../images/log3.png");
const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer-left col-md-4 col-sm-6">
          <p className="about">
            <span> About the company</span> Embark on a journey with our
            innovative travel app designed to redefine your travel experiences.
            Discover seamless planning, personalized recommendations, and
            effortless booking all within our platform. Our company is committed
            to crafting unforgettable adventures, ensuring convenience and
            satisfaction at every step of your travel exploration.
          </p>
          <div className="icons">
            <a
              href="https://www.facebook.com/profile.php?id=61552243900801&mibextid=ZbWKwL"
              target="blank"
            >
              <i className="fa fa-facebook"></i>
            </a>

            <a
              href="https://instagram.com/musafirmahal?igshid=NjIwNzIyMDk2Mg=="
              target="blank"
            >
              <i className="fa fa-instagram"></i>
            </a>
            <a href="#">
              <i className="fa fa-twitter"></i>
            </a>
          </div>
        </div>
        <div className="footer-center col-md-4 col-sm-6">
          <div>
            <i className="fa fa-map-marker"></i>
            <p>
              <span> LandMark 3 H-13</span> Isalamabad, Pakistan
            </p>
          </div>
          <div>
            <i className="fa fa-phone"></i>
            <p> +923165365272</p>
          </div>
          <div>
            <i className="fa fa-envelope"></i>
            <p>
              <Link to="#"> musafirmahal@gmail.com</Link>
            </p>
          </div>
        </div>
        <div className="footer-right col-md-4 col-sm-6">
          <h2>
            <img src={log3} alt="error 69" className="logo2" />
            {/* Musafir<span> Mahal</span> */}
          </h2>
          <p className="menu">
            <Link to="#"> Home</Link> |<Link to="#"> About</Link> |
            <Link to="#"> Services</Link> |<Link to="#"> Portfolio</Link> |
            <Link to="#"> News</Link> |<Link to="#"> Contact</Link>
          </p>
          <p className="name"> Musafir Mahal &copy; 2024</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;

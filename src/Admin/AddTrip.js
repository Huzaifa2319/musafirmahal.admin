import React from "react";
import { useState } from "react";
import axios from "axios";
import "../style/addTrip.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const AddTrip = () => {
  const [trip, setTrip] = useState({});
  const navigate = useNavigate();
  const handle = (e) => {
    const { name, value } = e.target;
    setTrip({ ...trip, [name]: value });
  };

  const [selectedDate, setSelectedDate] = useState("");

  const [img, setimg] = useState("");

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const [selectedTime, setSelectedTime] = useState("");
  trip.depTime = selectedTime;
  trip.date = selectedDate;
  trip.img = img;
  const SubmitHandler = () => {
    console.log(trip);
    // setTrip({});
    if (
      trip.contact == "" ||
      trip.date == "" ||
      trip.depLocation == "" ||
      trip.depTime == "" ||
      trip.description == "" ||
      trip.discount == "" ||
      trip.duration == "" ||
      trip.estTime == "" ||
      trip.img == "" ||
      trip.minticketsfordiscount == "" ||
      trip.name == "" ||
      trip.price == ""
    ) {
      Swal.fire({
        icon: "warning",
        title: "Oops...(Blank Fields)",
        confirmButtonColor: "#9b958a",
        text: "Please fill all the  fields!",
      });
    } else {
      let token = localStorage.getItem("adtoken");
      const options = {
        url: "https://musafirmahalbackend.vercel.app/addTrip",
        method: "POST",
        data: trip,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      console.log(options);
      axios(options)
        .then((response) => {
          console.log(response.data);
          Swal.fire({
            title: "Trip Added Successfully!",
            text: "You can add More Trips :)",
            icon: "success",
          });

          setTrip({});
          setimg("");
          // alert(`Your Trip has been added successfully`);
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem("adtoken");
          navigate("/login");
        });
    }
  };
  return (
    <>
      <div className="s-box">
        <h2>Add new Trip</h2>
        <div className="sindiv">
          <input
            type="text"
            className="inp"
            value={trip.name || ""}
            placeholder="Enter Trip Title"
            name="name"
            onChange={handle}
          />

          <input
            type="number"
            className="inp"
            value={trip.price || ""}
            name="price"
            placeholder="Enter Price"
            onChange={handle}
          />
          <input
            type="text"
            className="inp"
            value={trip.depLocation || ""}
            placeholder="Enter Departure Location"
            name="depLocation"
            onChange={handle}
          />

          <input
            type="text"
            className="inp"
            value={trip.estTime || ""}
            placeholder="Enter Estimated Time "
            name="estTime"
            onChange={handle}
          />
          <input
            type="number"
            className="inp"
            value={trip.duration || ""}
            placeholder="Enter Duration (days)"
            name="duration"
            onChange={handle}
          />
          <input
            type="text"
            className="inp"
            value={trip.contact || ""}
            placeholder="Enter Contact Number"
            name="contact"
            onChange={handle}
          />
          {/* minticketsfordiscount */}
          <input
            type="number"
            className="inp"
            value={trip.discount || ""}
            name="discount"
            placeholder="Discount Percentage"
            min="0"
            max="100"
            onChange={handle}
          />
          <input
            type="number"
            className="inp"
            value={trip.minticketsfordiscount || ""}
            name="minticketsfordiscount"
            placeholder="Minimum Ticket Quantity for Discount"
            min="0"
            max="100"
            onChange={handle}
          />
          <br />
          <br />
          <label htmlFor="datePicker">Select a Date : </label>
          <input
            style={{ marginLeft: "5px" }}
            type="date"
            id="datePicker"
            value={selectedDate}
            onChange={handleDateChange}
          />
          <label style={{ marginLeft: "5px" }}>Date: {selectedDate}</label>
          <br />
          <br />

          <TimePicker setSelectedTime={setSelectedTime} />
          <p>Selected Time: {selectedTime}</p>
          <ImageUpload setimg={setimg} />
          <br />
          <div style={{ margin: "auto", textAlign: "center" }}>
            <img
              src={img}
              style={{ height: "1in", width: "1in" }}
              alt="img not uploaded yet"
            />
          </div>

          <textarea
            type=""
            placeholder="Description"
            className="desArea"
            value={trip.description || ""}
            name="description"
            onChange={handle}
          />

          <button className="butt" onClick={SubmitHandler}>
            Add Trip
          </button>
        </div>
      </div>
      {/* --------------------------------------------------- */}
    </>
  );
};

const TimePicker = ({ setSelectedTime }) => {
  const [selectedHour, setSelectedHour] = useState("1");
  const [selectedMinute, setSelectedMinute] = useState("00");
  const [selectedPeriod, setSelectedPeriod] = useState("AM");

  const handleHourChange = (event) => {
    setSelectedHour(event.target.value);
  };

  const handleMinuteChange = (event) => {
    setSelectedMinute(event.target.value);
  };

  const handlePeriodChange = (event) => {
    setSelectedPeriod(event.target.value);
  };
  setSelectedTime(`${selectedHour}:${selectedMinute}  ${selectedPeriod}`);

  return (
    <div>
      <label>Hour:</label>
      <select value={selectedHour} onChange={handleHourChange}>
        {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
          <option key={hour} value={hour}>
            {hour}
          </option>
        ))}
      </select>

      <label>Minute:</label>
      <select value={selectedMinute} onChange={handleMinuteChange}>
        {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
          <option key={minute} value={minute < 10 ? `0${minute}` : `${minute}`}>
            {minute < 10 ? `0${minute}` : `${minute}`}
          </option>
        ))}
      </select>

      <label>AM/PM:</label>
      <select value={selectedPeriod} onChange={handlePeriodChange}>
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>
    </div>
  );
};

const ImageUpload = ({ setimg }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    console.log(selectedFile);
    // setimg(selectedFile);
    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);

      try {
        const response = await fetch(
          "https://musafirmahalbackend.vercel.app/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
        console.log("Uploaded Image URL:", data.imageUrl);
        setimg(data.imageUrl);
        // Handle the URL as needed (e.g., display the image)
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button
        className="btn btn-warning"
        // style={{ backgroundColor: "#cbc5b4" }}
        onClick={handleSubmit}
      >
        Upload
      </button>
    </div>
  );
};

export default AddTrip;

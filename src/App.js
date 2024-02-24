import { Routes, Route } from "react-router-dom";
import Header from "./Admin/Header";
import Form from "./Admin/Login";
import AddTrip from "./Admin/AddTrip";
import ManageTrips from "./Admin/ManageTrips";
import Home from "./Admin/Home";
import Feedback from "./Admin/Feedback";
import { useEffect, useState } from "react";
import ProtectedRoute from "./ProtectedRoutes";
import { SignOut } from "./SignOut";
function App() {
  const [login, setLogin] = useState(
    localStorage.getItem("adtoken") ? true : false
  );
  setLogin(localStorage.getItem("adtoken") ? true : false);

  useEffect(() => {
    const token = localStorage.getItem("adtoken");
    if (token) {
      const tokenData = JSON.parse(atob(token.split(".")[1]));
      const expirationTime = tokenData.exp * 1000; // Expiration time in milliseconds
      if (Date.now() > expirationTime) {
        SignOut({ login, setLogin });
      }
    }
    setLogin(localStorage.getItem("adtoken") ? true : false);
    // const timeout = setTimeout(() => {
    //   SignOut({ login, setLogin });
    // }, 2 * 60 * 1000); // 2 minutes
    // return () => clearTimeout(timeout);
    // // console.log("logged in  ", login, localStorage.getItem("adtoken"));
  }, []);

  return (
    <>
      <Header isLogin={login} setLogin={setLogin} />
      <Routes>
        <Route
          path="/login"
          element={<Form isLogin={login} setLogin={setLogin} />}
        />
        {/* <Route path="/" element={<Home />} />
        <Route path="/addTrip" element={<AddTrip />} />
        <Route path="/manageTrips" element={<ManageTrips />} />
        <Route path="/viewfeedbacks" element={<Feedback />} /> */}

        <Route
          path="/"
          element={
            <ProtectedRoute user={login}>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manageTrips"
          element={
            <ProtectedRoute user={login}>
              <ManageTrips />
            </ProtectedRoute>
          }
        />

        <Route
          path="/viewFeedbacks"
          element={
            <ProtectedRoute user={login}>
              <Feedback />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addTrip"
          element={
            <ProtectedRoute user={login}>
              <AddTrip />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;

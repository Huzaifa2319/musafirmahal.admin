import { useNavigate } from "react-router-dom";

export const SignOut = ({ login, setLogin }) => {
  const navigate = useNavigate();
  //   console.log("Signout");
  localStorage.removeItem("adtoken");
  setLogin(false);
  navigate("/login");
};

import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Login from "../pages/Login";

export default function Loggedinuser() {
  const user = useSelector((users) => users.login.loggedIn);
  return user ? <Outlet></Outlet> : <Login></Login>;
}

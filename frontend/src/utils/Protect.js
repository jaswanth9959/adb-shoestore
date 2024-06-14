import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Protect() {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
}

export default Protect;

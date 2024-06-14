import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Admin() {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo.user.role !== "user" ? (
    <Outlet />
  ) : (
    <Navigate to="/staff" replace />
  );
}

export default Admin;

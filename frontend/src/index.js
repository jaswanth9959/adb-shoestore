import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Admin from "./utils/Admin";
import Protect from "./utils/Protect";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import SignUpScreen from "./screens/SignUpScreen";
import ShoeScreen from "./screens/ShoeScreen";
import CartScreen from "./screens/CartScreen";
import DeliveryScreen from "./screens/DeliveryScreen";
import PaymentScreen from "./screens/PaymentScreen";
import ProfileScreen from "./screens/ProfileScreen";
import OrderScreen from "./screens/OrderScreen";
import MyOrdersScreen from "./screens/MyOrdersScreen";
import Dashboard from "./screens/Admin/Dashboard";
import StaffLoginScreen from "./screens/Admin/StaffLoginScreen";
import CustomersScreen from "./screens/Admin/CustomersScreen";
import CategoryScreen from "./screens/Admin/CategoryScreen";
import StaffScreen from "./screens/Admin/StaffScreen";
import OrdersScreen from "./screens/Admin/OrdersScreen";
import ShoesScreen from "./screens/Admin/ShoesScreen";
import UpdateCategoryScreen from "./screens/Admin/UpdateCategoryScreen";
import AddCategoryScreen from "./screens/Admin/AddCategoryScreen";
import AddStaffScreen from "./screens/Admin/AddStaffScree";
import EditStaffScreen from "./screens/Admin/EditStaffScreen";
import AddShoeScreen from "./screens/Admin/AddShoeScreen";
import EditShoeScreen from "./screens/Admin/EditShoeScreen";
import ReadyOrdersScreen from "./screens/Admin/ReadyOrdersScreen";
import DeliveredByMeScreen from "./screens/Admin/DeliveredByMeScreen";
import StaffProfileScreen from "./screens/Admin/StaffProfileScreen";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/signup" element={<SignUpScreen />} />
      <Route path="/staff" element={<StaffLoginScreen />} />
      <Route path="" element={<Protect />}>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/shoe/:id" element={<ShoeScreen />} />
        <Route path="/cart" element={<CartScreen />} />
        <Route path="/delivery" element={<DeliveryScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/order/:id" element={<OrderScreen />} />
        <Route path="/myOrders" element={<MyOrdersScreen />} />
      </Route>
      <Route path="/admin" element={<Admin />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/customers" element={<CustomersScreen />} />
        <Route path="/admin/categories" element={<CategoryScreen />} />
        <Route path="/admin/staff" element={<StaffScreen />} />
        <Route path="/admin/staff/add" element={<AddStaffScreen />} />
        <Route path="/admin/staff/edit/:id" element={<EditStaffScreen />} />
        <Route path="/admin/readyorders" element={<ReadyOrdersScreen />} />
        <Route path="/admin/orders" element={<OrdersScreen />} />
        <Route path="/admin/shoes" element={<ShoesScreen />} />
        <Route path="/admin/shoes/add" element={<AddShoeScreen />} />
        <Route path="/admin/shoe/edit/:id" element={<EditShoeScreen />} />

        <Route
          path="/admin/category/update/:id"
          element={<UpdateCategoryScreen />}
        />
        <Route path="/admin/deliveredbyme" element={<DeliveredByMeScreen />} />
        <Route path="/admin/category/add" element={<AddCategoryScreen />} />
        <Route path="/admin/staffprofile" element={<StaffProfileScreen />} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

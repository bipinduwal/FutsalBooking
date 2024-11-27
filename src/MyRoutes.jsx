import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Booking from "./pages/Booking";
import EmailVerification from "./pages/EmailVerification";
import Logout from "./pages/Logout";
import Profile from "./pages/Profile";
import AdminLayout from "./components/Admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import TodaysBookings from "./pages/admin/TodaysBookings";
import WeekBookings from "./pages/admin/weekbookings";
import HomeTeam from "./pages/admin/HomeTeam";
import ManageUser from "./pages/admin/ManageUser";
import CompletePage from "./pages/CompletePage";
import CheckoutForm from "./pages/CheckoutForm";
import PaymentPage from "./pages/PaymentPage";

function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/bookings" element={<Booking />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/paymentpage" element={<PaymentPage />}></Route>
          <Route path="/completepage" element={<CompletePage />}></Route>
          {/* <Route path="/logout" element={<Logout />}></Route> */}

        </Route>
        <Route path="emailVerification/:token" element={<EmailVerification/>}/>
      {/* </Routes>
      <Routes> */}
        <Route path="/admin" element={<AdminLayout/>}>
        <Route path="/admin/dashboard" element={<Dashboard/>}></Route>
        <Route path="/admin/todaysbooking" element={<TodaysBookings/>}></Route>
        <Route path="/admin/weekbookings" element={<WeekBookings/>}></Route>
        <Route path="/admin/hometeam" element={<HomeTeam/>}></Route>
        <Route path="/admin/getusers" element={<ManageUser/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default MyRoutes;

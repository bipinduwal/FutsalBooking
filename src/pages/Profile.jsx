import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../api_calls/userApi";
import Swal from "sweetalert2";
import { cancelBooking, getUserBookings } from "../api_calls/bookingApi";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = isAuthenticated();
  const [bookings, setBookings] = useState([]);
  const [history, setHistory] = useState([]);
  const [success, setSuccess] = useState(false);
  //   const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '' });

  const navigate = useNavigate();

  useEffect(() => {
    // Directly access localStorage in useEffect
    const data = JSON.parse(localStorage.getItem("jwt"));
    const token = data ? (data.user.role == 0 ? data.token : null) : null;

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    fetchBookings();
    setSuccess(false);
  }, [success]);

  function convertTime(time) {
    const [timeString, modifier] = time.split(" ");
    let [hours, minutes] = timeString.split(":").map(Number);

    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}`;
  }

  const fetchBookings = async () => {
    try {
      if (!user?.id) {
        console.error("User ID not found.");
        return;
      }
      const data = await getUserBookings(user.id);

      if (data && Array.isArray(data)) {
        const currentTime = new Date();
        const today = new Date(currentTime.toDateString()); // Today's date at midnight for date-only comparison

        const upcoming = [];
        const past = [];

        data.forEach((booking) => {
          const bookingDate = new Date(booking.date); // Convert "mm/dd/yyyy" to Date object

          if (bookingDate < today) {
            // Booking date is in the past
            past.push(booking);
          } else if (bookingDate > today) {
            // Booking date is in the future
            upcoming.push(booking);
          } else {
            // Booking date is today, compare the timeSlot
            const bookingTime = new Date(
              `${booking.date} ${convertTime(booking.timeSlot)}`
            );

            if (bookingTime > currentTime) {
              upcoming.push(booking); // Upcoming time today
            } else {
              past.push(booking); // Past time today
            }
          }
        });

        setBookings(upcoming);
        setHistory(past);
      } else {
        console.warn("No bookings found.");
        setBookings([]); // Clear bookings if none found
        setHistory([]); // Clear history if none found
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setBookings([]);
      setHistory([]);
    }
  };

  const handleCancel = (bookingid) => {
    Swal.fire({
      title: "Are you sure you want to cancel your booking?",
      text: "You will not be able to recover your booking.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(250, 204, 21)",

    }).then((result) => {
      if (result.isConfirmed) {
        // Call API to cancel booking
        cancelBooking(bookingid).then((response) => {
          if (response.error) {
            Swal.fire({
              title: "Error",
              text: response.error,
              icon: "error",
            });
          } else {
            // Update state to reflect cancelled booking
            setSuccess(true);
            Swal.fire({
              title: "Booking cancelled successfully.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  //   const handlePasswordChange = async (e) => {
  //     e.preventDefault();
  //     const result = await changeUserPassword(passwordData);
  //     if (result.success) {
  //       Swal.fire("Success", "Password updated successfully", "success");
  //     } else {
  //       Swal.fire("Error", result.error, "error");
  //     }
  //   };

  return (
    <div className="max-w-[70%] mx-auto mt-1 p-6 bg-white rounded-lg shadow-lg relative">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-700">
        My Bookings
      </h2>
      <div className="absolute top-6 right-20 cursor-pointer flex flex-col items-center hover:text-slate-400">
        <i className="bi bi-person-circle text-3xl "></i>
        <strong>{user? user.username : null}</strong>
      </div>

      <section className="mb-8">
        <h3 className="text-2xl font-semibold text-gray-600 mb-4">
          Upcoming Bookings
        </h3>
        <table className="w-full table-auto text-center border-collapse">
          <thead>
            <tr className="bg-slate-400 text-gray-600 text-sm uppercase">
              <th className="py-3 px-4 border-b">S.No</th>
              <th className="py-3 px-4 border-b">Date</th>
              <th className="py-3 px-4 border-b">Time Slot</th>
              <th className="py-3 px-4 border-b">Payment</th>
              <th className="py-3 px-4 border-b">Amount</th>
              <th className="py-3 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length ? (
              bookings.map((booking, index) => (
                <tr key={index} className="border-b ">
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{booking.date}</td>
                  <td className="py-3 px-4">{booking.timeSlot}</td>
                  <td className="py-3 px-4">{booking.paymentStatus}</td>
                  <td className="py-3 px-4">{booking.amount}</td>
                  <td className="py-3 px-4">
                    <button
                      className="text-white bg-red-500 px-3 py-1 rounded-lg hover:bg-red-600 transition duration-200"
                      onClick={() => handleCancel(booking._id)}
                    >
                      Cancel <i className="fas fa-trash ml-2"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No upcoming bookings.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      <section className="mb-8">
        <h3 className="text-2xl font-semibold text-gray-600 mb-4">
          Booking History
        </h3>
        <table className="w-full table-auto text-center border-collapse">
          <thead>
            <tr className="bg-slate-400 text-gray-600 text-sm uppercase">
              <th className="py-3 px-4 border-b">S.No</th>
              <th className="py-3 px-4 border-b">Date</th>
              <th className="py-3 px-4 border-b">Time Slot</th>
              <th className="py-3 px-4 border-b">Payment</th>
              <th className="py-3 px-4 border-b">Amount</th>
            </tr>
          </thead>
          <tbody>
            {history.length ? (
              history.map((history, index) => (
                <tr key={index} className="border-b">
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{history.date}</td>
                  <td className="py-3 px-4">{history.timeSlot}</td>
                  <td className="py-3 px-4">{history.paymentStatus}</td>
                  <td className="py-3 px-4">{history.amount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-500">
                  No booking history.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Profile;

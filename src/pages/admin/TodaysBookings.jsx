import React, { useState, useEffect } from "react";
import { bookingdate, cancelBooking, updateConfirm } from "../../api_calls/bookingApi";
import Swal from "sweetalert2";

const TodaysBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const today = new Date().toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        });

        console.log(today); // Outputs something like "10/31/2024"
        const data = await bookingdate(today);
        setBookings(data);
      } catch (error) {
        console.error("Failed to fetch today's bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleConfirm = (bookingId) => {
    updateConfirm(bookingId).then((data) => {
      if (data.error) {
        Swal.fire("Error", data.error, "warning");
      } else {
        Swal.fire("Booking confirmed", data.message, "success");
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking._id === bookingId
              ? { ...booking, status: "confirmed", paymentStatus: "completed" }
              : booking
          )
        );
      }
    });
  };
  const handleCancel = (bookingid) => {
    Swal.fire({
      title: "Are you sure you want to cancel your booking?",
      text: "You will not be able to recover your booking.",
      icon: "warning",
      showCancelButton: true,
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
            setSuccess(true)
            Swal.fire({
              title: "Booking cancelled successfully.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="flex flex-col w-full  bg-gray-100">
      <h2 className="text-2xl font-semibold mb-4 pt-2">Today's Bookings</h2>
    <div className="p-4 grid md:grid-cols-2 grid-cols-1  w-full gap-3">
      {loading ? (
        <p>Loading bookings...</p>
      ) : bookings.length ? (
        bookings.map((booking) => (
          <div
            key={booking._id}
            className="p-4 mb-4 bg-white shadow-md rounded-md"
          >
            <p><strong>Booking ID:</strong> {booking._id}</p>
            <p><strong>User:</strong> {booking.user.username}</p>
            <p><strong>Time Slot:</strong> {booking.timeSlot}</p>
            <p><strong>Amount:</strong> {booking.amount}</p>
            <p><strong>Payment:</strong> {
            booking.paymentStatus == 'completed' ? 
            <span className="text-green-500">{booking.paymentStatus}</span>
            :
            <span className="text-orange-500"> {booking.paymentStatus}</span>

            
            }</p>
            {booking.status == "confirmed" ? (
              <p>
                <strong>Status:</strong>
                <span className="text-green-500">{booking.status}</span>
              </p>
            ) : booking.status == "cancelled" ? (
              <p>
                <strong>Status:</strong>{" "}
                <span className="text-orange-500">{booking.status}</span>
              </p>
            ) : (
              <p>
                <strong>Status:</strong>{" "}
                <span className="text-yellow-300">{booking.status}</span>
              </p>
            )}

            {booking.status == "pending" && (
              <>
                <button className="btn-cancel"  onClick={() => handleCancel(booking._id)}>Cancel Booking</button>
                <button
                  className="btn-confirm ml-2"
                  onClick={() => handleConfirm(booking._id)}
                >
                  Confirm
                </button>
              </>
            )}
          </div>
        ))
      ) : (
        <p>No bookings for today.</p>
      )}
    </div>
    </div>
  );
};

export default TodaysBookings;

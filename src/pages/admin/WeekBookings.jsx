import React, { useState, useEffect } from "react";
import { bookingdate } from "../../api_calls/bookingApi"; // Import your API call for fetching bookings

const WeekBookings = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [bookings, setBookings] = useState([]);
  const [dates, setDates] = useState([]);
  const [countbooking, setcountbooking] = useState();



  useEffect(() => {

    // Generate next 7 days from today
    const today = new Date();
    const days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      return date;
    });
    setDates(days);


    // Fetch bookings for the selected date
    const fetchBookings = async () => {
      const dateString = selectedDate.toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      });

      try {
        const data = await bookingdate(dateString);
        setBookings(data);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      }
    };

    fetchBookings();
  }, [selectedDate]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Admin - 7 Days Bookings</h1>

      <div className="flex mb-4 space-x-2">
        {dates.map((date, index) => (
          <button
            key={index}
            onClick={() => setSelectedDate(date)}
            className={`px-4 py-2 rounded-md ${
              selectedDate.toDateString() === date.toDateString()
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {date.toLocaleDateString("en-US", {
              weekday: "short",
              month: "2-digit",
              day: "2-digit",
            })}
          </button>
        ))}
      </div>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Booking Date</th>
            <th className="py-2 px-4 border-b">Time Slot</th>
            <th className="py-2 px-4 border-b">User</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Amount</th>
          </tr>
        </thead>
        <tbody>
  {bookings.length > 0 ? (
    bookings.map((booking) => (
      <tr key={booking._id} className="hover:bg-gray-100">
        <td className="py-2 px-4 border-b">{booking.date}</td><td className="py-2 px-4 border-b">{booking.timeSlot}</td>
        <td className="py-2 px-4 border-b">{booking.user?.username || "Unknown User"}</td>
        <td className="py-2 px-4 border-b">{booking.status}</td>
        <td className="py-2 px-4 border-b">{booking.amount}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="5" className="text-center py-4">No bookings for this date.</td>
    </tr>
  )}
</tbody>

      </table>
    </div>
  );
};

export default WeekBookings;

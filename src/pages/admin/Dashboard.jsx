import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { bookingdate } from "../../api_calls/bookingApi";

const Dashboard = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [bookingCount, setBookingCount] = useState(0);

  useEffect(() => {
    // Directly access localStorage in useEffect
    const data = JSON.parse(localStorage.getItem("jwt"));
    const token = data ? (data.user.role == 1 ? data.token : null) : null;

    if (!token) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const bookings = async () => {
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
      }
    };
    bookings();
  }, []);

  useEffect(() => {
    const countBookingsForNextSevenDays = async () => {
      try {
        const today = new Date();
        let totalBookings = 0;

        // Loop through the next 7 days
        for (let i = 0; i < 7; i++) {
          const date = new Date(today);
          date.setDate(today.getDate() + i);

          const formattedDate = date.toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
          });

          // Fetch bookings for each day and count them
          const data = await bookingdate(formattedDate);
          totalBookings += data.length;
        }

        setBookingCount(totalBookings);
      } catch (error) {
        console.error("Failed to fetch bookings for the next 7 days:", error);
      }
    };

    countBookingsForNextSevenDays();
  }, []);

  return (
    <>
      <div className="flex-1 w-full p-6 bg-[url('/futsalbg.webp')] bg-cover bg-no-repeat opacity-70">
        <header className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <i className="fas fa-bars fa-2x pr-5 text-white" id="menu"></i>
            <h2 className="text-3xl font-semibold text-white">Dashboard</h2>
          </div>
          <div>
            <h3
              className="text-3xl font-semibold text-lime-950-900"
              id="day"
            ></h3>
            <h3
              className="text-3xl font-semibold text-orange-100"
              id="timer"
            ></h3>
          </div>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* <!-- Today's Bookings Card --> */}
          <Link to="/admin/todaysbooking">
            <div className="bg-[rgba(255,255,255,0.68)] p-4 shadow rounded-lg text-center">
              <i className="fas fa-calendar-day fa-3x text-blue-700 mb-9"></i>
              <h3 className="text-xl font-bold mb-2">Today's Bookings</h3>
              <p
                className="text-2xl font-semibold text-blue-600"
                id="total_booking"
              >
                {bookings.length}
              </p>
            </div>
          </Link>

          {/* <!-- Upcoming 7 Days Bookings Card --> */}
          <Link to="/admin/weekbookings">
            <div className="bg-[rgba(255,255,255,0.68)] p-4 shadow rounded-lg text-center">
              <i className="fas fa-calendar-week fa-3x text-blue-700 mb-9"></i>
              <h3 className="text-xl font-bold mb-2">Next 7 Days</h3>
              <p className="text-2xl font-semibold text-blue-600">
                {bookingCount}
              </p>
            </div>
          </Link>
          {/* <!-- Total Futsals Card --> */}
          <Link to="/admin/hometeam">
            <div
              className="bg-[rgba(255,255,255,0.68)] p-4 shadow rounded-lg text-center"
              id="home_team"
            >
              <i className="fas fa-users fa-3x text-blue-700 mb-9"></i>
              <h3 className="text-xl font-bold mb-2">Home Team</h3>
              <p
                className="text-2xl font-semibold text-blue-600"
                id="total_home_team"
              >
                6
              </p>
            </div>
          </Link>
          {/* <!-- Revenue Card -->   */}
          <div className="bg-[rgba(255,255,255,0.68)] p-4 shadow rounded-lg text-center">
            <i className="fas fa-cogs fa-3x text-blue-700 mb-9"></i>
            <h3 className="text-xl font-bold mb-2">Total Revenue</h3>
            <p className="text-2xl font-semibold text-green-600">$4,200</p>
          </div>
        </section>

        {/* <!-- Booking Table --> */}
        <section className="bg-[rgba(255,255,255,0.68)] p-6 shadow rounded-lg max-h-13">
          <h3 className="text-xl font-semibold mb-4">Recent Bookings</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead>
                <tr>
                  <th className="py-2 px-4 bg-gray-200 font-semibold">
                    Booking ID
                  </th>
                  <th className="py-2 px-4 bg-gray-200 font-semibold">
                    Customer
                  </th>
                  <th className="py-2 px-4 bg-gray-200 font-semibold">
                    DateTime
                  </th>
                  <th className="py-2 px-4 bg-gray-200 font-semibold">
                    PlayDate
                  </th>
                  <th className="py-2 px-4 bg-gray-200 font-semibold">
                    PlayTime
                  </th>
                  <th className="py-2 px-4 bg-gray-200 font-semibold">
                    Payment
                  </th>
                  <th className="py-2 px-4 bg-gray-200 font-semibold">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="recent_tbody">
                {/* <!-- <tr className="hover:bg-gray-100">
                                <td className="py-2 px-4">#1234</td>
                                <td className="py-2 px-4">John Doe</td>
                                <td className="py-2 px-4">time date</td>
                                <td className="py-2 px-4">08/09/2024</td>
                                <td className="py-2 px-4">3:00 PM</td>
                                <td className="py-2 px-4 text-green-600">Done</td>
                                <td className="py-2 px-4 text-green-600">Confirmed</td>
                            </tr> --> */}

                {/* <!-- More rows can be added here --> */}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
};

export default Dashboard;

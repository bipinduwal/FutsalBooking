import React, { useState, useEffect } from "react";
import { format, addDays } from "date-fns";
import { booking, bookingdate } from "../api_calls/bookingApi";
import Swal from "sweetalert2";
import { isAuthenticated } from "../api_calls/userApi";
import { useNavigate } from "react-router-dom";
import PaymentPage from "./PaymentPage";

const generateWeek = () => {
  const today = new Date();
  let days = [];
  for (let i = 0; i < 7; i++) {
    const futureDate = addDays(today, i);
    days.push({
      day: format(futureDate, "EEEE"),
      date: format(futureDate, "MM/dd/yyyy"),
    });
  }
  return days;
};

const generateTimeSlots = () => {
  const times = [];
  for (let i = 6; i <= 22; i++) {
    let hour = i % 12 || 12;
    let ampm = i < 12 || i === 24 ? "AM" : "PM";
    times.push({ time: `${hour}:00 ${ampm}`, hour: i });
  }
  return times;
};

function Booking() {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [reservedTime, setReservedTime] = useState([]);

  const [formData, setFormData] = useState({
    userId: "",
    date: "",
    timeSlot: "",
    amount: "",
    paymentMethod: "",
    paymentStatus: "",
  });
  const [isFullPayment, setIsFullPayment] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showPaymentPage, setShowPaymentPage] = useState(false);

  const handleTogglePaymentType = (type) => {
    if (type === "full") {
      setIsFullPayment(true);
      setFormData((prevData) => ({
        ...prevData,
        amount: 1000,
        paymentStatus: "completed",
      }));
    } else {
      setIsFullPayment(false);
      setFormData((prevData) => ({
        ...prevData,
        paymentStatus: "pending",
      }));
    }
  };

  useEffect(() => {
    const storedJwt = JSON.parse(localStorage.getItem("jwt"));
    const userId = storedJwt ? storedJwt.user.id : null;
    if (userId) {
      setFormData((prevData) => ({
        ...prevData,
        userId: userId,
      }));
    }
  }, [formData.date]);

  const weekDays = generateWeek();
  const timeSlots = generateTimeSlots();

  const handleDaySelect = (day, date) => {
    setSelectedDay(day);
    setFormData((prevData) => ({ ...prevData, date }));
    setSelectedTime(null);
    setFormData((prevData) => ({ ...prevData, timeSlot: null }));
  };

  useEffect(() => {
    if (formData.date) {
      bookingdate(formData.date).then((res) => {
        if (res.error) {
          Swal.fire("Error", res.error, "error");
        } else {
          const pendingReservations = res.filter(
            (booking) => booking.status !== "cancelled"
          );
          setReservedTime(pendingReservations);
          setSuccess(false);
        }
      });
    }
  }, [formData.date, success]);

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setFormData((prevData) => ({ ...prevData, timeSlot: time }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!formData.date || !formData.timeSlot) {
      Swal.fire("Error", "Please select both a date and time!", "error");
      return;
    }
    let { user } = isAuthenticated();
    if (user) {
      setShowPaymentModal(true);
    } else {
      Swal.fire("Error", "You must be logged in to book a slot.", "error").then(
        () => {
          navigate("/login");
        }
      );
    }
  };

  const handlePaymentProcess = (e) => {
    e.preventDefault();
    setShowPaymentPage(true);
  };

  const handleClosePaymentModal = () => {
    setShowPaymentModal(false);
    setFormData((prevData) => ({
      ...prevData,
      amount: "",
      paymentMethod: "",
      paymentStatus: "",
    }));
  };

  const handleSubmitPayment = (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.paymentMethod) {
      Swal.fire("Error", "Please complete the payment details!", "error");
      return;
    }
    booking(formData).then((resdata) => {
      if (resdata.error) {
        Swal.fire("Error", resdata.error, "error");
      } else {
        setSuccess(true);
        setSelectedTime("");
        setSelectedDay(null);
        Swal.fire({
          title: "Booking Success",
          text: `Your booking has been successfully completed${resdata.message}.${formData.date}`,
          icon: "success",
          timer: 5000,
        });
        setShowPaymentModal(false);
      }
    });
  };

  const todayDate = format(new Date(), "MM/dd/yyyy");

  useEffect(() => {
    // if (!formData.amount || !formData.paymentMethod) {
    //   Swal.fire("Error", "Please complete the payment details!", "error");
    //   return;
    // }
    if (showPaymentPage) {
      console.log(formData.amount);
      navigate("/paymentpage", { state: { amount: formData.amount, formData: formData } });
    }
  }, [showPaymentPage, navigate, formData.amount]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
          Book a Futsal Slot
        </h2>

        <form onSubmit={handleNext}>
          <div className="grid grid-cols-2 gap-8">
            {/* Days Selection */}
            <div>
              <h3 className="text-lg font-bold text-gray-700 mb-4">
                Select a Day
              </h3>
              <ul className="space-y-4">
                {weekDays.map(({ day, date }, idx) => (
                  <li
                    key={idx}
                    className={`cursor-pointer p-4 rounded-lg border ${
                      selectedDay === day
                        ? "bg-yellow-500 text-white"
                        : "bg-gray-100 text-gray-700"
                    } hover:bg-yellow-400 transition duration-300`}
                    onClick={() => handleDaySelect(day, date)}
                  >
                    <div className="text-lg font-semibold">{day}</div>
                    <div className="text-sm">{date}</div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Time Slot Selection */}
            <div>
              <h3 className="text-lg font-bold text-gray-700 mb-4">
                Select a Time
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {timeSlots.map(({ time, hour }, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`p-4 rounded-lg border ${
                      reservedTime.some((slot) => slot.timeSlot === time)
                        ? "bg-red-500 text-white cursor-not-allowed"
                        : selectedTime === time
                        ? "bg-yellow-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-yellow-400 transition duration-300"
                    }`}
                    onClick={() => handleTimeSelect(time)}
                    disabled={
                      reservedTime.some((slot) => slot.timeSlot === time) ||
                      (formData.date === todayDate &&
                        hour <= new Date().getHours())
                    }
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg shadow hover:bg-yellow-600 transition duration-300"
          >
            Confirm Booking
          </button>
        </form>

        {/* Payment Modal */}
        {showPaymentModal && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
              <h3 className="text-2xl font-bold mb-4">Payment Required</h3>
              <p className="mb-4">
                Complete your payment to confirm the booking.
              </p>

              {/* Payment Toggle */}
              <div className="flex mb-4">
                <button
                  type="button"
                  onClick={() => handleTogglePaymentType("full")}
                  className={`w-1/2 px-3 py-2 text-center font-bold rounded-l-lg ${
                    isFullPayment
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  Full Payment
                </button>
                <button
                  type="button"
                  onClick={() => handleTogglePaymentType("partial")}
                  className={`w-1/2 px-3 py-2 text-center font-bold rounded-r-lg ${
                    !isFullPayment
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  Partial Payment
                </button>
              </div>

              {isFullPayment && (
                <div className="text-center">
                  <p className="mb-4">Amount to Pay: 1000</p>
                </div>
              )}

              {!isFullPayment && (
                <div className="text-center">
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="Enter Amount"
                    className="border p-2 rounded-lg w-full mb-4"
                  />
                </div>
              )}

              <select name="paymentMethod" id="" className="border p-2 rounded-lg w-full mb-4" onChange={handleChange}>
                <option value="" disabled='true' selected>-- Choose payment Method --</option>
                <option value="credit_card">CreditCard</option>
                <option value="paypal">Paypal</option>
                <option value="bank_transfer">Bank</option>
                <option value="cash" disabled='true'>Cash</option>
              </select>
              {/* <button onClick={() => setShowPaymentPage(true)} */}
              <button
                onClick={handlePaymentProcess}
                className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition duration-300"
              >
                Go to Payment
              </button>
              <button
                type="button"
                onClick={handleClosePaymentModal}
                className="w-full bg-red-500 text-white font-bold py-2 px-4 rounded-lg shadow mt-4 hover:bg-red-600 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Booking;

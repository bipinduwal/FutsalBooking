import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { useState, useEffect } from "react";
import { API } from "../config";
import { useLocation } from "react-router-dom";
import { booking } from "../api_calls/bookingApi";
// import '../strive.css';

const stripePromise = loadStripe(
  "pk_test_51QKiQDFY3zGSsK6b9JYfTjRHxl689cIBZfwgnWp6a6Id9JsdbgLGM3UHDf9aRieUFQspUt4f7ZpYMfMXdf3HWzgx00IrZhz6xs"
);

const PaymentPage = () => {
  const location = useLocation();
  const { amount, formData } = location.state || {};
  const [clientSecret, setClientSecret] = useState(null);
  const [dpmCheckerLink, setDpmCheckerLink] = useState("");

  useEffect(() => {
    console.log(amount);
    // Fetch the clientSecret from the backend
    fetch(`${API}/api/confirmpayment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: amount }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
        // [DEV] For demo purposes only
        setDpmCheckerLink(data.dpmCheckerLink);
      })
      .then(() => {
        handleSubmitPayment;
      });
  }, []);
  const appearance = {
    theme: "stripe",
  };
  // Enable the skeleton loader UI for optimal loading.
  const loader = "auto";
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
  const handleDatabaseUpdate = () => {
    booking(formData)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          Swal.fire("Success", "Payment completed and booking updated!", "success");
        } else {
          Swal.fire("Error", "Payment was successful, but updating the booking failed!", "error");
        }
      })
      .catch((err) => Swal.fire("Error", "An unexpected error occurred!", "error"));
  };
  
  return (
    <>
      {clientSecret && (
        <Elements
          options={{ clientSecret, appearance, loader }}
          stripe={stripePromise}
        >
          <CheckoutForm
            dpmCheckerLink={dpmCheckerLink}
            onPaymentSuccess={handleDatabaseUpdate}
          />
        </Elements>
      )}
    </>
  );
};

export default PaymentPage;

import React, { useState } from "react";
import { authenticat, login } from "../api_calls/userApi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form validation and submission logic
    login(formData).then((resdata) => {
      if (resdata.error) {
        Swal.fire({
          title: "Error Credentials",
          icon: "error",
          text: resdata.error,
        });
      } else {
        // localStorage.setItem('jwt', JSON.stringify(resdata));  Saving the token as a string
        authenticat(resdata);

        Swal.fire({
          title: "Login Successful",
          icon: "success",
          text:
            resdata.user.role == 0
              ? "Make sure to book your game"
              : "Better days are comming.",
          timerProgressBar: true,
          timer: 2000,
        }).then(() => {
          // Reset form data after successful login
          setFormData({
            email: "",
            password: "",
          });

          // Navigate to the bookings page
          if (resdata.user.role == 0) {
            navigate("/bookings");
          } else if (resdata.user.role == 1) {
            navigate("/admin/dashboard");
          }
        });
      }
    });
  };

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-center lg:ps-32 h-[90vh] bg-gray-100">
        {/* Form Section */}
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full md:w-1/2">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
            Login to Your Account
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500"
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg shadow hover:bg-yellow-600 transition duration-300"
            >
              Login
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a
                href="/register"
                className="text-yellow-500 hover:text-yellow-600"
              >
                Register here
              </a>
              .
            </p>
          </div>
        </div>

        {/* Image Section */}
        <div className="hidden md:block w-full md:w-1/2 h-full">
          <img
            src="messi.png"
            alt="Login illustration"
            className="w-full h-full object-contain rounded-lg"
          />
        </div>
      </div>
    </>
  );
}

export default Login;

import React from "react";
import Header from "../components/Header";
import { useState } from "react";

function Home() {
  // const [showAllImages, setShowAllImages] = useState(false);
  const [showImages, setShowImages] = useState(3);

  const images = [
    "/gallery10.jpg",
    "/gallery2.jpg",
    "/gallery3.jpg",
    "/gallery7.jpg",
    "/gallery5.jpeg",
    "/gallery8.jpg",
    "/gallrey9.jpg",
    "/gallrey6.jpg",
    "/gallery1.jpg",
  ];

  const visibleImages = images.slice(0, showImages);
  const handleShowMore = () => {
    setShowImages(showImages + 3);
  };
  const handleShowLess = () => {
    setShowImages(showImages - 3);
  };
  return (
    <div className="bg-gray-100 z-10" id="head">
      {/* Navbar */}

      {/* Hero Section */}
      <section
        className="relative bg-contain bg-no-repeat bg-center h-screen z-20"
        style={{ backgroundImage: "url(/pngegg1.png)" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-white text-5xl font-bold leading-tight">
            Book Your Futsal Slot Easily
          </h1>
          <p className="text-white text-xl mt-4">
            Manage your bookings with ease and get ready to play!
          </p>
          <a
            href="/bookings"
            className="mt-8 inline-block bg-yellow-500 text-white text-lg px-6 py-3 rounded-full shadow-lg hover:bg-yellow-600 transition duration-300 cursor-pointer"
          >
            Book a Slot Now
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Why Choose Us?
          </h2>
          <div className="flex flex-wrap justify-center space-y-6 lg:space-y-0 lg:space-x-6">
            <div className="w-full lg:w-[30%] bg-white shadow-lg p-6 rounded-lg hover:shadow-xl hover:scale-105 transition duration-300 cursor-pointer">
              <h3 className="text-xl font-semibold text-gray-700">
                Easy Booking
              </h3>
              <p className="text-gray-600 mt-4">
                Quick and easy booking process with a user-friendly interface.
              </p>
            </div>
            <div className="w-full lg:w-[30%] bg-white shadow-lg p-6 rounded-lg hover:shadow-xl hover:scale-105 transition duration-300 cursor-pointer">
              <h3 className="text-xl font-semibold text-gray-700">
                Flexible Slots
              </h3>
              <p className="text-gray-600 mt-4">
                Book slots at your convenience with real-time availability
                updates.
              </p>
            </div>
            <div className="w-full lg:w-[30%] bg-white shadow-lg p-6 rounded-lg hover:shadow-xl hover:scale-105 transition duration-300 cursor-pointer">
              <h3 className="text-xl font-semibold text-gray-700">
                Secure Payments
              </h3>
              <p className="text-gray-600 mt-4">
                Make secure payments with our trusted payment gateways.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Futsal Moments
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {visibleImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Futsal ${index + 1}`}
                className="w-full h-64 object-cover rounded-lg hover:scale-105 transition transform duration-300 cursor-pointer cursor-pointer"
              />
            ))}
          </div>
          <div className="text-center mt-6">
            {showImages < 9 && (
              <button
                onClick={handleShowMore}
                className="px-6 py-3 me-2 text-lg font-medium text-white bg-yellow-500 rounded-full shadow-lg hover:bg-yellow-600 transition duration-300 cursor-pointer"
              >
                {"Show More"} <i className="bi bi-arrow-down"></i>
              </button>
            )}
            {showImages > 4 && (
              <button
                onClick={handleShowLess}
                className="px-6 py-3 text-lg font-medium text-white bg-yellow-500 rounded-full shadow-lg hover:bg-yellow-600 transition duration-300 cursor-pointer"
              >
                Show Less <i className="bi bi-arrow-up"></i>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            What Our Players Say
          </h2>
          <div className="flex flex-wrap justify-center space-y-6 lg:space-y-0 lg:space-x-6">
            <div className="w-full lg:w-1/3 bg-white shadow-lg p-6 rounded-lg hover:shadow-xl transition duration-300 cursor-pointer">
              <p className="text-gray-600 italic">
                "This platform made it so easy to book a futsal slot for my
                team. Highly recommended!"
              </p>
              <h4 className="mt-4 font-semibold text-gray-700">
                - Alex Johnson
              </h4>
            </div>
            <div className="w-full lg:w-1/3 bg-white shadow-lg p-6 rounded-lg hover:shadow-xl transition duration-300 cursor-pointer">
              <p className="text-gray-600 italic">
                "The real-time updates are a lifesaver. We always know when the
                slots are free."
              </p>
              <h4 className="mt-4 font-semibold text-gray-700">
                - Priya Sharma
              </h4>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-yellow-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-white text-4xl font-bold mb-6">Ready to Play?</h2>
          <p className="text-white text-lg mb-6">
            Book your futsal slot now and enjoy a game with your friends!
          </p>
          <a
            href="/bookings"
            className="bg-white text-yellow-500 text-lg px-6 py-3 rounded-full shadow-lg hover:bg-gray-100 transition duration-300 cursor-pointer"
          >
            Book Now
          </a>
        </div>
      </section>
      {/* contact */}
      <section
        className="flex flex-col items-center py-16 bg-gray-50"
        id="contact">
        <div className="py-4 text-center">
          <h3 className="text-3xl font-bold">Contact</h3>
          <p className="text-gray-600 mt-2">Feel Free To Contact Us.</p>
        </div>
        <div className="flex flex-wrap justify-between w-11/12 mt-8 px-4 lg:px-0">
          {/* Contact Info */}
          <div className="flex flex-col px-2 mx-auto space-y-6 w-full md:w-2/3 lg:w-[35%] border border-t-4 border-b-4 border-l-0 border-r-0 py-6 rounded-md border-blue-500 shadow-lg">
            {/* Address */}
            <div className="flex space-x-4 items-center">
              <i className="bi bi-geo-alt-fill text-2xl object-contain text-blue-400 bg-gray-300 h-10 w-10 p-2 rounded-full"></i>
              <div>
                <h3 className="font-semibold text-blue-800">Address</h3>
                <p className="text-gray-600">Bhaktapur, Nepal</p>
              </div>
            </div>
            {/* Call Us */}
            <div className="flex space-x-4 items-center">
              <i className="bi bi-telephone-fill text-2xl object-contain text-blue-400 bg-gray-300 h-10 w-10 p-2 rounded-full"></i>
              <div>
                <h3 className="font-semibold text-blue-800">Call Us</h3>
                <p className="text-gray-600">+977 9808122345</p>
              </div>
            </div>
            {/* Email Us */}
            <div className="flex space-x-4 items-center">
              <i className="bi bi-envelope-fill text-2xl object-contain text-blue-400 bg-gray-300 h-10 w-10 p-2 rounded-full"></i>
              <div>
                <h3 className="font-semibold text-blue-800">Email Us</h3>
                <p className="text-gray-600">bipinmathyaduwal@gmail.com</p>
              </div>
            </div>
            {/* Map */}
            <div className="mt-6">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2817.44327561613!2d85.427532426009!3d27.670423969542632!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1aafaf52a8d9%3A0x8552bfb072200f12!2sNyatapola%20Temple!5e0!3m2!1sen!2snp!4v1722082912383!5m2!1sen!2snp"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="w-full mx-auto md:w-2/3 lg:w-[60%] mt-8 lg:mt-0 border border-t-4 border-b-4 border-l-0 border-r-0 rounded-md border-blue-500 shadow-lg">
            <form className="flex flex-col space-y-6 bg-white shadow-lg p-6 h-full rounded-lg">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-gray-700 font-medium"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-medium"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  className="w-full h-28 border border-gray-300 rounded-lg px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                ></textarea>
              </div>
              {/* Error Message */}
              <div className="text-red-500 text-sm hidden" id="errorMessage">
                Error!!
              </div>
              {/* Submit Button */}
              <input
                type="submit"
                value="Send Message"
                className="bg-yellow-500 w-1/4 mx-auto text-white font-medium px-4 py-2 rounded-full hover:bg-yellow-600 transition duration-300 cursor-pointer"
              />
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
    </div>
  );
}

export default Home;

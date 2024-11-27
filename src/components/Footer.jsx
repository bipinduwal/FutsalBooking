import React from "react";

function Footer() {
  return (
    <>
     <footer className="bg-gray-500 text-white w-full px-20 py-8">
        <div className="flex space-y-6 flex-wrap lg:space-y-0 lg:flex-row justify-between py-4">
          <div className="flex w-full md:w-1/2 lg:w-1/4 flex-col space-y-2">
            <h3 className="text-2xl font-bold">
              <a href="#head" target="_self">Toppers Futsal</a>
            </h3>
            <p>Lakolachhen</p>
            <p>Bhaktapur, Nepal</p>
            <p><span className="font-bold">Phone:</span> +977 9869131867</p>
            <p><span className="font-bold">Email:</span> bipinmathyaduwal@gmail.com</p>
          </div>
          <div className="flex w-full md:w-1/2 lg:w-1/4 flex-col space-y-2">
            <h4 className="text-2xl font-bold">Useful Links</h4>
            <ul className="flex flex-col space-y-2">
              <li>
                <i className="bi bi-chevron-right"></i><a href="#home">Home</a>
              </li>
              <li>
                <i className="bi bi-chevron-right"></i><a href="#about">About Us</a>
              </li>
              <li>
                <i className="bi bi-chevron-right"></i><a href="#services">Services</a>
              </li>
              <li>
                <i className="bi bi-chevron-right"></i><a href="#services">Terms of Services</a>
              </li>
            </ul>
          </div>
          <div className="flex w-full md:w-1/2 lg:w-1/4 flex-col space-y-2">
            <h4 className="text-2xl font-bold">Our Services</h4>
            <ul className="flex flex-col space-y-2">
              <li>
                <i className="bi bi-chevron-right"></i><a href="#">Easy Bookings</a>
              </li>
              <li>
                <i className="bi bi-chevron-right"></i ><a href="#">Best PlayGround</a>
              </li>
              <li>
                <i className="bi bi-chevron-right"></i ><a href="#">Health Management</a>
              </li>
              <li>
                <i className="bi bi-chevron-right"></i><a href="#">Better Location</a>
              </li>
            </ul>
          </div>
          <div className="flex w-full md:w-1/2 lg:w-1/4 flex-col space-y-2">
            <h4 className="text-2xl font-bold">Follow Us</h4>
            <p>
              Follow and like
            </p>
            <br/>
            <div className="flex justify-start space-x-5">
              <a href="#" target="_blank"><i className="bi bi-twitter text-sky-500 text-xl"></i></a>
              <a href="#" target="_blank"
                ><i className="bi bi-facebook text-blue-500 text-xl"></i></a>
              <a href="#" target="_blank"><i className="bi bi-instagram text-purple-600 text-xl"></i></a>
              <a href="#" target="_blank"
                ><i className="bi bi-linkedin text-blue-600 text-xl"></i></a>
            </div>
          </div>
        </div>
        <hr/>
        <div className="mt-5 flex flex-col items-center">
          <div className="flex flex-col md:flex-row md:space-x-5 ">
            <i className="bi bi-copyright"></i>
            <span>&copy; Copyright</span>
            <strong>Futsal Booking System</strong>
            <span>All Rights Reserved</span>
          </div>
          <div className="down">
            Designed By <strong className="font-light italic text-yellow-400">@bipinduwal</strong>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;

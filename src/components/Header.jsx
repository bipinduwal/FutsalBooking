
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, signout } from "../api_calls/userApi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';


function Header() {
  let navigate = useNavigate()
  let {user} = isAuthenticated()

  const handleLogout = () => {
    signout()
    navigate('/login')
  }

  return (
    
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container ps-16 pe-12 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <img src="/pngegg2.png" alt="" className="w-12" /> Futsal Booking
        </Link>
        <div className="space-x-6 ">
          <Link to="/bookings" className="text-gray-700 hover:text-orange-700">
            Bookings
          </Link>
          {user ? (
            <>
            <Link to="/profile" className="text-yellow-700 hover:text-gray-900"> My Bookings
            </Link>
            <button className="text-gray-700 hover:text-orange-700" onClick={handleLogout}>
              Logout
            </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-orange-700">
                Login
              </Link>
              <Link to="/register" className="text-gray-700 hover:text-orange-700">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;

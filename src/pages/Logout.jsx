import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signout } from '../api_calls/userApi';

const Logout = () => {

  return (
    <div className="logout-animation flex flex-col items-center justify-center h-[80vh]">
      <div className="spinner mb-4"></div>
      <p>Logging out...</p>
    </div>
  );
};

export default Logout;


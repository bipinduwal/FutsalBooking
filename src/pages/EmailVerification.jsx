import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // for extracting the token from the URL
import axios from 'axios'; // for API calls
import { verifyUser } from '../api_calls/userApi';

function EmailVerification() {
  const { token } = useParams(); // Extract the token from the URL
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Call API to verify token when the component mounts
  useEffect(() => {
    try{
     verifyUser(token)
       .then(data => {
        if(data.error){
            setError(data.error)
        }else{
            setMessage(data.message)
        }
       })
      } catch (error) {
        setError('Something went wrong. Please try again later.');
      } finally {
        setLoading(false);
      }
    
  }, [token]); // Dependency array ensures this only runs once, when the token is available

  return (
    <div className="h-[81.5vh] flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        {loading ? (
          <div className="text-gray-700 text-lg">Verifying your email...</div>
        ) : (
          <>
            {message && <p className="text-green-500 text-lg mb-4">{message.toUpperCase()}</p>}
            {error && <p className="text-red-500 text-lg mb-4">{error.toUpperCase()}</p>}
            
            {/* Optionally, you could add a link to navigate the user to login */}
            {message && (
              <a
                href="/login"
                className="text-yellow-500 hover:text-yellow-600 font-semibold"
              >
                Click here to log in
              </a>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default EmailVerification;

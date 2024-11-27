import { API } from "../config";

export const booking = async (data) => {
  // Try to get the token from local storage, but handle the case where it's missing
  const storedJwt = JSON.parse(localStorage.getItem("jwt"));
  const token = storedJwt ? storedJwt.token : null;

  // Create headers object conditionally, including the Authorization header only if the token exists
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API}/api/createbooking`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    return console.log(error);
  }
};

export const bookingdate = (date) => {
  return fetch(`${API}/api/fetchbookingtimebydate?date=${date}`)
  .then(response=>response.json())
    .then((response) => {
      if(response.error){
        console.log(response.error)
      }
      else{
        return response
      }
    //   if (!response.ok) {
    //     // If the response is not ok, check for a 404 error and return an empty array
    //     if (response.status === 400) {
    //       return [];
    //     } else {
    //       throw new Error("Failed to fetch booking data");
    //     }
    //   }
    //   // Parse the response if successful
    //   return response.json();
    // })
    // .catch((error) => {
    //   console.log("Error:", error);
    //   return []; // Return an empty array on error to prevent crashes
    // });
})
.catch(error=>{
console.log(error)
});
}

//get booking by user and user id
export const getUserBookings = async (userid) => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const response = await fetch(`${API}/api/fetchbookingbyuser/${userid}`, {
    method: "POST",
    headers: headers,
  });
  return await response.json();
};


//cancel booking
export const cancelBooking = async (id) =>{
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const response = await fetch(`${API}/api/cancelbooking/${id}`, {
    method: "POST",
    headers: headers,
  });
  return await response.json();
}

//update confirm booking
export const updateConfirm = async (id) =>{
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const response = await fetch(`${API}/api/updateconfirm/${id}`, {
    method: "POST",
    headers: headers,
  });
  return await response.json();
}
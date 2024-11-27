import { API } from "../config";

export const register = async (user) => {
    // user:{username, email, password}
    try {
        const response = await fetch(`${API}/api/register`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });
        return await response.json();
    } catch (error) {
        return console.log(error);
    }
}


//verifyuser
export const verifyUser = async (token) => {
    try {
        const response = await fetch(`${API}/api/verifyuser/${token}`);
        return await response.json();
    } catch (error) {
        return console.log(error);
    }
 }

 //login
export const login = async (user) => {
    try {
        const response = await fetch(`${API}/api/login`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });
        return await response.json();
    } catch (error) {
        return console.log(error);
    }
}

//validate token
export const validateToken = async (token) => {
    try {
        const response = await fetch(`${API}/api/validateuser`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(token)
        });
        return await response.json();
    } catch (error) {
        return console.log(error);
    }

}

//authenticated
export const authenticat = (info) => {
    localStorage.setItem('jwt', JSON.stringify(info))
}

export const isAuthenticated = () => {
   return localStorage.getItem('jwt') ? JSON.parse(localStorage.getItem('jwt')) : false
}

export const signout = () =>{
    localStorage.removeItem('jwt')
}

export const getUsers = async() => {
    try{
        const response = await fetch(`${API}/api/getallusers`)
        return await response.json()
    }
    catch(error){
        return console.log(error)
    }

}
export const updateUser = async(userid,data) => {
    try{
        const response = await fetch(`${API}/api/updateuserbyid/${userid}`,{
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return await response.json();
} catch (error) {
    return console.log(error);
}

}

//handle delete user

export const deleteUserById = async (req, res) => {
    try{
        const response = await fetch(`${API}/api/deleteuserbyid/${userid}`,{
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return await response.json();
} catch (error) {
    return console.log(error);
}
}
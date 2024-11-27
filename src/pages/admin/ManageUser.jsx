import React, { useState, useEffect } from "react";
import { deleteUserById, getUsers, updateUser } from "../../api_calls/userApi"; // Assume these API calls exist
import Swal from "sweetalert2";
// import { getUsers } from "../../api_calls/userApi";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null); // For editing user info

  useEffect(() => {
    // Fetch users when component mounts
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user); // Opens edit form with selected user data
  };

    const handleDeleteUser = async (userId) => {
      try {
        Swal.fire({title:"Are You sure!",
          html: "You cannot recover account once deleted",
          icon: "warning",
          showCancelButton: true,
        })
        .then(async (result)=>{
          if(result.isConfirmed){
            await deleteUserById(userId);
            Swal.fire("Deleted!", "User has been deleted.", "success");
            setUsers(users.filter((user) => user._id !== userId));
          }
        })
      } catch (error) {
        console.error("Error deleting user:", error);
        Swal.fire("Error", "Failed to delete user.", "error");
      }
    };

    const handleUpdate = async (e) => {
      e.preventDefault();
      try {
        await updateUser(editingUser._id, editingUser);
        Swal.fire("Updated!", "User has been updated.", "success");
        setEditingUser(null);
        fetchUsers(); // Refresh user list after update
      } catch (error) {
        console.error("Error updating user:", error);
        Swal.fire("Error", "Failed to update user.", "error");
      }
    };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full">
      <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>

      <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-slate-500 text-center">
            <th className="p-4">Name</th>
            <th className="p-4">Email</th>
            <th className="p-4">Status</th>
            <th className="p-4">Role</th>
            <th className="p-4">Created At</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-b">
              <td className="p-4">{user.username}</td>
              <td className="p-4">{user.email}</td>
              <td className="p-4">
                {user.isVerified ? (
                  <span className="text-green-500 font-semibold">
                    ✔ Verified
                  </span>
                ) : (
                  <span className="text-red-500 font-semibold">
                    ✖ Not Verified
                  </span>
                )}
              </td>

              <td className="p-4">{user.role}</td>
              <td className="p-4">{user.createdAt}</td>
              <td className="p-4 flex space-x-2 justify-center">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    onClick={() => handleEdit(user)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    onClick={() => handleDeleteUser(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingUser && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Edit User</h3>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="username"
                  value={editingUser.username}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={editingUser.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Role</label>
                <select
                  name="role"
                  value={editingUser.role}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                >
                  <option value="0">User</option>
                  <option value="1">Admin</option>
                </select>
              </div>
             {/* {!editingUser.isVerified && 
                ( <div className="mb-4">
                <label className="block text-gray-700">Verification</label>
                <select
                  name="isVerified"
                  value={editingUser.isVerified}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                >
                  <option value="1">Verify</option>
                  <option value="0">No  Verify</option>
                </select>
              </div>)} */}
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 px-4 rounded-lg shadow hover:bg-green-600"
              >
                Update User
              </button>
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                className="w-full bg-gray-300 text-gray-800 py-2 px-4 rounded-lg shadow mt-2 hover:bg-gray-400"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUser;

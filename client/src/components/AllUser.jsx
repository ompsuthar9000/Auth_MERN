import React, { useEffect, useState, useContext } from "react";
import { getAllUser, deleteUser, updateUser } from "../utils/api.js";
import UserCard from "./UserCard.jsx";
import EditUserPopup from "./EditUserPopup.jsx";
import { Context } from "../Context/AppContext.jsx";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import toast ,{Toaster}from 'react-hot-toast';
const UserList = () => {
    const { users, setUsers } = useContext(Context); // Context for user state
    const [isPopupOpen, setIsPopupOpen] = useState(false); // Popup state
    const [currentUser, setCurrentUser] = useState(null); // Current user being edited
    const navigate = useNavigate(); // Hook for navigation

    // Fetch user data from API
    const getData = async () => {
        try {
            const res = await getAllUser();
            res && setUsers(res.data); // Assuming API returns user data under `data`
        } catch (error) {
            console.error("Error fetching users:", error.message);
        }
    };

    useEffect(() => {
        console.log(users)
        getData();
    }, []);

    // Handle user edit action
    const handleEdit = (user) => {
        
        setCurrentUser(user);
        setIsPopupOpen(true);
    };

    // Handle user delete action
    const handleDelete = async (id) => {
        try {
            setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id)); // Optimistic UI update
            await deleteUser(id);
            toast.success("User deleted successfully");
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Navigate to the /register page
    const handleRegister = () => {
        navigate("/register");
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <Toaster/>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">User List</h1>
            <div className="mb-4">
                <button
                    onClick={handleRegister}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Register New User
                </button>
            </div>
            <div className="bg-white shadow-lg rounded-lg">
                {/* Table Header */}
                <div className="flex bg-gray-200 font-semibold text-gray-700 p-4 rounded-t-lg">
                    <div className="w-1/5 text-center">Profile</div>
                    <div className="w-2/5">Name</div>
                    <div className="w-1/5">Mobile</div>
                    <div className="w-2/5 text-center">Email</div>
                    <div className="w-1/5 text-center">Actions</div>
                </div>
                {/* User Rows */}
                {users?.map((user) => (
                    <UserCard
                        key={user._id}
                        user={user}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))}
            </div>

            {/* Edit User Popup */}
            {isPopupOpen && (
                <EditUserPopup
                    user={currentUser}
                    onClose={() => setIsPopupOpen(false)}
                    onUpdate={(updatedUser) => {
                        setUsers((prevUsers) =>
                            prevUsers.map((user) =>
                                user._id === updatedUser._id ? updatedUser : user
                            )
                        );
                    }}
                />
            )}
        </div>
    );
};

export default UserList;

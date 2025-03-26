import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash } from 'lucide-react';

const Users = () => {
    // List of Tailwind background color classes
    const colors = [
        "bg-red-500",
        "bg-blue-500",
        "bg-green-500",
        "bg-yellow-500",
        "bg-purple-500",
        "bg-pink-500",
        "bg-indigo-500",
        "bg-teal-500",
        "bg-orange-500",
    ];

    // State for users data
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to get a random color from the list
    const getRandomColor = () => {
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    };

    const formatDate = (dateString) => {
      const date = new Date(dateString);  // Convert the string to a Date object
      const day = date.getDate();          // Get the day (1-31)
      const month = date.getMonth() + 1;  // Get the month (0-11), so we add 1
      const year = date.getFullYear();    // Get the full year (e.g., 2025)
      // Format the date to "DD-MM-YYYY"
      return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
    };

    // Delete button function
    const buttonDelet = (id) => {
        console.log(`The user ${id} is deleted`);
        // You can add logic here to delete the user from the backend using axios
    }

    // Fetch users from the API when the component mounts
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/users', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`, // If you are using token authentication
                    },
                });
                setUsers(response.data); // Store users in state
            } catch (err) {
                setError(err.message); // Set error if something goes wrong
            } finally {
                setLoading(false); // Set loading to false once request is done
            }
        };

        fetchUsers();
    }, []); // Empty dependency array to run this effect only once when the component mounts

    if (loading) {
        return <div>Loading...</div>; // Show loading message while fetching
    }

    if (error) {
        return <div>Error: {error}</div>; // Show error message if any
    }

    return (
        <>
            <div className="flex justify-center m-auto">
                <table className="w-full text-center">
                    <thead className="bg-gray-200 rounded-md">
                        <tr>
                            <td className="py-2 px-1">Photo</td>
                            <td className="py-2 px-1">Email</td>
                            <td className="py-2 px-1">Date</td>
                            <td className="py-2 px-1">Status</td>
                            <td className="py-2 px-1">Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-100">
                                    <td className="flex justify-center py-1 px-1">
                                        <div
                                            className={` ${getRandomColor()} text-white rounded-full w-10 h-10 text-center flex justify-center items-center`}
                                        >
                                            {user.name[0]} {/* Show first letter of user name */}
                                        </div>
                                    </td>
                                    <td className="py-1 px-1">{user.email}</td>
                                    <td className="py-1 px-1">{formatDate(user.created_at)}</td>
                                    <td className="py-1 px-1">
                                        <p
                                            className={`p-1 ${user.is_verified === 1 ? 'bg-green-500' : 'bg-rose-500'} outline-none rounded text-white`}
                                        >
                                            {user.is_verified === 1 ? 'Verified' : 'Unverified'}
                                        </p>
                                    </td>
                                    <td>
                                        <div className="flex justify-center items-center">
                                            <Trash 
                                                className="size-6 hover:text-red-700 hover:cursor-pointer"
                                                onClick={() => buttonDelet(user.id)}  // Fix: Pass function reference here
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="py-4 text-center">
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Users;

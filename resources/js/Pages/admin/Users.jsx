import React, { useState, useEffect } from "react";
import axios from "axios";
import { Trash } from "lucide-react";

const Users = () => {
    const colors = [
        "bg-red-500", "bg-blue-500", "bg-green-500",
        "bg-yellow-500", "bg-purple-500", "bg-pink-500",
        "bg-indigo-500", "bg-teal-500", "bg-orange-500",
    ];

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [alertMessage, setAlertMessage] = useState(null);

    const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

    const showAlert = (message) => {
        setAlertMessage(message);
        setTimeout(() => setAlertMessage(null), 3000);
    };

    // Toggle verification status
    const toggleVerification = async (user) => {
        const url = user.is_verified 
            ? "http://127.0.0.1:8000/api/users/unverify" 
            : "http://127.0.0.1:8000/api/users/verify";

        try {
            await axios.put(url, { email: user.email }, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });

            setUsers(prevUsers =>
                prevUsers.map(u => 
                    u.id === user.id ? { ...u, is_verified: !u.is_verified } : u
                )
            );
        } catch (err) {
            console.error("Error updating verification status:", err);
            setError("Failed to update verification status");
        }
    };

    // Format date
    const formatDate = (dateString) => new Date(dateString).toLocaleDateString("fr-FR");

    // Delete user
    const deleteUser = async (user) => {
        try {
            await axios.post("http://127.0.0.1:8000/api/users/delete", 
                { email: user.email }, 
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );

            // Remove user from the state
            setUsers(users.filter(u => u.id !== user.id));
            showAlert("User deleted successfully!");
        } catch (err) {
            console.error("Error deleting user:", err);
            setError("Failed to delete user");
        }
    };

    // Fetch users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/users", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                setUsers(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="flex justify-center m-auto">
            {/* Alert message */}
            {alertMessage && (
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-md">
                    {alertMessage}
                </div>
            )}

            <table className="w-full text-center">
                <thead className="bg-gray-200 rounded-md">
                    <tr>
                        <th className="py-2 px-1">Photo</th>
                        <th className="py-2 px-1">Email</th>
                        <th className="py-2 px-1">Date</th>
                        <th className="py-2 px-1">Status</th>
                        <th className="py-2 px-1">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user.id} className="hover:bg-slate-100">
                                <td className="flex justify-center py-1 px-1">
                                    <div className={`${getRandomColor()} text-white rounded-full w-10 h-10 flex items-center justify-center`}>
                                        {user.name?.charAt(0).toUpperCase() || "?"}
                                    </div>
                                </td>
                                <td className="py-1 px-1">{user.email}</td>
                                <td className="py-1 px-1">{formatDate(user.created_at)}</td>
                                <td className="py-1 px-1 hover:cursor-pointer" onClick={() => toggleVerification(user)}>
                                    <p className={`p-1 ${user.is_verified ? "bg-green-500" : "bg-rose-500"} rounded text-white`}>
                                        {user.is_verified ? "Verified" : "Unverified"}
                                    </p>
                                </td>
                                <td>
                                    <div className="flex justify-center items-center">
                                        <Trash
                                            className="size-6 hover:text-red-700 hover:cursor-pointer"
                                            onClick={() => deleteUser(user)}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="py-4 text-center">No users found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Users;

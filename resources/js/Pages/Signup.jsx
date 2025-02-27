import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset previous messages
        setName('');
        setEmail('');
        setPassword('');

        try {
            const response = await axios.post('/api/signup', {
                name,
                email,
                password,
            });
            alert(response.data.message); // Show success alert
        } catch (err) {
            if (err.response && err.response.data.errors) {
                const errorMessages = Object.values(err.response.data.errors).flat().join(', ');
                alert(errorMessages); // Show error alert
            } else {
                alert('An unexpected error occurred.'); // Show general error alert
            }
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block" htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        className="border p-2 w-full"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block" htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="border p-2 w-full"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block" htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="border p-2 w-full"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 w-full"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default Signup;

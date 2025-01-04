import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Cookies, useCookies } from "react-cookie";
import { jwtDecode } from 'jwt-decode';

function LoginPage() {
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { setUser, setLoggedIn } = useContext(AuthContext)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setMessage('');
            const response = await axios.post(
                'http://localhost:5000/api/auth/login',
                { emailAddress, password },
                { withCredentials: true }
            );
            setMessage(response.data.message);
            localStorage.setItem("access-token", response.data.tokens['access-token'])
            setLoggedIn(true)
            setUser(jwtDecode(localStorage.getItem('access-token')))
            // localStorage.setItem("refresh-token", response.data.tokens['refresh-token'])

            // Optionally, you can redirect after successful login
            navigate('/');  // Or any other route based on your app flow

        } catch (error) {
            if (error.response) {
                console.error(error.response.data);
                setMessage(error.response.data.message);
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="mx-auto p-6 bg-white rounded-md shadow-md">
                <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="emailAddress" className="block mb-2">Email Address:</label>
                        <input
                            type="email"
                            id="emailAddress"
                            value={emailAddress}
                            onChange={(e) => setEmailAddress(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-2">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Login</button>
                    {message && <p className="text-red-500 text-sm whitespace-pre-line text-center mt-4">{message}</p>}
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
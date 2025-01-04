import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Correct import for jwt-decode
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(() => {
        const token = localStorage.getItem('access-token');
        if (token) {
            // Decode the token
            const decodedToken = jwtDecode(token);
            // Check if the token is expired
            return decodedToken.exp > Date.now() / 1000;
        }
        return false;
    });
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('access-token') || null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            if (!token) {
                setLoggedIn(false);
                setUser(null);
                return;
            }
    
            // Decode the token
            const decodedToken = jwtDecode(token);
            console.log(decodedToken)
    
            // Check if the token is expired
            const isTokenExpired = decodedToken.exp < Date.now() / 1000;
            if (isTokenExpired) {
                setLoggedIn(false);
                setUser(null);
                return;
            }

            setLoggedIn(true)
            setUser(decodedToken)

        };
    
        fetchUserDetails();  // Run the function to check token and fetch user details
        console.log(loggedIn)
        console.log(user)
    }, [token]);

    return (
        <AuthContext.Provider value={{ loggedIn, user, setUser, setLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};
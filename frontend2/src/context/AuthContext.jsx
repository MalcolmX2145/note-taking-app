import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );
    const [loggedIn, setLoggedIn] = useState(false); // Track login state

    // login function
    const login = async (inputs) => {
        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
            inputs,
            { withCredentials: true }
        );
        setUser(response.data.user);
        setLoggedIn(true); // Mark as logged in
        return response;
    };

    // logout function
    const logout = async () => {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`, {}, { withCredentials: true });
        setUser(null);
        setLoggedIn(false); // Mark as logged out
    };

    // Fetch user data on page load if user is logged in
    useEffect(() => {
        if (user) {
            // User is logged in
            setLoggedIn(true);
        } else {
            // User is not logged in
            setLoggedIn(false);
        }

        // Store user in localStorage when user state changes
        localStorage.setItem("user", JSON.stringify(user));
    }, [user]);

    // Optionally, fetch user info from the API when app is mounted
    useEffect(() => {
        if (!user) return;

        axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/user`, { withCredentials: true })
            .then((res) => {
                setUser(res.data.user);
                setLoggedIn(true);
            })
            .catch((err) => {
                console.error("Failed to fetch user:", err);
                setUser(null);
                setLoggedIn(false);
            });
    }, []);

    return (
        <AuthContext.Provider value={{ user, loggedIn, setUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

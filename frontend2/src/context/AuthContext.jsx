import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    // login
    const login = async (inputs) => {
        const response = await axios.post('http://localhost:5000/api/auth/login', inputs, { withCredentials: true })
        setUser(response.data.user)
        return response
    }


    //logout
    const logout = async () => {
        const response = await axios.post('http://localhost:5000/api/auth/logout', inputs)
        setUser(null)
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user))
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, setUser, login }}>
            {children}
        </AuthContext.Provider>
    );
};
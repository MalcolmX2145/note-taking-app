// Import React and necessary hooks
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { Link } from 'react-router-dom'; // Import Link for navigation
import { AuthContext } from '../context/AuthContext';

function Login() {

    const inputFields = [
        { label: "Email Address", id: "emailAddress", name: "emailAddress", type: "email", placeholder: "john@gmail.com" },
        { label: "Password", id:"password", name: "password", type: "password", placeholder: "password" }
    ]
    const [inputs, setInputs] = useState({
        emailAddress: "",
        password: ""
    })

    const [errorMessage, setErrorMessage] = useState('');

    const { login } = useContext(AuthContext)

    // Initialize useNavigate hook for navigation
    const navigate = useNavigate();


    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await login(inputs)
            navigate('/');
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "An error occured");
            console.log(error)
        }
    };

    // JSX structure for login form
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="mx-auto p-6 bg-white rounded-md shadow-md">
                <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
                <form onSubmit={handleSubmit}>
                    {inputFields.map((item, index) => (
                        <div key={index} className="mb-4">
                        <label htmlFor={item.id} className="block mb-2">{item.label}</label>
                        <input
                            type={item.type}
                            id={item.id}
                            placeholder={item.placeholder}
                            name={item.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    ))}
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Login</button>
                    {errorMessage && <p className="text-red-500 text-sm whitespace-pre-line text-center mt-4 ">{errorMessage}</p>} {/* Display error message if exists */}
                    <p className="text-center mt-4">Do not have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign Up</Link></p>
                </form>
            </div>
        </div>
    );
}

export default Login;
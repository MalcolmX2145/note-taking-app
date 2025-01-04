// Import React and necessary hooks
import { useState } from 'react';
import axios from 'axios'; // Import Axios
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import '..//SignupPage.css';


function SignupPage() {
    // State variables for email, username, password, and error/success messages
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Initialize useNavigate hook for navigation
    const navigate = useNavigate();

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Clear previous messages
            setErrorMessage('');
            setSuccessMessage('');

            // Send signup request to server
            const response = await axios.post('http://localhost:4000/signup', { email, username, password });

            // If signup successful, display success message and navigate
            if (response.status === 201) {
                setSuccessMessage('Signup successful! Redirecting to login...');
                setTimeout(() => navigate('/login'), 2000); // Redirect after 2 seconds
            }
        } catch (error) {
            console.error('Error:', error);

            // If signup failed, display error message
            setErrorMessage('Signup failed. Please try again.');
        }
    };

    // JSX structure for signup form
    return (
        <div className="signup-container">
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Signup</button>
                {successMessage && <p className="success-message">{successMessage}</p>}
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
        </div>
    );
}

export default SignupPage;

import React, { useState } from "react";
import styles from "./RegisterUser.module.css"; // Assume you have CSS for styling

const RegisterUser = () => {
    const [email, setEmail] = useState<string>(''); // Store email input
    const [password, setPassword] = useState<string>(''); // Store password input
    const [message, setMessage] = useState<string>(''); // Store API response messages

    // Simple email format validation
    const isValidEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailRegex.test(email);
    };

    // Handle form submission
    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevents page reload on submit

        // Validate email and password
        if (!email || !isValidEmail(email)) {
            alert('Please enter a valid email address.');
            return; // Stop form submission if email is invalid
        }

        if (!password || password.length < 6) {
            alert('Password must be at least 6 characters long.');
            return; // Stop form submission if password is too short
        }

        // Send a POST request to the authentication endpoint with email and password
        fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email_address: email, password })
        })
            .then((response) => response.json())
            .then((result) => {
                console.log('API Response:', result); // Debug: Log the full API response
                setMessage(result.message); // Display the response message
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setMessage('Failed to fetch data'); // Display an error message on failure
            });
    };

    return (
        <>
            <div className={styles['container-main']}>
                <div className={styles['wrapper-main']}>
                    <h1>REGISTER</h1>

                    {/* Form submission with email and password */}
                    <form onSubmit={handleFormSubmit} className={styles['input-container']}>
                        <h3>e-mail:</h3>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <h3>Password:</h3>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <div className={styles['login-btn-container']}>
                            <button type="submit" className={styles['login-btn']}>Save</button>
                        </div>
                    </form>

                    {/* Display message from API response */}
                    {message && <div className={styles['message-container']}><p>{message}</p></div>}
                </div>
            </div>
        </>
    );
};

export default RegisterUser;

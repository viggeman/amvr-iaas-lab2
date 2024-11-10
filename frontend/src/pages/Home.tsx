import { FC, useState } from 'react';
import styles from "./Home.module.css";

type Props = object;

const Home: FC<Props> = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');  // Store API response messages

  // Handle form submission
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();  // Prevents page reload on submit

    fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
      .then((response) => response.json())
      .then((result) => {
        setMessage(result.message);  // Assuming backend sends a message in response
        alert(result.message);       // Display the backend message
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setMessage('Failed to fetch data');
      });
  };

  return (
    <>
      <div className={styles['container-main']}>
        <div className={styles['wrapper-main']}>
          <h1>LOGIN</h1>

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
              <button type="submit" className={styles['login-btn']}>Login</button>
            </div>
          </form>

          <div className={styles['register-request-container']}>
            <p>Don't have an account? Register here!</p>
          </div>

          {/* Display message from API response */}
          {message && <div className={styles['message-container']}><p>{message}</p></div>}
        </div>
      </div>
    </>
  );
};

export default Home;

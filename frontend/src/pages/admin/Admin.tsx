import { useEffect, useState } from 'react';
import styles from './Admin.module.css';

interface Users {
  id: string;
  role: string;
  first_name: string;
  last_name: string;
  email_address: string;
  password: string;
  date_of_birth: string;
  address: string;
}

const Admin = () => {
  const [result, setResult] = useState<null | Users[]>(null);

  function handleClick(id: string) {
    const user = document.getElementById(id);
    if (user !== null) {
      console.log(user.id);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/admin`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        setResult(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className={styles.main}>
      <div className={styles.table}>
        {result !== null &&
          result.map((user) => (
            <div
              key={user.id}
              id={user.id}
              className={styles.userContainer}
              onClick={() => handleClick(user.id)}
            >
              <p>
                <strong>Id: </strong>
                {user.id}
              </p>
              <p>
                <strong>Role: </strong>
                {user.role}
              </p>
              <p>
                <strong>First Name: </strong>
                {user.first_name}
              </p>
              <p>
                <strong>Last Name: </strong>
                {user.last_name}
              </p>
              <p>
                <strong>Email address: </strong>
                {user.email_address}
              </p>
              <p>
                <strong>Password: </strong>
                {user.password}
              </p>
              <p>
                <strong>Date of birth: </strong>
                {user.date_of_birth}
              </p>
              <p>
                <strong>AddressId: </strong>
                {user.address ?? 'Not specified'}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Admin;

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
      {result !== null &&
        result.map((user) => (
          <div key={user.id} className={styles.table}>
            <span>Id:</span>
            <span>Role:</span>
            <span>First Name:</span>
            <span>Last Name:</span>
            <span>Email address:</span>
            <span>Password:</span>
            <span>Date of birth:</span>
            <span>AddressId:</span>
            <span>Dummy field:</span>
            <span>{user.id}</span>
            <span>{user.role}</span>
            <span>{user.first_name}</span>
            <span>{user.last_name}</span>
            <span>{user.email_address}</span>
            <span>{user.password}</span>
            <span>{user.date_of_birth}</span>
            <span>{user.address}</span>
            <span>Dummy data</span>
          </div>
        ))}
    </div>
  );
};

export default Admin;

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
          <div key={user.id}>
            <p>{user.id}</p>
            <p>{user.role}</p>
            <p>{user.first_name}</p>
            <p>{user.last_name}</p>
            <p>{user.email_address}</p>
            <p>{user.password}</p>
            <p>{user.date_of_birth}</p>
            <p>{user.address}</p>
          </div>
        ))}
    </div>
  );
};

export default Admin;

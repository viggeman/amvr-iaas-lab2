import { useEffect, useState } from 'react';
import styles from './Admin.module.css';
import { Data } from '../../types/user';

const Admin = () => {
  const [result, setResult] = useState<null | Data[]>(null);

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
          result[0].users.map((user) => (
            <div key={user.id} id={user.id} className={styles.userContainer}>
              <button className={styles.idNavigation}>
                <p className={styles.id}>
                  <strong>Id: </strong>
                  <a href={`/auth/admin/modify-user/${user.id}`}>{user.id}</a>
                </p>
              </button>
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
                <strong>Date of birth: </strong>
                {user.date_of_birth}
              </p>
              <p>
                <strong>AddressId: </strong>
                {user.address ?? 'N/A'}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Admin;

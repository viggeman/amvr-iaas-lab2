import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Admin.module.css';
import { User } from '../../types/user';

const AdminModify = () => {
  const [result, setResult] = useState<null | User[]>(null);
  const { userId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/admin/get-user/${userId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Data:', data);
        setResult(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div className={styles.main}>
      <h2>Adminmodify</h2>
      {result !== null &&
        result.map((user) => (
          <div key={user.id} className={styles.user}>
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
              {user.address ?? 'N/A'}
            </p>
          </div>
        ))}
    </div>
  );
};

export default AdminModify;

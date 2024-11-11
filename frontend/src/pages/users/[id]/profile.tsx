import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './profile.module.css';

interface User {
  id?: number;
  first_name: string;
  last_name: string;
  role: string;
  email_address: string;
  dateOfBirth: string;
  created_at: string;
  modified_at: string;
}

const UserProfile: FC = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User>({
    id: undefined,
    first_name: '',
    last_name: '',
    role: '',
    dateOfBirth: '',
    email_address: '',
    created_at: '',
    modified_at: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/profile?id=${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUser(data[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className={styles.container}>
      <h1>User Profile: {user.first_name + ' ' + user.last_name}</h1>
      {user.id !== undefined ? (
        <div key={user.id}>
          <div>First Name: {user.first_name}</div>
          <div>Last Name: {user.last_name}</div>
          <div>Role: {user.role}</div>
          <div>Email Address: {user.email_address}</div>
          <div>
            DOB: {new Date(user.date_of_birth).toISOString().split('T')[0]}
          </div>

          <div>
            Created At: {new Date(user.created_at).toISOString().split('T')[0]}{' '}
          </div>
          <div>
            Updated At: {new Date(user.modified_at).toISOString().split('T')[0]}{' '}
          </div>
        </div>
      ) : (
        <div>No profile data found</div>
      )}
    </div>
  );
};

export default UserProfile;

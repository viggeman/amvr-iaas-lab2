import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './profile.module.css';

interface User {
  id?: number;
  name: string;
  last_name: string;
  email_address: string;
  created_at: string;
  modified_at: string;
}
interface Props {
  User: User;
}

const UserProfile: FC<Props> = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User>({
    id: undefined,
    name: '',
    last_name: '',
    email_address: '',
    created_at: '',
    modified_at: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('id', id);
        const response = await fetch(`/api/users/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUser(data);
        console.log('data', data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className={styles.container}>
      <h1>User Profile: {id}</h1>
      {user.id !== undefined ? (
        <div key={user.id}>
          <div>Name: {user.name}</div>
          <div>Last Name: {user.last_name}</div>
          <div>Email Address: {user.email_address}</div>
          <div>Created At: {user.created_at}</div>
          <div>Updated At: {user.modified_at}</div>
        </div>
      ) : (
        <div>No profile data found</div>
      )}
    </div>
  );
};

export default UserProfile;

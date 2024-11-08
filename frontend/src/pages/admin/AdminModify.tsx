import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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

const AdminModify = () => {
  const [result, setResult] = useState<null | Users[]>(null);
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
    </div>
  );
};

export default AdminModify;

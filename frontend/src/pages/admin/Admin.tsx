import { useEffect, useState } from 'react';
import styles from './Admin.module.css';
import { User } from '../../types/user';
import { useForm, SubmitHandler } from 'react-hook-form';

type Input = {
  id: string;
};

const Admin = () => {
  const [result, setResult] = useState<null | User[]>(null);

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

  const {
    register,
    handleSubmit,
    // watch,
    // formState: { errors },
  } = useForm<Input>();
  const onSubmit: SubmitHandler<Input> = async (data) => {
    const checker = confirm('Are you sure you want to delete this user?');
    if (checker !== true) {
      return null;
    }
    console.log('Submitted:', data);
    const body = data;
    try {
      const response = await fetch(`/api/admin/delete-user`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.table}>
        {result !== null &&
          result.map((user) => (
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
              <form onSubmit={handleSubmit(onSubmit)} method="DELETE">
                <button type="submit" className={styles.deleteButton}>
                  <input
                    {...register('id')}
                    defaultValue={user.id}
                    className={styles.hideInput}
                  />
                  Delete user
                </button>
              </form>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Admin;

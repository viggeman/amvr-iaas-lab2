import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import styles from './profile.module.css';
import { User } from '../../../types/user';

type Inputs = {
  role: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  password?: string;
  dateOfBirth: string;
  address?: string;
  id: string;
};

const EditProfile: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);

  const { register, handleSubmit, setValue } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      // Ensure `id` is valid before submission
      if (!id) {
        console.error('User ID is missing');
        return;
      }

      // Attach the `id` from `useParams` if it isn't already in `data`
      data.id = id;

      const response = await fetch('/api/profile/edit-profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log('User data updated:', data);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/profile?id=${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUser(data[0]);

        if (data[0]) {
          setValue('id', data[0].id);
          setValue('firstName', data[0].first_name);
          setValue('lastName', data[0].last_name);
          setValue('role', data[0].role);
          setValue('emailAddress', data[0].email_address);
          setValue('password', data[0].password);
          setValue('dateOfBirth', data[0].date_of_birth);
          setValue('address', data[0].address);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchData();
  }, [id, setValue]);

  return (
    <div className={styles.container}>
      <h1>Edit Profile</h1>
      {user ? (
        <form onSubmit={handleSubmit(onSubmit)} method='PUT'>
          <div className={styles.form}>
            <label>First Name: </label>
            <input defaultValue={user.first_name} {...register('firstName')} />
          </div>
          <div className={styles.form}>
            <label>Last Name: </label>
            <input defaultValue={user.last_name} {...register('lastName')} />
          </div>
          <div className={styles.form}>
            <label>Role: </label>
            <input defaultValue={user.role} {...register('role')} />
          </div>
          <div className={styles.form}>
            <label>Email Address: </label>
            <input
              defaultValue={user.email_address}
              {...register('emailAddress')}
            />
          </div>
          <div className={styles.form}>
            <label>Date of Birth: </label>
            <input
              defaultValue={user.date_of_birth}
              {...register('dateOfBirth')}
            />
          </div>
          <div className={styles.form}>
            <label>Address: </label>
            <input defaultValue={user.address} {...register('address')} />
          </div>
          <div className={styles.form}>
            <label>Password: </label>
            <input
              type='password'
              placeholder='Enter new password if updating'
              {...register('password')}
            />
          </div>

          <input type='submit' value='Save Changes' />
        </form>
      ) : (
        <p>No profile data found</p>
      )}
    </div>
  );
};

export default EditProfile;

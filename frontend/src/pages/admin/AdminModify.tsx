import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Admin.module.css';
import { User, Address } from '../../types/user';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  role: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  dateOfBirth: string;
};

const AdminModify = () => {
  const [user, setUser] = useState<null | User[]>(null);
  const [userAddress, setUserAddress] = useState<null | Address[]>(null);
  const { userId } = useParams();

  const {
    register,
    handleSubmit,
    // watch,
    // formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const checker = confirm('Are you sure you want to add these changes?');
    if (checker !== true) {
      return null;
    }
    console.log('Submitted:', data);
    const body = data;
    try {
      const response = await fetch(`/api/admin/modify-user`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      console.log(JSON.stringify(body));
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // const data = await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/admin/get-user/${userId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Data:', data);
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchUserAddress = async () => {
      try {
        const response = await fetch(`/api/admin/get-user-address/${userId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Adressdata:', data);
        setUserAddress(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
    fetchUserAddress();
  }, [userId]);

  let noAddressMsg;
  const checkAddress = () => {
    if (userAddress?.length === 0) {
      noAddressMsg = (
        <h2>
          <i>User has not added an address</i>
        </h2>
      );
    }
  };
  checkAddress();
  return (
    <div className={styles.main}>
      <nav>
        <a href="/auth/admin" className={styles.backButton}>
          Back
        </a>
      </nav>
      {user !== null &&
        user.map((user) => (
          <div key={user.id} className={styles.user}>
            <form onSubmit={handleSubmit(onSubmit)} method="PUT">
              <p>
                <strong>Role: </strong>
                <input
                  className={styles.modifyInput}
                  defaultValue={user.role}
                  {...register('role')}
                />
              </p>
              <p>
                <strong>First Name: </strong>
                <input
                  className={styles.modifyInput}
                  defaultValue={user.first_name}
                  {...register('firstName')}
                />
              </p>
              <p>
                <strong>Last Name: </strong>
                <input
                  className={styles.modifyInput}
                  defaultValue={user.last_name}
                  {...register('lastName')}
                />
              </p>
              <p>
                <strong>Email address: </strong>
                <input
                  className={styles.modifyInput}
                  defaultValue={user.email_address}
                  {...register('emailAddress')}
                />
              </p>
              <p>
                <strong>Date of birth: </strong>
                <input
                  className={styles.modifyInput}
                  defaultValue={user.date_of_birth}
                  {...register('dateOfBirth')}
                />
              </p>
              <input
                className={styles.modifyButton}
                type="submit"
                value={'Add changes'}
              />
            </form>
          </div>
        ))}
      {userAddress !== null &&
        userAddress.map((address) => (
          <div key={address.uid} className={styles.user}>
            <h3>Address:</h3>
            <p>
              <strong>Country: </strong>
              {address.country}
            </p>
            <p>
              <strong>City: </strong>
              {address.city}
            </p>
            <p>
              <strong>Street: </strong>
              {address.street}
            </p>
            <p>
              <strong>Street number: </strong>
              {address.street_number}
            </p>
            <p>
              <strong>Postal code: </strong>
              {address.postal_code}
            </p>
          </div>
        ))}
      {noAddressMsg}
    </div>
  );
};

export default AdminModify;

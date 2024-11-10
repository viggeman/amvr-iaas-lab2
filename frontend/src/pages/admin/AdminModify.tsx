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
  password: string;
  dateOfBirth: string;
  addressId: string;
  id: string;
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

  return (
    <div className={styles.main}>
      <nav>
        <a href="/auth/admin">Back</a>
      </nav>
      {user !== null &&
        user.map((user) => (
          <div key={user.id} className={styles.user}>
            <form onSubmit={handleSubmit(onSubmit)} method="PUT">
              <p>
                <strong>Role: </strong>
                <input defaultValue={user.role} {...register('role')} />
              </p>
              <p>
                <strong>First Name: </strong>
                <input
                  defaultValue={user.first_name}
                  {...register('firstName')}
                />
              </p>
              <p>
                <strong>Last Name: </strong>
                <input
                  defaultValue={user.last_name}
                  {...register('lastName')}
                />
              </p>
              <p>
                <strong>Email address: </strong>
                <input
                  defaultValue={user.email_address}
                  {...register('emailAddress')}
                />
              </p>
              <p>
                <strong>Password: </strong>
                <input defaultValue={user.password} {...register('password')} />
              </p>
              <p>
                <strong>Date of birth: </strong>
                <input
                  defaultValue={user.date_of_birth}
                  {...register('dateOfBirth')}
                />
              </p>
              <p>
                <strong>AddressId: </strong>
                {user.address ? (
                  <input
                    defaultValue={user.address}
                    {...register('addressId')}
                  />
                ) : (
                  'N/A'
                )}
              </p>
              <p>
                <strong>Id: </strong>
                <input defaultValue={user.id} {...register('id')} />
              </p>
              <input type="submit" />
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
    </div>
  );
};

export default AdminModify;

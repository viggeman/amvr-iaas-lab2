import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Admin.module.css';
import { User } from '../../types/user';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  userId: string;
  userRole: string;
  userFirstName: string;
  userLastName: string;
  userEmailAddress: string;
  userPassword: string;
  dateOfBirth: string;
  addressId: string;
};

const AdminModify = () => {
  const [result, setResult] = useState<null | User[]>(null);
  const { userId } = useParams();

  const {
    register,
    handleSubmit,
    // watch,
    // formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) =>
    console.log('Submitted:', data);

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
      {result !== null &&
        result.map((user) => (
          <div key={user.id} className={styles.user}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <p>
                <strong>Id: </strong>
                <input defaultValue={user.id} {...register('userId')} />
              </p>
              <p>
                <strong>Role: </strong>
                <input defaultValue={user.role} {...register('userRole')} />
              </p>
              <p>
                <strong>First Name: </strong>
                <input
                  defaultValue={user.first_name}
                  {...register('userFirstName')}
                />
              </p>
              <p>
                <strong>Last Name: </strong>
                <input
                  defaultValue={user.last_name}
                  {...register('userLastName')}
                />
              </p>
              <p>
                <strong>Email address: </strong>
                <input
                  defaultValue={user.email_address}
                  {...register('userEmailAddress')}
                />
              </p>
              <p>
                <strong>Password: </strong>
                <input
                  defaultValue={user.password}
                  {...register('userPassword')}
                />
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
              <input type="submit" />
            </form>
          </div>
        ))}
    </div>
  );
};

export default AdminModify;

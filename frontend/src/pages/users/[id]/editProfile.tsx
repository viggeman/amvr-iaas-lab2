import { FC, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Importing useNavigate here
import { useForm, SubmitHandler } from 'react-hook-form';
import styles from './profile.module.css';
import { User } from '../../../types/user';
import { Box, Card, Flex, Text, Button, Dialog } from '@radix-ui/themes';

type Inputs = {
  role: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  password?: string;
  dateOfBirth: string;
  address?: string;
  id: string;
  gdpr: boolean;
};

const EditProfile: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate(); // Initialize navigate here
  const [user, setUser] = useState<User | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const { register, handleSubmit, setValue } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!user?.gdpr) {
      console.error('GDPR agreement is required to save data.');
      setShowDialog(true);
      return;
    }

    try {
      if (!id) {
        console.error('User ID is missing');
        return;
      }
      data.id = id;
      data.gdpr = true;

      // Add one day to dateOfBirth
      const dateOfBirth = new Date(data.dateOfBirth);
      dateOfBirth.setDate(dateOfBirth.getDate() + 1);
      data.dateOfBirth = dateOfBirth.toISOString().split('T')[0];

      const response = await fetch('/api/profile/edit-profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Save was successful, redirect to profile page
      console.log('User data updated:', data);
      navigate(`/users/${id}/profile`); // Redirect to the profile page
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleAgree = async () => {
    if (user) {
      // Update GDPR consent in state
      setUser((prev) => (prev ? { ...prev, gdpr: true } : null));
      setShowDialog(false);
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
          setValue(
            'dateOfBirth',
            new Date(data[0].date_of_birth).toISOString().split('T')[0]
          );
          setValue('address', data[0].address);
          setValue('gdpr', data[0].gdpr);
        }

        // Show dialog if GDPR has not been agreed to
        if (data[0] && !data[0].gdpr) {
          setShowDialog(true);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchData();
  }, [id, setValue]);

  return (
    <Box maxWidth='500px' className={styles.container}>
      <Card variant='classic'>
        <h1>Profile</h1>
        {user ? (
          <form onSubmit={handleSubmit(onSubmit)} method='PUT'>
            <Flex direction='column' gap='3' key={user.id}>
              <div className={styles.form}>
                <Text>First Name: </Text>
                <input
                  defaultValue={user.first_name}
                  {...register('firstName')}
                />
              </div>
              <div className={styles.form}>
                <Text>Last Name: </Text>
                <input
                  defaultValue={user.last_name}
                  {...register('lastName')}
                />
              </div>
              <div className={styles.form}>
                <Text>Role: </Text>
                <input defaultValue={user.role} {...register('role')} />
              </div>
              <div className={styles.form}>
                <Text>Email Address: </Text>
                <input
                  defaultValue={user.email_address}
                  {...register('emailAddress')}
                />
              </div>
              <div className={styles.form}>
                <Text>Date of Birth: </Text>
                <input
                  defaultValue={
                    new Date(user.date_of_birth).toISOString().split('T')[0]
                  }
                  {...register('dateOfBirth')}
                />
              </div>
              <div className={styles.form}>
                <Text>Address: </Text>
                <input defaultValue={user.address} {...register('address')} />
              </div>
              <div className={styles.form}>
                <Text>Password: </Text>
                <input
                  type='password'
                  placeholder='Enter new password if updating'
                  {...register('password')}
                />
              </div>
              {user.gdpr && <Text>GDPR Signed</Text>}

              <Button>Save Changes</Button>
            </Flex>
          </form>
        ) : (
          <p>No profile data found</p>
        )}
      </Card>
      <Dialog.Root open={showDialog} onOpenChange={setShowDialog}>
        <Dialog.Content maxWidth='450px'>
          <Dialog.Title>GDPR</Dialog.Title>
          <Dialog.Description size='2' mb='4'>
            We need to store and process personal information about you, such as
            your first name, last name, email address, date of birth, and
            address. The purpose of this processing is to connect you with other
            users and/or to enable support to contact you. We obtained your
            information solely from data inputted by you. We always apply
            current privacy legislation to all processing of personal data. The
            legal basis for processing your personal data is the legitimate
            interest in providing and improving our services. Your information
            will be stored for as long as you have an active account with us or
            as required by applicable laws and regulations. The personal
            information we process about you is shared only with other users on
            the platform. We will not share your information with any third
            parties unless legally required to do so. Furthermore, we will never
            transfer your data to a country outside the EU. The data controller
            is [Your Company Name]. You have the right to contact us if you
            would like to access information we have about you, request
            corrections, request data transfer, restrict processing, object to
            processing, or request the deletion of your data. The easiest way to
            do this is by contacting us at support@yourcompany.com. You can
            reach our Data Protection Officer at dpo@yourcompany.com. If you
            have any complaints about how we process your personal data, you
            have the right to lodge a complaint with the supervisory authority,
            the Swedish Authority for Privacy Protection (IMY).
          </Dialog.Description>
          <Flex gap='3' mt='4' justify='end'>
            <Dialog.Close>
              <Button variant='soft' color='gray'>
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close onClick={handleAgree}>
              <Button type='button'>Agree</Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </Box>
  );
};

export default EditProfile;

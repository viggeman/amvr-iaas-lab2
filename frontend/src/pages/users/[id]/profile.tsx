import { FC } from 'react';
import { useParams } from 'react-router-dom';
import styles from './profile.module.css';

// interface Props {
//
// }
type Props = object;

const UserProfile: FC<Props> = () => {
  const { id } = useParams();
  return (
    <div className={styles.container}>
      <h1>User Profile: {id}</h1>
    </div>
  );
};

export default UserProfile;

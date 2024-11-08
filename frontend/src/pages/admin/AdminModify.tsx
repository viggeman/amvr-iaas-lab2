import { useParams } from 'react-router-dom';

const AdminModify = () => {
  const { userId } = useParams();
  console.log(userId);

  return <h2>Adminmodify</h2>;
};

export default AdminModify;

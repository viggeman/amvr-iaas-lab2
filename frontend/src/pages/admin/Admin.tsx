import { useEffect } from 'react';

const Admin = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/admin`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  return <h2>Hej</h2>;
};

export default Admin;

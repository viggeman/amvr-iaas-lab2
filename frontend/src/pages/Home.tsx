import { FC, useEffect, useState } from 'react';

// interface Props {}
type Props = object;

const Home: FC<Props> = () => {
  const [message, setMessage] = useState<string>('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api');
        const data = await response.text();
        setMessage(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div>{message}</div>
    </>
  );
};

export default Home;

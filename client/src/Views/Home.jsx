import React, {useEffect} from 'react'

const Home = () => {
const getUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/rawquery");
      const jsonDATA = await response.json();
      console.log(jsonDATA);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>Home</div>
  )
}

export default Home
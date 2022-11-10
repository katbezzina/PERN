import React from 'react'

const Home = () => {
  var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("http://localhost:5000/users/all", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  
  return (
    <div>Home</div>
  )
}

export default Home
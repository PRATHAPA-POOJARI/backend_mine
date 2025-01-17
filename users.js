// users.js

// Sample in-memory user data
const users = [
    { username: 'prathap', password: 'password123' },
    { username: '1', password: '1' },
    { username: 'z', password: 'z' },
    // Add more users as needed
  ];
  
  // Function to authenticate users
  function authenticateUser(username, password) {
    const user = users.find((u) => u.username === username && u.password === password);
    return user ? true : false;
  }
  
  module.exports = { authenticateUser };
  
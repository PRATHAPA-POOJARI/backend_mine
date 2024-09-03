// server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./db'); 
const routes = require('./routes');
const { authenticateUser } = require('./users'); 

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body; 

  const isAuthenticated = authenticateUser(username, password);

  if (isAuthenticated) {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});


app.use('/api', routes);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

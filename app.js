// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const app = express();
// const PORT = 5000;

// // Middleware
// app.use(express.json());
// app.use(cors());

// //MongoDB Connection
// mongoose.connect('mongodb://localhost:27017', {
 
// });
// // mongoose.connect('mongodb://172.16.68.236:27071/ ', {
 
// // });

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// // Get all database names
// app.get('/api/databases', async (req, res) => {
//   try {
//     const admin = db.db.admin(); // Get the admin object to list all databases
//     const databases = await admin.listDatabases();
//     res.json(databases.databases.map(db => db.name)); // Send only the names of the databases
//   } catch (error) {
//     console.error('Error fetching databases:', error); // Log error details
//     res.status(500).json({ message: 'Error fetching databases' });
//   }
// });

// // Get all collections in a specific database
// app.get('/api/collections/:databaseName', async (req, res) => {
//   const { databaseName } = req.params;
//   try {
//     const database = mongoose.connection.useDb(databaseName); // Use the correct database dynamically
//     const collections = await database.db.listCollections().toArray(); // List collections in that database
//     res.json(collections.map(col => col.name)); // Send only the names of the collections
//   } catch (error) {
//     console.error('Error fetching collections:', error); // Log error details
//     res.status(500).json({ message: 'Error fetching collections' });
//   }
// });

// // Get all documents in a specific collection of a database
// app.get('/api/collections/:databaseName/:collectionName', async (req, res) => {
//   const { databaseName, collectionName } = req.params;
//   try {
//     const database = mongoose.connection.useDb(databaseName); // Use the correct database dynamically
//     const collection = database.collection(collectionName);
//     const documents = await collection.find({}, { projection: { _id: 0 } }).toArray(); // Exclude _id field
//     res.json(documents);
//   } catch (error) {
//     console.error('Error fetching documents:', error); // Log error details
//     res.status(500).json({ message: 'Error fetching documents' });
//   }
// });

// // Update a document by ID
// app.put('/api/collections/:databaseName/:collectionName/:id', async (req, res) => {
//   const { databaseName, collectionName, id } = req.params;
//   const updateData = req.body;

//   try {
//     const database = mongoose.connection.useDb(databaseName); // Use the correct database dynamically
//     const collection = database.collection(collectionName);
//     const updatedDocument = await collection.findOneAndUpdate(
//       { _id: new mongoose.Types.ObjectId(id) },
//       { $set: updateData },
//       { returnOriginal: false } // Return the updated document
//     );

//     if (updatedDocument.value) {
//       res.json(updatedDocument.value);
//     } else {
//       res.status(404).json({ message: 'Document not found' });
//     }
//   } catch (error) {
//     console.error('Error updating document:', error); // Log error details
//     res.status(500).json({ message: 'Error updating document' });
//   }
// });

// // Delete a document by ID
// app.delete('/api/collections/:databaseName/:collectionName/:id', async (req, res) => {
//   const { databaseName, collectionName, id } = req.params;

//   try {
//     const database = mongoose.connection.useDb(databaseName); // Use the correct database dynamically
//     const collection = database.collection(collectionName);
//     const result = await collection.deleteOne({ _id: new mongoose.Types.ObjectId(id) });

//     if (result.deletedCount === 1) {
//       res.status(200).json({ message: 'Document deleted successfully' });
//     } else {
//       res.status(404).json({ message: 'Document not found' });
//     }
//   } catch (error) {
//     console.error('Error deleting document:', error); // Log error details
//     res.status(500).json({ message: 'Error deleting document' });
//   }
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { authenticateUser } = require('./users'); // Import the users module

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
// mongoose.connect('mongodb://localhost:27017', {});
mongoose.connect('mongodb://172.16.68.236:27071/ ', {});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Login endpoint
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Use the authenticateUser function to check if the user exists
  const isAuthenticated = authenticateUser(email, password);

  if (isAuthenticated) {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

// Existing API endpoints for MongoDB operations
// Get all database names
app.get('/api/databases', async (req, res) => {
  try {
    const admin = db.db.admin(); // Get the admin object to list all databases
    const databases = await admin.listDatabases();

    // Define prefixes to exclude
    const excludedPrefixes = ['WSESS', 'WSESP'];

    // Filter out databases that start with any of the excluded prefixes
    const filteredDatabases = databases.databases
      .map((db) => db.name)
      .filter((dbName) => !excludedPrefixes.some(prefix => dbName.startsWith(prefix)));

    res.json(filteredDatabases); // Send only the names of the filtered databases
  } catch (error) {
    console.error('Error fetching databases:', error); // Log error details
    res.status(500).json({ message: 'Error fetching databases' });
  }
});

// Get all collections in a specific database
app.get('/api/collections/:databaseName', async (req, res) => {
  const { databaseName } = req.params;
  try {
    const database = mongoose.connection.useDb(databaseName); 
    const collections = await database.db.listCollections().toArray(); // List collections in that database
    res.json(collections.map((col) => col.name)); // Send only the names of the collections
  } catch (error) {
    console.error('Error fetching collections:', error); // Log error details
    res.status(500).json({ message: 'Error fetching collections' });
  }
});

// Get all documents in a specific collection of a database
app.get('/api/collections/:databaseName/:collectionName', async (req, res) => {
  const { databaseName, collectionName } = req.params;
  try {
    const database = mongoose.connection.useDb(databaseName); // Use the correct database dynamically
    const collection = database.collection(collectionName);
    const documents = await collection.find({}, { projection: { _id: 0 } }).toArray(); // Exclude _id field
    res.json(documents);
  } catch (error) {
    console.error('Error fetching documents:', error); // Log error details
    res.status(500).json({ message: 'Error fetching documents' });
  }
});

// Update a document by ID
app.put('/api/collections/:databaseName/:collectionName/:id', async (req, res) => {
  const { databaseName, collectionName, id } = req.params;
  const updateData = req.body;

  try {
    const database = mongoose.connection.useDb(databaseName); // Use the correct database dynamically
    const collection = database.collection(collectionName);
    const updatedDocument = await collection.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      { $set: updateData },
      { returnOriginal: false } // Return the updated document
    );

    if (updatedDocument.value) {
      res.json(updatedDocument.value);
    } else {
      res.status(404).json({ message: 'Document not found' });
    }
  } catch (error) {
    console.error('Error updating document:', error); // Log error details
    res.status(500).json({ message: 'Error updating document' });
  }
});

// Delete a document by ID
app.delete('/api/collections/:databaseName/:collectionName/:id', async (req, res) => {
  const { databaseName, collectionName, id } = req.params;

  try {
    const database = mongoose.connection.useDb(databaseName); // Use the correct database dynamically
    const collection = database.collection(collectionName);
    const result = await collection.deleteOne({ _id: new mongoose.Types.ObjectId(id) });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'Document deleted successfully' });
    } else {
      res.status(404).json({ message: 'Document not found' });
    }
  } catch (error) {
    console.error('Error deleting document:', error); // Log error details
    res.status(500).json({ message: 'Error deleting document' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

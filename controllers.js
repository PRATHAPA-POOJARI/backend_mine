// controllers.js
const mongoose = require('mongoose');

// Authenticate User
const authenticateUser = (email, password) => {
  // Your logic for authenticating user
  // Return true if authenticated, otherwise false
};
// Get All Databases
const getAllDatabases = async (req, res) => {
  try {
    const admin = mongoose.connection.db.admin();
    const databases = await admin.listDatabases();

    // Define prefixes to exclude
    const excludedPrefixes = ['WSESS', 'WSESP'];
    const filteredDatabases = databases.databases
      .map((db) => db.name)
      .filter((dbName) => !excludedPrefixes.some((prefix) => dbName.startsWith(prefix)));

    res.json(filteredDatabases);
  } catch (error) {
    console.error('Error fetching databases:', error);
    res.status(500).json({ message: 'Error fetching databases' });
  }
};
// Get All Collections in a Specific Database
const getCollections = async (req, res) => {
  const { databaseName } = req.params;
  try {
    const database = mongoose.connection.useDb(databaseName);
    const collections = await database.db.listCollections().toArray();
    res.json(collections.map((col) => col.name));
  } catch (error) {
    console.error('Error fetching collections:', error);
    res.status(500).json({ message: 'Error fetching collections' });
  }
};
// Get All Documents in a Specific Collection of a Database
const getDocuments = async (req, res) => {
  const { databaseName, collectionName } = req.params;
  try {
    const database = mongoose.connection.useDb(databaseName);
    const collection = database.collection(collectionName);
    const documents = await collection.find({}, { projection: { _id: 0 } }).toArray();
    res.json(documents);
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ message: 'Error fetching documents' });
  }
};
// Update a Document by ID
const updateDocument = async (req, res) => {
    const { databaseName, collectionName, id } = req.params;
    const updateData = req.body;
    try {
      // Validate ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid document ID' });
      }

      // Use the specified database and collection
      const database = mongoose.connection.useDb(databaseName);
      const collection = database.collection(collectionName);
  
      // Update the document and return the new document
      const updatedDocument = await collection.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(id) },
        { $set: updateData },
        { returnDocument: 'after' } // Correct option for returning the updated document
      );

      // Check if the document was found and updated
      if (updatedDocument.value) {
        res.json(updatedDocument.value); // Return the updated document
      } else {
        res.status(404).json({ message: 'Document not found' });
      }
    } catch (error) {
      console.error('Error updating document:', error.message); // Improved error logging
      res.status(500).json({ message: 'Error updating document', error: error.message }); // Include error details for debugging
    }
  };
  

// Delete a Document by ID
const deleteDocument = async (req, res) => {
    const { databaseName, collectionName, id } = req.params;
    console.log('Attempting to delete document with ID:', id); // Debugging
    try {
      const database = mongoose.connection.useDb(databaseName);
      const collection = database.collection(collectionName);
      const result = await collection.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
      console.log('Delete result:', result); // Debugging
  
      if (result.deletedCount === 1) {
        res.status(200).json({ message: 'Document deleted successfully' });
      } else {
        res.status(404).json({ message: 'Document not found' });
      }
    } catch (error) {
      console.error('Error deleting document:', error);
      res.status(500).json({ message: 'Error deleting document' });
    }
  };
  
module.exports = {
  authenticateUser,
  getAllDatabases,
  getCollections,
  getDocuments,
  updateDocument,
  deleteDocument,
};

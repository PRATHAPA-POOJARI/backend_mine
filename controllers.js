const mongoose = require('mongoose');

// Authenticate User
const authenticateUser = (email, password) => {
  // Implement user authentication logic here
  // Example: Check against a user database
  // For simplicity, this is a stub
  return email === 'admin@example.com' && password === 'password';
};

// Get All Databases
module.exports.getAllDatabases = async (req, res) => {
  try {
    const admin = mongoose.connection.db.admin();
    const databases = await admin.listDatabases();
    const excludedPrefixes = ['WSESS', 'WSESP'];
    const filteredDatabases = databases.databases
      .map((db) => db.name)
      .filter((dbName) => !excludedPrefixes.some((prefix) => dbName.startsWith(prefix)));

    res.json(filteredDatabases);
  } catch (error) {
    console.error('Error fetching databases:', error);
    res.status(500).json({ message: 'Error fetching databases', error: error.message });
  }
};

// Get All Collections in a Specific Database
module.exports.getCollections = async (req, res) => {
  const { databaseName } = req.params;
  try {
    if (!databaseName) {
      return res.status(400).json({ message: 'Database name is required' });
    }

    const database = mongoose.connection.useDb(databaseName);
    const collections = await database.db.listCollections().toArray();
    res.json(collections.map((col) => col.name));
  } catch (error) {
    console.error('Error fetching collections:', error);
    res.status(500).json({ message: 'Error fetching collections', error: error.message });
  }
};

// Get All Documents in a Specific Collection of a Database
module.exports.getDocuments = async (req, res) => {
  const { databaseName, collectionName } = req.params;
  try {
    if (!databaseName || !collectionName) {
      return res.status(400).json({ message: 'Database and collection names are required' });
    }

    const database = mongoose.connection.useDb(databaseName);
    const collection = database.collection(collectionName);
    const documents = await collection.find({}, { projection: { _id: 0 } }).toArray();
    res.json(documents);
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ message: 'Error fetching documents', error: error.message });
  }
};

// Update a Document by ID
module.exports.updateDocument = async (req, res) => {
  const { databaseName, collectionName, id } = req.params;
  const updateData = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid document ID' });
    }

    const database = mongoose.connection.useDb(databaseName);
    const collection = database.collection(collectionName);
    const result = await collection.updateOne(
      { _id: new mongoose.Types.ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount > 0) {
      const updatedDocument = await collection.findOne({ _id: new mongoose.Types.ObjectId(id) });
      res.json(updatedDocument);
    } else {
      res.status(404).json({ message: 'Document not found' });
    }
  } catch (error) {
    console.error('Error updating document:', error.message);
    res.status(500).json({ message: 'Error updating document', error: error.message });
  }
};

// Delete a Document by ID
module.exports.deleteDocument = async (req, res) => {
  const { databaseName, collectionName, id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid document ID' });
    }

    const database = mongoose.connection.useDb(databaseName);
    const collection = database.collection(collectionName);
    const result = await collection.deleteOne({ _id: new mongoose.Types.ObjectId(id) });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'Document deleted successfully' });
    } else {
      res.status(404).json({ message: 'Document not found' });
    }
  } catch (error) {
    console.error('Error deleting document:', error.message);
    res.status(500).json({ message: 'Error deleting document', error: error.message });
  }
};

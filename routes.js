// routes.js
const express = require('express');
const router = express.Router();
const {
  getAllDatabases,
  getCollections,
  getDocuments,
  updateDocument,
  deleteDocument,
} = require('./controllers');

// Get all database names
router.get('/databases', getAllDatabases);

// Get all collections in a specific database
router.get('/collections/:databaseName', getCollections);

// Get all documents in a specific collection of a database
router.get('/collections/:databaseName/:collectionName', getDocuments);

// Update a document by ID
router.put('/collections/:databaseName/:collectionName/:id', updateDocument);

// Delete a document by ID
router.delete('/collections/:databaseName/:collectionName/:id', deleteDocument);

module.exports = router;

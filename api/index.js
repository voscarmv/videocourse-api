const express = require('express');
const cors = require('cors');
const db = require('./db');
const dotenv = require('dotenv');
const Hashids = require('hashids/cjs');

dotenv.config();

const app = express();
const port = process.env.port || 3000;
const key = process.env.key;
const salt = process.env.salt;
// const frontend_origin = process.env.frontend_origin;

function keyVerify(req, res, next) {
  const keys = req.headers['authorization']?.replace('Bearer ', '');
  if (!keys) {
    return res.status(401).json({ message: 'No key found in headers. ' });
  }
  if (keys !== key) {
    return res.status(401).json({ message: 'Wrong key. ' });
  }
  next();
}

function hashVerify(req, res, next) {
  const id = req.params.id;
  const hashids = new Hashids(salt, 5, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890');
  const key = req.headers['authorization']?.replace('Bearer ', '');
  const keyver = hashids.encode(id);
  if (!key) {
    return res.status(401).json({ message: 'No key found in headers. ' });
  }
  if (key !== keyver) {
    return res.status(401).json({ message: 'Wrong key. ' });
  }
  next();
}

app.use(cors({
  // origin: [frontend_origin],
  origin: [], // Accept all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  credentials: true,
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());

app.get('/items', keyVerify, async (req, res) => {
  const items = await db.getAllItems();
  res.json({ message: 'GET all items', keyUsed: key, items });
});

app.post('/items', keyVerify, async (req, res) => {
  const response = await db.insertItem(req.body);
  res.json({ message: 'POST new item', dataReceived: req.body, response });
});

app.get('/items/:id', hashVerify, async (req, res) => {
  const item = await db.getItem(req.params.id);
  res.json({ message: `GET item with id ${req.params.id}`, item });
});

app.put('/items/:id', keyVerify, (req, res) => {
  res.json({ message: `PUT update item with id ${req.params.id}`, dataReceived: req.body });
});

app.delete('/items/:id', hashVerify, (req, res) => {
  res.json({ message: `DELETE item with id ${req.params.id}` });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
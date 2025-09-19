const express = require('express');
const cors = require('cors');
const auth = require('./auth');
const db = require('./db');
const dotenv = require('dotenv');
// const Hashids = require('hashids/cjs');

dotenv.config();

const app = express();
const port = process.env.port || 3000;
// const key = process.env.key;
// const salt = process.env.salt;
// const frontend_origin = process.env.frontend_origin;

// function keyVerify(req, res, next) {
//   const keys = req.headers['authorization']?.replace('Bearer ', '');
//   if (!keys) {
//     return res.status(401).json({ message: 'No key found in headers. ' });
//   }
//   if (keys !== key) {
//     return res.status(401).json({ message: 'Wrong key. ' });
//   }
//   next();
// }

// function hashVerify(req, res, next) {
//   const id = req.params.id;
//   const hashids = new Hashids(salt, 5, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890');
//   const key = req.headers['authorization']?.replace('Bearer ', '');
//   const keyver = hashids.encode(id);
//   if (!key) {
//     return res.status(401).json({ message: 'No key found in headers. ' });
//   }
//   if (key !== keyver) {
//     return res.status(401).json({ message: 'Wrong key. ' });
//   }
//   next();
// }

app.use(cors({
  // origin: [frontend_origin],
  origin: [], // Accept all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  credentials: true,
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());

app.post('/content', auth.keyVerify, async (req, res) => {
  const data = await db.createContent(req.body);
  res.json({ message: 'POST new content', data });
});

app.post('/section', auth.keyVerify, async (req, res) => {
  await db.createSection(req.body);
  res.json({ message: 'POST new section', dataReceived: req.body });
});

app.post('/accesskey', auth.keyVerify, async (req, res) => {
  const data = await db.createAccessKey(req.body);
  const id = data[0].id;
  const update = await db.updateAccessKey(id, {key: auth.makeHash(id)});
  res.json({ message: 'POST new access key', update });
});

app.get('/content/:id', auth.hashVerify, async (req, res) => {
  const id = req.params.id
  const content = await db.readContent(id);
  const sections = await db.readSection(id);
  res.json({ message: 'GET content with its sections', content, sections });
});

// app.get('/items/:id', auth.hashVerify, async (req, res) => {
//   const item = await db.getItem(req.params.id);
//   res.json({ message: `GET item with id ${req.params.id}`, item });
// });

// app.put('/items/:id', auth.keyVerify, (req, res) => {
//   res.json({ message: `PUT update item with id ${req.params.id}`, dataReceived: req.body });
// });

// app.delete('/items/:id', auth.hashVerify, (req, res) => {
//   res.json({ message: `DELETE item with id ${req.params.id}` });
// });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
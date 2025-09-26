const express = require('express');
const cors = require('cors');
const auth = require('./auth');
const db = require('./db');
const dotenv = require('dotenv');
// const Hashids = require('hashids/cjs');

dotenv.config();

const app = express();
const port = process.env.port || 3000;

app.use(cors({
  // origin: ['http://localhost:5173'],
  // origin: [frontend_origin],
  // origin: [], // Accept all origins
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
// app.use(cors());
app.use(express.json());

app.post('/content', auth.keyVerify, async (req, res) => {
  const data = await db.createContent(req.body);
  res.json({ message: 'POST new content', data });
});
app.get('/content/:id', auth.hashVerify, async (req, res) => {
  const id = req.params.id
  const content = await db.readContent(id);
  const sections = await db.readSection(id);
  res.json({ message: 'GET content with its sections', content, sections });
});
app.put('/content/:id', auth.keyVerify, async (req, res) =>{
  const update = await db.updateContent(req.params.id, req.body);
  res.json({ message: `PUT content on ${req.params.id}`, update});
});
app.delete('/content/:id', auth.keyVerify, async (req, res) => {
  const del = await db.deleteContent(req.params.id);
  res.json({ message: `DELETE content ${req.params.id}`, del });
});

app.post('/section', auth.keyVerify, async (req, res) => {
  await db.createSection(req.body);
  res.json({ message: 'POST new section', dataReceived: req.body });
});
app.put('/section/:id', auth.keyVerify, async (req, res) =>{
  const update = await db.updateSection(req.params.id, req.body);
  res.json({ message: `PUT section on ${req.params.id}`, update});
});
app.delete('/section/:id', auth.keyVerify, async (req, res) => {
  const del = await db.deleteSection(req.params.id);
  res.json({ message: `DELETE section ${req.params.id}`, del });
});

app.post('/accesskey', auth.keyVerify, async (req, res) => {
  const data = await db.createAccessKey(req.body);
  const id = data[0].id;
  const update = await db.updateAccessKey(id, {key: auth.makeHash(id)});
  res.json({ message: 'POST new access key', key: update[0].key });
});
app.delete('/accesskey/:id', auth.keyVerify, async (req, res) => {
  const del = await db.deleteAccesKey(req.params.id);
  res.json({ message: `DELETE access key ${req.params.id}`, del });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
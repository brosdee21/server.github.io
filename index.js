const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Job = require('./models/Jobs');

dotenv.config();
const app = express();

const corsOption ={
  origin:"*",methods:['POST'],
}
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'));

app.get('/api/jobs', async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});

app.post('/api/jobs', async (req, res) => {
  const newJob = await Job.create(req.body);
  res.json(newJob);
});

app.put('/api/jobs/:id', async (req, res) => {
  const updatedJob = await Job.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  res.json(updatedJob);
});

app.delete('/api/jobs/:id', async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  res.json({ message: 'Job deleted' });
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
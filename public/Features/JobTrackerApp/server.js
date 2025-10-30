// server.js
const fs = require('fs');
const express = require('express');
//const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'jobs.json');

// In-memory job storage
class JobList {
  constructor() {
    this.jobs = [];
    this.loadJobs();
  }

  loadJobs() {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        this.jobs = JSON.parse(data);
        console.log(`📂 Loaded ${this.jobs.length} jobs from jobs.json`);
      } else {
        console.log('🆕 No jobs.json found — starting fresh.');
      }
    } catch (err) {
      console.error('❌ Error loading jobs.json:', err);
      this.jobs = [];
    }
  }

  saveJobs() {
    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(this.jobs, null, 2), 'utf8');
      console.log('💾 Jobs saved.');
    } catch (err) {
      console.error('❌ Error saving jobs.json:', err);
    }
  }

  addJob(company, position, status = 'Applied', tags = []) {
    const newJob = {
      id: Date.now(),
      company,
      position,
      status,
      tags,
    };
    this.jobs.push(newJob);
    this.saveJobs();
    return newJob;
  }

  getAllJobs() {
    return this.jobs;
  }

  removeJob(id) {
    this.jobs = this.jobs.filter(job => job.id !== id);
    this.saveJobs();
  }

  updateJob(id, updatedFields) {
    const job = this.jobs.find(job => job.id === id);
    if (job) {
      Object.assign(job, updatedFields);
      this.saveJobs();
    }
    return job;
  }
}

const jobList = new JobList(); // ✅ instance name fixed

// Middleware
//app.use(bodyParser.json());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.get('/api/jobs', (req, res) => {
  res.json(jobList.getAllJobs());
});

app.post('/api/jobs', (req, res) => {
  const { company, position, status, tags } = req.body;
  const newJob = jobList.addJob(company, position, status, tags);
  res.status(201).json(newJob);
});

app.patch('/api/jobs/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updated = jobList.updateJob(id, req.body);
  if (!updated) {
    return res.status(404).json({ message: 'Job not found' });
  }
  res.json(updated);
});

app.delete('/api/jobs/:id', (req, res) => {
  const id = parseInt(req.params.id);
  jobList.removeJob(id);
  res.status(204).end();
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

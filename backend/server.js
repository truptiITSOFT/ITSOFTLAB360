const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize SQLite database
const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to SQLite database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
    
    // Create tables if they don't exist
    db.run(`CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT,
      message TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS demo_requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT NOT NULL,
      company TEXT NOT NULL,
      phone TEXT,
      goals TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS chat_leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      company TEXT NOT NULL,
      industry TEXT,
      phone TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'Backend is running' });
});

// Chatbot Mock API
app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) return res.status(400).json({ error: "Messages array required" });
  
  // NOTE: TO CONNECT OPENAI, replace this mock logic with the openai sdk call here.
  const lastMessage = messages[messages.length - 1].content.toLowerCase();
  let reply = "I can certainly help you with that. Our IT SOFTLAB 360 suite has 12 solutions to optimize your business operations.";

  if (lastMessage.includes("hrms") || lastMessage.includes("hr")) {
    reply = "Our HRMS Solution manages your entire employee lifecycle, from recruitment and attendance to payroll and performance management.";
  } else if (lastMessage.includes("crm")) {
    reply = "Our Smart CRM tracks leads, automates marketing campaigns, and helps close deals faster with complete visibility.";
  } else if (lastMessage.includes("erp")) {
    reply = "Our Enterprise ERP Suite is a comprehensive solution that connects finance, supply chain, and operations into one unified platform.";
  } else if (lastMessage.includes("pos")) {
    reply = "Our POS Solution provides fast billing, inventory management, and effortless customer transactions for retail and restaurants.";
  }

  // Simulate network delay
  setTimeout(() => {
    res.json({ success: true, reply });
  }, 1000);
});

// Chatbot Lead Capture
app.post('/api/chat-lead', (req, res) => {
  const { name, email, company, industry, phone } = req.body;
  const query = `INSERT INTO chat_leads (name, email, company, industry, phone) VALUES (?, ?, ?, ?, ?)`;
  db.run(query, [name, email, company, industry, phone], function (err) {
    if (err) return res.status(500).json({ error: 'Failed to save chat lead.' });
    res.status(201).json({ success: true, id: this.lastID });
  });
});

// Admin Route to fetch leads
app.get('/api/admin/leads', (req, res) => {
  db.all(`SELECT * FROM chat_leads ORDER BY created_at DESC`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST endpoint for Contact Form
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  const query = `INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)`;
  db.run(query, [name, email, subject, message], function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to save contact message.' });
    }
    res.status(201).json({ success: true, id: this.lastID, message: 'Message sent successfully!' });
  });
});

// POST endpoint for Demo Request Form
app.post('/api/demo', (req, res) => {
  const { firstName, lastName, email, company, phone, goals } = req.body;

  if (!firstName || !lastName || !email || !company) {
    return res.status(400).json({ error: 'First name, last name, email, and company are required.' });
  }

  const query = `INSERT INTO demo_requests (first_name, last_name, email, company, phone, goals) VALUES (?, ?, ?, ?, ?, ?)`;
  db.run(query, [firstName, lastName, email, company, phone, goals], function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to save demo request.' });
    }
    res.status(201).json({ success: true, id: this.lastID, message: 'Demo request received!' });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

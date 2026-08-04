const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'itsoftlab360_secret_key_123';

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

    // Create users table for auth
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      reset_token TEXT,
      reset_token_expiry DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
      if (!err) {
        // Seed default admin
        db.get(`SELECT * FROM users WHERE email = ?`, ['admin@itsoftlab360.com'], async (err, row) => {
          if (!err && !row) {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash('password123', salt);
            db.run(`INSERT INTO users (email, password_hash) VALUES (?, ?)`, ['admin@itsoftlab360.com', hash]);
            console.log('Default admin user seeded: admin@itsoftlab360.com / password123');
          }
        });
      }
    });
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

// --- AUTHENTICATION ROUTES ---

// Login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });

  db.get(`SELECT * FROM users WHERE email = ?`, [email.toLowerCase()], async (err, user) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!user) return res.status(401).json({ error: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(401).json({ error: 'Invalid email or password' });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ success: true, token, email: user.email });
  });
});

// Forgot Password
app.post('/api/auth/forgot-password', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  db.get(`SELECT * FROM users WHERE email = ?`, [email.toLowerCase()], (err, user) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!user) {
      // Simulate success even if email not found for security
      return res.json({ success: true, message: 'If the email exists, a reset link has been sent.' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const expiry = new Date(Date.now() + 3600000).toISOString(); // 1 hour from now

    db.run(`UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE id = ?`, [resetToken, expiry, user.id], (err) => {
      if (err) return res.status(500).json({ error: 'Failed to generate reset token' });
      
      // In a real app, send email here. For now, return token in response for simulation.
      res.json({ 
        success: true, 
        message: 'Reset token generated (simulation).',
        _simulatedToken: resetToken // Only doing this so the user can test the flow!
      });
    });
  });
});

// Reset Password
app.post('/api/auth/reset-password', (req, res) => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword) return res.status(400).json({ error: 'Token and new password are required' });

  db.get(`SELECT * FROM users WHERE reset_token = ? AND reset_token_expiry > ?`, [token, new Date().toISOString()], async (err, user) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!user) return res.status(400).json({ error: 'Invalid or expired reset token' });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);

    db.run(`UPDATE users SET password_hash = ?, reset_token = NULL, reset_token_expiry = NULL WHERE id = ?`, [hash, user.id], (err) => {
      if (err) return res.status(500).json({ error: 'Failed to reset password' });
      res.json({ success: true, message: 'Password reset successful' });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

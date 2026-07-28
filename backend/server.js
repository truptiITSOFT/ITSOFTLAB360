const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'Backend is running' });
});

// Mock endpoint for solutions (if needed later)
app.get('/api/solutions', (req, res) => {
  res.status(200).json([
    { id: 1, title: 'HRMS', description: 'Streamline HR operations, employee management, payroll & more.' },
    { id: 2, title: 'CRM', description: 'Build stronger relationships and grow your business smarter.' },
    // ... add more as needed
  ]);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

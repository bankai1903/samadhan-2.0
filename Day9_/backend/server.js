// server.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let students = [
  { id: 1, name: 'Aarav Sharma', email: 'aarav.sharma@example.com', course: 'Computer Science', year: 2024 },
  { id: 2, name: 'Priya Verma', email: 'priya.verma@example.com', course: 'Mathematics', year: 2023 },
  { id: 3, name: 'Rohan Mehta', email: 'rohan.mehta@example.com', course: 'Physics', year: 2025 },
  { id: 4, name: 'Sneha Iyer', email: 'sneha.iyer@example.com', course: 'Electronics', year: 2024 },
  { id: 5, name: 'Aditya Rao', email: 'aditya.rao@example.com', course: 'Mechanical Engineering', year: 2022 },
  { id: 6, name: 'Kavya Nair', email: 'kavya.nair@example.com', course: 'Biotechnology', year: 2025 },
  { id: 7, name: 'Vikram Singh', email: 'vikram.singh@example.com', course: 'Civil Engineering', year: 2023 },
  { id: 8, name: 'Ananya Gupta', email: 'ananya.gupta@example.com', course: 'Commerce', year: 2024 },
  { id: 9, name: 'Rahul Choudhary', email: 'rahul.choudhary@example.com', course: 'Law', year: 2025 },
  { id: 10, name: 'Meera Joshi', email: 'meera.joshi@example.com', course: 'English Literature', year: 2022 }
];

app.get('/api/students', (req, res) => {
  res.json(students);
});

app.post('/api/students', (req, res) => {
  const newStudent = { id: Date.now(), ...req.body };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

app.put('/api/students/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = students.findIndex(s => s.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Student not found' });
  students[idx] = { ...students[idx], ...req.body };
  res.json(students[idx]);
});

app.delete('/api/students/:id', (req, res) => {
  const id = Number(req.params.id);
  students = students.filter(s => s.id !== id);
  res.json({ success: true });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`✅ Backend running at http://localhost:${PORT}`));

console.log("Сервер запускається...");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3001;

// Підключення до бази (файл створиться автоматично)
const db = new sqlite3.Database('appointments.db');

app.use(cors());
app.use(bodyParser.json());

// Створення таблиці, якщо її ще немає
db.run(`CREATE TABLE IF NOT EXISTS appointments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  phone TEXT,
  email TEXT,
  comment TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

// Додати заявку (CREATE)
app.post('/appointments', (req, res) => {
  const { name, phone, email, comment } = req.body;
  db.run(
    `INSERT INTO appointments (name, phone, email, comment) VALUES (?, ?, ?, ?)`,
    [name, phone, email, comment],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ status: 'ok', id: this.lastID });
    }
  );
});

// Отримати всі заявки (READ)
app.get('/appointments', (req, res) => {
  db.all(`SELECT * FROM appointments ORDER BY created_at DESC`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Оновити заявку (UPDATE)
app.put('/appointments/:id', (req, res) => {
  const { name, phone, email, comment } = req.body;
  db.run(
    `UPDATE appointments SET name=?, phone=?, email=?, comment=? WHERE id=?`,
    [name, phone, email, comment, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ status: 'updated' });
    }
  );
});

// Видалити заявку (DELETE)
app.delete('/appointments/:id', (req, res) => {
  db.run(`DELETE FROM appointments WHERE id=?`, [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ status: 'deleted' });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
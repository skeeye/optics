const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('appointments.db');

const services = [
  "Комп’ютерна діагностика зору",
  "Підбір окулярів та контактних лінз",
  "Консультації офтальмолога",
  "Лікування короткозорості, далекозорості, астигматизму",
  "Профілактика захворювань очей"
];

services.forEach(name => {
  db.run(`INSERT INTO services (name) VALUES (?)`, [name], function(err) {
    if (err) console.log(err.message);
    else console.log(`Додано: ${name}`);
  });
});

db.close();
app.get('/services', (req, res) => {
  db.all(`SELECT * FROM services`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});
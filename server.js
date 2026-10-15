const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();

app.use(cors()); // wajib karena Flutter Web berjalan di Chrome
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API Dapur berjalan', database: 'MySQL' });
});

app.use('/api/resep', require('./routes/resep'));
app.use('/api/koleksi', require('./routes/koleksi'));
app.use('/api/notifikasi', require('./routes/notifikasi'));
app.use('/api/profil', require('./routes/profil'));

// Penanganan error umum (misalnya MySQL mati)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Terjadi kesalahan pada server', detail: err.message });
});

db.initDb()
  .then(() => {
    app.listen(3000, () => console.log('API jalan di http://localhost:3000'));
  })
  .catch((err) => {
    console.error('Gagal terhubung ke MySQL. Pastikan MySQL di XAMPP sudah Start.');
    console.error(err.message);
    process.exit(1);
  });
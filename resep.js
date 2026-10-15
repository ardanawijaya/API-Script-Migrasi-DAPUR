const router = require('express').Router();
const db = require('../db');

// GET semua resep (layar Beranda)
router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM resep');
  res.json(rows.map(db.formatResep));
});

// GET populer, urut views (layar Populer). Harus sebelum '/:id'
router.get('/popular', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM resep ORDER BY views DESC LIMIT 4');
  res.json(rows.map(db.formatResep));
});

// GET detail satu resep (layar Detail)
router.get('/:id', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM resep WHERE id_resep = ?', [req.params.id]);
  if (rows.length === 0) {
    return res.status(404).json({ message: 'Resep tidak ditemukan' });
  }
  res.json(db.formatResep(rows[0]));
});

// POST resep baru (layar Upload)
router.post('/', async (req, res) => {
  const { judul, gambar, durasi, bahan, langkah } = req.body;
  if (!judul) {
    return res.status(400).json({ message: 'Judul resep wajib diisi' });
  }
  const [result] = await db.query(
    'INSERT INTO resep (judul, gambar, durasi, bahan, langkah) VALUES (?, ?, ?, ?, ?)',
    [judul, gambar || null, durasi || null, JSON.stringify(bahan || []), JSON.stringify(langkah || [])]
  );
  res.status(201).json({ id: result.insertId, message: 'Resep dibuat' });
});

module.exports = router;
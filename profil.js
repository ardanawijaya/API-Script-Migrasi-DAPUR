const router = require('express').Router();
const db = require('../db');

// GET profil (pengguna tetap id = 1) beserta daftar resep (layar Profile)
router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM profil WHERE id_profil = 1');
  if (rows.length === 0) {
    return res.status(404).json({ message: 'Profil tidak ditemukan' });
  }
  const [resep] = await db.query('SELECT * FROM resep');
  res.json({ ...rows[0], resep: resep.map(db.formatResep) });
});

module.exports = router;
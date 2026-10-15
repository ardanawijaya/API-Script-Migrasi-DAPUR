const router = require('express').Router();
const db = require('../db');

// GET semua notifikasi, terbaru dulu (layar Notifikasi)
router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM notifikasi ORDER BY dibuat_pada DESC, id_notifikasi DESC');
  res.json(rows);
});

module.exports = router;
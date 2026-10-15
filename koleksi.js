const router = require('express').Router();
const db = require('../db');

// GET semua resep tersimpan (layar Koleksi)
router.get('/', async (req, res) => {
  const [rows] = await db.query(`
    SELECT r.* FROM koleksi k
    JOIN resep r ON r.id_resep = k.resep_id
  `);
  res.json(rows.map(db.formatResep));
});

// POST simpan resep ke koleksi
router.post('/', async (req, res) => {
  const { resep_id } = req.body;
  if (!resep_id) {
    return res.status(400).json({ message: 'resep_id wajib diisi' });
  }
  try {
    await db.query('INSERT INTO koleksi (resep_id) VALUES (?)', [resep_id]);
    res.status(201).json({ message: 'Resep disimpan ke koleksi' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Resep sudah ada di koleksi' });
    }
    if (err.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(404).json({ message: 'Resep tidak ditemukan' });
    }
    throw err;
  }
});

// DELETE hapus dari koleksi
router.delete('/:resepId', async (req, res) => {
  await db.query('DELETE FROM koleksi WHERE resep_id = ?', [req.params.resepId]);
  res.json({ message: 'Resep dihapus dari koleksi' });
});

module.exports = router;
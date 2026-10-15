const mysql = require('mysql2/promise');

// Pengaturan default XAMPP: user "root", password kosong, port 3306
const config = {
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: '',
  database: 'dapur',
};

const pool = mysql.createPool({
  ...config,
  waitForConnections: true,
  connectionLimit: 10,
  charset: 'utf8mb4',
});

// Membuat database + tabel kalau belum ada
pool.initDb = async () => {
  const { database, ...tanpaDatabase } = config;
  const conn = await mysql.createConnection(tanpaDatabase);
  await conn.query(
    `CREATE DATABASE IF NOT EXISTS \`${database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci`
  );
  await conn.end();

  await pool.query(`
    CREATE TABLE IF NOT EXISTS resep (
      id_resep INT AUTO_INCREMENT PRIMARY KEY,
      judul VARCHAR(150) NOT NULL,
      gambar VARCHAR(255),
      durasi VARCHAR(50),
      rating FLOAT DEFAULT 0,
      views INT DEFAULT 0,
      bahan LONGTEXT,    -- disimpan sebagai teks JSON
      langkah LONGTEXT   -- disimpan sebagai teks JSON
    )
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS koleksi (
      id_koleksi INT AUTO_INCREMENT PRIMARY KEY,
      resep_id INT NOT NULL UNIQUE,
      FOREIGN KEY (resep_id) REFERENCES resep(id_resep) ON DELETE CASCADE
    )
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS notifikasi (
      id_notifikasi INT AUTO_INCREMENT PRIMARY KEY,
      pesan VARCHAR(255) NOT NULL,
      dibuat_pada TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS profil (
      id_profil INT PRIMARY KEY,
      nama VARCHAR(100) NOT NULL,
      email VARCHAR(100),
      bio VARCHAR(255),
      avatar VARCHAR(255)
    )
  `);
};

// Ubah kolom bahan & langkah dari teks JSON menjadi array
pool.formatResep = (row) => ({
  ...row,
  bahan: JSON.parse(row.bahan || '[]'),
  langkah: JSON.parse(row.langkah || '[]'),
});

module.exports = pool;
const db = require('./db');

const resep = [
  // Resep untuk Beranda (id 1-4)
  { judul: 'Nasi Goreng Kampung', gambar: 'NasiGorengKampung.jpg', durasi: '25 menit', rating: 4.7, views: 1200,
    bahan: ['2 piring nasi putih', '3 siung bawang putih', '4 siung bawang merah', '3 buah cabai rawit', '2 butir telur', '2 sdm kecap manis', 'Garam dan merica secukupnya'],
    langkah: ['Haluskan bawang putih, bawang merah, dan cabai.', 'Tumis bumbu halus hingga harum.', 'Masukkan telur, orak-arik hingga matang.', 'Tambahkan nasi putih, aduk rata.', 'Beri kecap manis, garam, dan merica.', 'Aduk hingga matang, sajikan selagi hangat.'] },
  { judul: 'Sop Ayam Bening', gambar: 'SopAyamBening.jpg', durasi: '40 menit', rating: 4.6, views: 950,
    bahan: ['500 gr ayam potong', '2 buah wortel', '2 buah kentang', '1 batang daun bawang', '4 siung bawang putih', '1 liter air', 'Garam dan merica secukupnya'],
    langkah: ['Rebus ayam hingga empuk, buang busanya.', 'Tumis bawang putih hingga harum, masukkan ke rebusan.', 'Masukkan kentang dan wortel, masak hingga empuk.', 'Beri garam dan merica.', 'Tambahkan daun bawang, angkat dan sajikan.'] },
  { judul: 'Ayam Kecap Mentega', gambar: 'AyamKecapMentega.jpg', durasi: '35 menit', rating: 4.8, views: 1100,
    bahan: ['500 gr ayam potong', '3 sdm mentega', '4 sdm kecap manis', '4 siung bawang putih', '1 buah bawang bombay', 'Garam dan merica secukupnya'],
    langkah: ['Lumuri ayam dengan garam dan merica, diamkan 10 menit.', 'Goreng ayam hingga kecokelatan, tiriskan.', 'Tumis bawang putih dan bawang bombay dengan mentega.', 'Masukkan ayam dan kecap manis.', 'Masak hingga bumbu meresap dan mengental.'] },
  { judul: 'Bakwan Sayur', gambar: 'BakwanSayur.jpg', durasi: '30 menit', rating: 4.5, views: 800,
    bahan: ['150 gr tepung terigu', '100 gr kol iris', '1 buah wortel parut', '2 batang daun bawang', '2 siung bawang putih', '200 ml air', 'Garam dan kaldu bubuk secukupnya'],
    langkah: ['Campur tepung, air, bawang putih halus, garam, dan kaldu bubuk.', 'Masukkan kol, wortel, dan daun bawang, aduk rata.', 'Panaskan minyak yang banyak.', 'Goreng adonan per sendok hingga keemasan.', 'Angkat dan tiriskan.'] },

  // Resep untuk Populer (id 5-8), views paling tinggi
  { judul: 'Ayam Goreng Bawang Putih', gambar: 'AyamGorengBawangPutih.jpg', durasi: '45 menit', rating: 4.9, views: 5400,
    bahan: ['500 gr ayam potong', '8 siung bawang putih', '1 sdt ketumbar bubuk', '1 ruas kunyit', '300 ml air', 'Garam secukupnya', 'Minyak untuk menggoreng'],
    langkah: ['Haluskan bawang putih, kunyit, dan ketumbar.', 'Ungkep ayam bersama bumbu halus dan air hingga meresap.', 'Angkat ayam, tiriskan.', 'Goreng ayam hingga kecokelatan.', 'Sajikan dengan bawang putih goreng di atasnya.'] },
  { judul: 'Bala-Bala', gambar: 'BalaBala.jpg', durasi: '25 menit', rating: 4.8, views: 4600,
    bahan: ['200 gr tepung terigu', '2 sdm tepung beras', '150 gr kol iris', '1 buah wortel', '2 batang daun bawang', '2 siung bawang putih', 'Garam dan kaldu bubuk secukupnya'],
    langkah: ['Campur semua tepung dengan air hingga adonan kental.', 'Masukkan sayuran dan bumbu, aduk rata.', 'Panaskan minyak.', 'Goreng sesendok demi sesendok hingga renyah.'] },
  { judul: 'Nasi Daun Jeruk', gambar: 'NasiDaunJeruk.jpg', durasi: '30 menit', rating: 4.7, views: 3900,
    bahan: ['2 gelas beras', '5 lembar daun jeruk', '2 batang serai', '3 siung bawang merah', '1 sdm minyak', '500 ml santan encer', 'Garam secukupnya'],
    langkah: ['Cuci beras, tiriskan.', 'Tumis bawang merah dan serai hingga harum.', 'Masukkan beras dan santan, tambahkan garam.', 'Masukkan daun jeruk, masak hingga santan terserap.', 'Kukus atau masak dalam rice cooker hingga matang.'] },
  { judul: 'Seblak Ceker', gambar: 'SeblakCeker.jpg', durasi: '40 menit', rating: 4.6, views: 3200,
    bahan: ['200 gr ceker ayam', '50 gr kerupuk mentah', '2 butir telur', '5 buah cabai rawit', '4 siung bawang putih', '1 ruas kencur', 'Garam dan kaldu bubuk secukupnya'],
    langkah: ['Rebus ceker hingga empuk.', 'Rendam kerupuk dalam air hangat hingga lunak.', 'Haluskan bawang putih, kencur, dan cabai, lalu tumis.', 'Masukkan telur, orak-arik.', 'Tambahkan ceker dan kerupuk beserta sedikit air rebusan.', 'Beri garam dan kaldu bubuk, masak hingga bumbu meresap.'] },
];

const notifikasi = [
  'Resep "Ayam Goreng Bawang Putih" masuk daftar resep populer minggu ini!',
  'Ada resep baru: "Seblak Ceker". Yuk coba sekarang.',
  'Resepmu telah dilihat lebih dari 100 kali.',
  'Jangan lupa simpan resep favoritmu ke Koleksi.',
];

// Pemakaian:
//   node seed.js           -> isi data awal HANYA jika tabel resep masih kosong
//   node seed.js --reset   -> hapus semua data lalu isi ulang dari nol
const reset = process.argv.includes('--reset');

(async () => {
  await db.initDb();

  if (!reset) {
    const [[{ jumlah }]] = await db.query('SELECT COUNT(*) AS jumlah FROM resep');
    if (jumlah > 0) {
      console.log(`Seed dilewati: tabel resep sudah berisi ${jumlah} data.`);
      console.log('Gunakan "node seed.js --reset" jika ingin menghapus semua data dan mengisi ulang.');
      await db.end();
      return;
    }
  }

  const conn = await db.getConnection();
  try {
    // kosongkan tabel (pada seed pertama sudah kosong, pada --reset menghapus data lama)
    await conn.query('SET FOREIGN_KEY_CHECKS = 0');
    for (const t of ['koleksi', 'notifikasi', 'profil', 'resep']) {
      await conn.query(`TRUNCATE TABLE ${t}`);
    }
    await conn.query('SET FOREIGN_KEY_CHECKS = 1');

    for (const r of resep) {
      await conn.query(
        'INSERT INTO resep (judul, gambar, durasi, rating, views, bahan, langkah) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [r.judul, r.gambar, r.durasi, r.rating, r.views, JSON.stringify(r.bahan), JSON.stringify(r.langkah)]
      );
    }

    for (const id of [1, 3, 5]) {
      await conn.query('INSERT INTO koleksi (resep_id) VALUES (?)', [id]);
    }
    for (const pesan of notifikasi) {
      await conn.query('INSERT INTO notifikasi (pesan) VALUES (?)', [pesan]);
    }

    await conn.query(
      'INSERT INTO profil (id_profil, nama, email, bio, avatar) VALUES (1, ?, ?, ?, ?)',
      ['Pengguna DapurKita', 'pengguna@dapurkita.com', 'Suka memasak masakan rumahan.', 'avatar.jpg']
    );

    console.log(`Seed selesai: ${resep.length} resep, 3 koleksi, ${notifikasi.length} notifikasi, 1 profil.`);
  } finally {
    conn.release();
    await db.end();
  }
})().catch((err) => {
  console.error('Seed gagal:', err.message);
  process.exit(1);
});
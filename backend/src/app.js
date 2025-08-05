// backend/src/app.js

const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database'); // Memuat koneksi database kita

const app = express();

// Middleware dasar
app.use(cors());
app.use(express.json());

// Halaman utama API
app.get('/api', (req, res) => {
    res.json({ message: 'Selamat datang di Naramakna API. Mesin menyala!' });
});

// Test koneksi database saat aplikasi start
sequelize.authenticate()
    .then(() => {
        console.log('✅ Koneksi ke database berhasil.');
    })
    .catch(err => {
        console.warn('⚠️  Database belum tersedia:', err.message);
        console.log('💡 Tip: Install MySQL atau jalankan docker-compose up -d untuk database');
    });

module.exports = app;
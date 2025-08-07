// backend/src/app.js

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const sequelize = require('./config/database'); // Memuat koneksi database kita
const models = require('./models'); // Load all models
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware dasar
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true // Allow cookies for authentication
}));
app.use(express.json());
app.use(cookieParser());

// Serve static files from project root public directory
app.use(express.static('../public'));

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const contentRoutes = require('./routes/content');
const approvalRoutes = require('./routes/approval');
const analyticsRoutes = require('./routes/analytics');
const adsRoutes = require('./routes/ads');
const tiktokRoutes = require('./routes/tiktok');

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/approval', approvalRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/ads', adsRoutes);
app.use('/api/tiktok', tiktokRoutes);

// Halaman utama API
app.get('/api', (req, res) => {
    res.json({ 
        message: 'Selamat datang di Naramakna API. Mesin menyala!',
        version: '1.0.0',
        endpoints: {
            content: '/api/content',
            analytics: '/api/analytics', 
            ads: '/api/ads'
        },
        features: [
            'Universal Content System (Articles, YouTube, TikTok)',
            'Advanced Analytics Tracking',
            'Advertisement Management',
            'Real-time Metrics',
            'Hybrid Database Architecture'
        ]
    });
});

// Global error handler (must be last)
app.use(errorHandler);

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
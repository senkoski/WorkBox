require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');

const authRoutes = require('./src/routes/auth.routes');
const userRoutes = require('./src/routes/user.routes');
const companyRoutes = require('./src/routes/company.routes');
const patrimonyRoutes = require('./src/routes/patrimony.routes');
const productRoutes = require('./src/routes/product.routes');
const stockRoutes = require('./src/routes/stock.routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://seu-frontend.com'] 
    : ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100 
});
app.use(limiter);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/patrimony', patrimonyRoutes);
app.use('/api/products', productRoutes);
app.use('/api/stock', stockRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Workbox API - Sistema de Gestão Patrimonial' });
});

app.listen(PORT, () => {
  console.log(` Workbox backend rodando em http://localhost:${PORT}`);
});
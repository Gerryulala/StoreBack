require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/products', productRoutes);

// Puerto (Render lo define en process.env.PORT)
const PORT = process.env.PORT || 3000;

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('✅ Conectado a MongoDB');
        app.listen(PORT, () => {
            const isProduction = process.env.NODE_ENV === 'production';
            const message = isProduction ?
                `🌐 Servidor desplegado en Render usando el puerto ${PORT}` :
                `🚀 Servidor corriendo en http://localhost:${PORT}`;
            console.log(message);
        });
    })
    .catch(err => {
        console.error('❌ Error al conectar MongoDB:', err);
    });
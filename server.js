require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/products', productRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('✅ Conectado a MongoDB');
        app.listen(process.env.PORT, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${process.env.PORT}`);
        });
    })
    .catch(err => {
        console.error('❌ Error al conectar MongoDB:', err);
    });
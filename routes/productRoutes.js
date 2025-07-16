const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET /products
router.get('/', async(req, res) => {
    const filter = {};

    // Filtro por nombre exacto
    if (req.query.name) {
        filter.name = req.query.name;
    }

    // Filtro por categoría
    if (req.query.category) {
        filter.category = req.query.category;
    }

    // Precio mínimo
    if (req.query.minPrice) {
        filter.price = {...filter.price, $gte: parseFloat(req.query.minPrice) };
    }

    // Precio máximo
    if (req.query.maxPrice) {
        filter.price = {...filter.price, $lte: parseFloat(req.query.maxPrice) };
    }

    try {
        const products = await Product.find(filter);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener productos' });
    }
});


// GET /products/:id
router.get('/:id', async(req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
        res.json(product);
    } catch {
        res.status(400).json({ error: 'ID inválido' });
    }
});

// POST /products
router.post('/', async(req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// PUT /products/:id
router.put('/:id', async(req, res) => {
    try {
        const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updated) return res.status(404).json({ error: 'Producto no encontrado' });
        res.json(updated);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE /products/:id
router.delete('/:id', async(req, res) => {
    try {
        const deleted = await Product.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Producto no encontrado' });
        res.json({ message: 'Producto eliminado' });
    } catch {
        res.status(400).json({ error: 'ID inválido' });
    }
});

module.exports = router;
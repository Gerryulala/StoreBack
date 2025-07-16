const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Filter = require('bad-words');
const filter = new Filter();

// GET /products
router.get('/', async(req, res) => {
    const query = {};
    if (req.query.name) query.name = req.query.name;
    if (req.query.category) query.category = req.query.category;
    if (req.query.minPrice) query.price = {...query.price, $gte: parseFloat(req.query.minPrice) };
    if (req.query.maxPrice) query.price = {...query.price, $lte: parseFloat(req.query.maxPrice) };

    try {
        const products = await Product.find(query);

        // Limpiar palabras ofensivas antes de enviar al frontend
        const cleaned = products.map(p => ({
            ...p._doc,
            name: filter.clean(p.name),
            category: filter.clean(p.category),
        }));
        res.json(cleaned);

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
        // Censura de texto
        if (req.body.name) req.body.name = filter.clean(req.body.name);
        if (req.body.category) req.body.category = filter.clean(req.body.category);

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
        // Censura de texto
        if (req.body.name) req.body.name = filter.clean(req.body.name);
        if (req.body.category) req.body.category = filter.clean(req.body.category);

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
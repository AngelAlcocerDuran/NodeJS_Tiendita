const exp = require('express');
const router = exp.Router();
const pool = require('../database.js');

router.get('/', async(req, res) => {
    let listProducts = await pool.query('SELECT * FROM products');
    res.json({
        status: 200,
        message: 'se ha consultado correctamente',
        listProducts: listProducts
    });
});

router.get('/:id', async(req, res) => {
    const {id} = req.params;

    let product = await pool.query('SELECT * FROM products WHERE idproduct = ?', [id]);

    res.json({
        status: 200,
        message: 'Se ha encontrado el producto',
        product: product
    });
});

router.post('/create', async(req, res) => {
    const {name, price} = req.body;
    const product = {
        name, price, status: 1
    };

    await pool.query('INSERT INTO products SET ?', [product]);

    res.json({
        status: 200,
        message: 'Se ha creado correctamente',
        product: product
    });
});

router.post('/update/:id', async(req, res) => {
    const {id} = req.params;
    const {name, price} = req.body;
    const product = {
        name, price, status: 1
    };

    await pool.query('UPDATE products SET ? WHERE idproduct = ?', [product, id]);

    res.json({
        status: 200,
        message: 'Se ha actualizado correctamente',
        product: product
    });
});

router.post('/delete/:id', async(req, res) => {
    const {id} = req.params;

    await pool.query('UPDATE products SET status = 0 WHERE idproduct = ?', [id]);

    res.json({
        status: 200,
        message: 'Se ha actualizado el estado correctamente'
    });
});

module.exports = router;
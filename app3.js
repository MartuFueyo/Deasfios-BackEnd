
const express = require('express');
const ProductManager = require('./ProductManager'); 
const app = express();
const port = 8080;

const productManager = ProductManager('./Products.json');

// Definir el primer endpoint '/products'
app.get('/products', async (req, res) => {
    try {
        const limit = req.query.limit; // Obtener el parámetro 'limit' de la consulta (si existe)
        const products = await productManager.readProducts(); // Leer los productos desde el archivo

        // Si se proporciona un límite, devolver solo el número de productos solicitados
        if (limit) {
            const limitedProducts = products.slice(0, parseInt(limit, 10));
            res.json(limitedProducts);
        } else {
            // Si no se proporciona un límite, devolver todos los productos
            res.json(products);
        }
    } catch (error) {
        res.status(500).json({
            error: 'Error al obtener los productos'
        });
    }
});

// Definir el segundo endpoint '/products/:pid'
app.get('/products/:pid', async (req, res) => {
    try {
        const productId = req.params.pid; // Obtener el parámetro 'pid' de la ruta
        const products = await productManager.readProducts(); // Leer los productos desde el archivo
        const product = products.find((p) => p.id === productId); // Encontrar el producto con el ID proporcionado

        if (!product) {
            res.status(404).json({
                error: 'Producto no encontrado'
            });
        } else {
            res.json(product);
        }
    } catch (error) {
        res.status(500).json({
            error: 'Error al obtener el producto'
        });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor Express iniciado en http://localhost:${port}`);
});
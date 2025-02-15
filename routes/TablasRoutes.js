const express = require('express');
const TablasControllers = require('../controllers/TablasControllers'); // Asegúrate de que el nombre del controlador sea correcto

const router = express.Router();


// CRUD DE PRODUCTOS
// Crear una nueva categoría y producto
router.post('/productos', TablasControllers.createProductos);

// Obtener todos los productos y categorías
router.get('/productos', TablasControllers.findAllProductos); // Cambiado a GET


router.get('/', (req, res) => {
    res.render('menu'); // Asegúrate de que views/menu.ejs exista
});

// // Obtener productos por id 
router.get('/productos/:id', TablasControllers.getProductoById); // Cambiado a GET

router.get('/menu', TablasControllers.menu);
router.get('/catalogo', TablasControllers.catalogo);


router.get('/productos/:id/edit', (req, res) => {
    const productId = req.params.id;
    console.log("ID en ruta de edición:", productId);
    TablasControllers.getProductoById(req, res);
   
});


router.put('/productos/:id', async (req, res) => {
    const productId = req.params.id;
    const updatedProduct = req.body;
    try {
        // Actualizar el producto en la base de datos
        const result = await TablasControllers.updateProduct(productId, updatedProduct);
        if (result) {
            res.redirect('/productos'); // Redirigir a la lista de productos
        } else {
            res.status(404).send('Producto no encontrado');
        }
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.status(500).send('Error interno del servidor');
    }
});

router.post('/productos/:id', TablasControllers.deleteProducto);



//CRUD DE CATEGORIA
// crear nueva categoria
router.post('/categorias', TablasControllers.createCategorias);

// obtener todos las categorias
router.get('/categorias', TablasControllers.findAllCategorias); // Cambiado a GET
// // Obtener categorias por id 
router.get('/categorias/:id', TablasControllers.getCategoryById); // Cambiado a GET

// obtener el id para actualizar 
router.get('/categorias/:id/edit', (req, res) => {
    const categorysId = req.params.id;
    console.log("ID en ruta de edición:", categorysId);
    TablasControllers.getCategoryById(req, res);
   
});

// actualizar la categoria
router.put('/categorias/:id', async (req, res) => {
    const categoryId = req.params.id;
    const updatedCategory = req.body;
    try {
        // Actualizar el producto en la base de datos
        const result = await TablasControllers.updateCategory(categoryId, updatedCategory);
        if (result) {
            res.redirect('/categorias'); // Redirigir a la lista de productos
        } else {
            res.status(404).send('Categoria no encontrado');
        }
    } catch (error) {
        console.error('Error al actualizar la categoria:', error);
        res.status(500).send('Error interno del servidor');
    }
});


// eliminar la categoria
router.post('/categorias/:id', TablasControllers.deleteCategoria);


module.exports = router;
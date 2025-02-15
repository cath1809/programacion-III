// controllers/userController.js
const Tablas = require('../models/TablasModel');
const db = require('../config/database');
exports.createProductos = (req, res) => {
    const { codigo, producto, categoria_id, existencia_actual, precio } = req.body;

    // Verifica que todos los campos requeridos estén presentes
    if (!codigo || !producto || !categoria_id || existencia_actual === undefined || precio === undefined) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const nuevoProducto = { codigo, producto, categoria_id, existencia_actual, precio };

    Tablas.createProduct(nuevoProducto, function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        // res.status(201).json({ message: 'Producto creado exitosamente' });
        res.status(201).redirect('/productos');
    });
};

exports.findAllProductos = (req, res) => {
  Tablas.findAllProducts(function(err, tabka) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(tabka);
    });
};

exports.getProductoById = (req, res) => {
    const id = req.params.id;
    console.log("ID en controlador:", id);

    if (!id) {
        return res.status(400).json({ error: 'El parámetro ID es obligatorio' });
    }

    Tablas.findProductById(id, function(err, product) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        // res.status(200).json(producto);
        // res.render('/editarProducto', {producto}); 
        res.render('editarProduto', {product}); // Esto busca un archivo llamado editarProducto.ejs en la carpeta views

        
    });
};

exports.updateProduct = async (id, product) => {
    return new Promise((resolve, reject) => {
        Tablas.updateProduct(id, product, (err, changes) => {
            if (err) {
                return reject(err);
            }
            resolve(changes); // Devuelve el número de filas afectadas
        });
    });
};


exports.deleteProducto = (req, res) => {
  const id = req.params.id;
  console.log(id)
  Tablas.deleteProduct(id, function(err) {
      if (err) {
        console.log(err)
        console.log(err.message)
          return res.status(500).json({ error: err.message });
      }
    res.redirect("/productos")
  });
};


exports.menu = (req, res) => {
    res.render('menu'); // Asegúrate de que views/menu.ejs exista
};
// exports.catalogo = (req, res) => {
//     res.render('catalogo'); // Asegúrate de que views/menu.ejs exista
// };


exports.findAllProductos = (req, res) => {
    Tablas.findAllProducts(function(err, productos) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.render('productos',{ productos, product: null }); // Pasa la lista de productos a la vista
    });
  };


// CATEGORIAS
  
  exports.findAllCategorias = (req, res) => {
    Tablas.findAllCategories(function(err, categorias) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.render('categorias', { categorias }); // Pasa la lista de categorías a la vista
    });
};

exports.createCategorias = (req, res) => {
    const { categoria } = req.body; // Asegúrate de que estás recibiendo 'categoria'

    if (!categoria) {
        return res.status(400).json({ error: 'El campo categoría es obligatorio' });
    }

    const nuevaCategoria = { categoria }; // Crea un objeto con el campo correcto

    Tablas.createCategory(nuevaCategoria, function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        // res.status(201).json({ message: 'Categoría creada exitosamente' });
        res.status(201).redirect('/categorias');
    });
};



exports.getCategoryById = (req, res) => {
    const id = req.params.id;
    console.log("ID en controlador:", id);

    if (!id) {
        return res.status(400).json({ error: 'El parámetro ID es obligatorio' });
    }

    Tablas.findCategoryById(id, function(err, category) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!category) {
            return res.status(404).json({ message: 'categoria no encontrado' });
        }
        res.render('editarCategoria', {category}); // Esto busca un archivo llamado editarCategoria.ejs en la carpeta views
    });
};



exports.updateCategory = async (id, category) => {
    return new Promise((resolve, reject) => {
        Tablas.updateCategory(id, category, (err, changes) => {
            if (err) {
                return reject(err);
            }
            resolve(changes); // Devuelve el número de filas afectadas
        });
    });
};




exports.deleteCategoria = (req, res) => {
    const id = req.params.id;
    Tablas.deleteCategory(id, function(err) {
        if (err) {
          console.log(err)
          console.log(err.message)
            return res.status(500).json({ error: err.message });
        }
      res.redirect("/categorias")
    });
  };

exports.catalogo = (req, res) => {
    const sql = `SELECT * FROM productos`; // Consulta todos los productos
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Error al obtener los productos');
        }

        // Asignar una imagen a cada producto
        const products = rows.map((product, index) => {
            return {
                ...product,
                image: `image${(index % 5) + 1}.jpg` // Asigna imágenes cíclicamente (image1.jpg, image2.jpg, image3.jpg)
            };
        });

        // Renderizar la vista EJS y pasar los productos
        res.render('catalogo', { products: products });
    });
};
// models/userModel.js
const db = require('../config/database');

class Tablas {

    // CREAR LA TABLA
    static createTable() {
        const sqlCategorias = `
        CREATE TABLE IF NOT EXISTS categorias (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            categoria TEXT NOT NULL
        )`;

            const sqlProductos = `
            CREATE TABLE IF NOT EXISTS productos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                codigo TEXT NOT NULL,
                producto TEXT NOT NULL,
                categoria_id INTEGER,
                existencia_actual INTEGER NOT NULL,
                precio REAL NOT NULL,
                FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE CASCADE
            )`;
        db.run(sqlCategorias);
        db.run(sqlProductos);

    }


    // CREAR EL PRODUCTO
    static createProduct(product, callback) {
        const sql = `INSERT INTO productos (codigo, producto, categoria_id, existencia_actual, precio) VALUES (?, ?, ?, ?, ?)`;
        
        // Asegúrate de que todos los campos requeridos tengan valores
        if (!product.codigo || !product.producto || !product.categoria_id || product.existencia_actual === undefined || product.precio === undefined) {
            return callback(new Error("Todos los campos son obligatorios"));
        }
    
        db.run(sql, [product.codigo, product.producto, product.categoria_id, product.existencia_actual, product.precio], function(err) {
            if (err) {
                console.error("Error al crear el producto:", err.message);
                return callback(err); // Devuelve el error al callback
            }
            console.log("Producto creado con ID:", this.lastID);
            callback(null, this.lastID); // Devuelve el ID del nuevo producto
        });
    }

    // OBTENER TODOS LOS PRODUCTOS
    static findAllProducts(callback) {
        const sql = `SELECT * FROM productos`;
        db.all(sql, (err, rows) => {
            if (err) {
                console.error("Error al obtener los productos:", err.message);
                return callback(err);
            }
            callback(null, rows); // Devuelve todos los productos
        });
    }

    // OBTENER LOS PRODUCTOS POR SU ID
    static findProductById(id, callback) {
        const sql = `SELECT * FROM productos WHERE id = ?`; // Consulta SQL con un parámetro
        db.get(sql, [id], (err, row) => {
            if (err) {
                console.error("Error al obtener el producto:", err.message);
                return callback(err);
            }
            if (!row) {
                // Si no se encuentra ningún producto con ese id
                return callback(null, null); // Devuelve null para indicar que no se encontró
            }
            callback(null, row); // Devuelve el producto encontrado
        });
    }

    // actualiza los productos  
    static updateProduct(id, product, callback) {
        const sql = `
            UPDATE productos 
            SET codigo = ?, producto = ?, categoria_id = ?, existencia_actual = ?, precio = ? 
            WHERE id = ?`;
        db.run(sql, [product.codigo, product.producto, product.categoria_id, product.existencia_actual, product.precio, id], function(err) {
            if (err) {
                console.error("Error al actualizar el producto:", err.message);
                return callback(err);
            }
            callback(null, this.changes); // Devuelve el número de filas afectadas
        });
    }

    // elimina el producto
    static deleteProduct(id, callback) {
        const sql = `DELETE FROM productos WHERE id = ?`;
        db.run(sql, [id], function(err) {
            if (err) {
                console.error("Error al eliminar el producto:", err.message);
                return callback(err);
            }
            if (this.changes === 0) {
                return callback(new Error("No se encontró el producto con el ID proporcionado."));
            }
            callback(null, this.changes); // Devuelve el número de filas afectadas
            
        });
    }


    // CREAR LA CATEGORIA
    static createCategory(category, callback) {
        // Verifica que la categoría no esté vacía
        if (!category.categoria) { // Cambia 'nombre' por 'categoria'
            return callback(new Error("El campo categoría es obligatorio"));
        }
    
        const sql = `INSERT INTO categorias (categoria) VALUES (?)`; // Cambia 'nombre' por 'categoria'
        db.run(sql, [category.categoria], function(err) {
            if (err) {
                console.error("Error al crear la categoría:", err.message);
                return callback(err);
            }
            console.log("Categoría creada con ID:", this.lastID);
            callback(null, this.lastID); // Devuelve el ID de la nueva categoría
        });
    }
    
    // OBTENER TODAS LAS CATEGORIAS
    static findAllCategories(callback) {
        const sql = `SELECT * FROM categorias`;
        db.all(sql, (err, rows) => {
            if (err) {
                console.error("Error al obtener las categorías:", err.message);
                return callback(err);
            }
            callback(null, rows); // Devuelve todas las categorías
        });
    }

    // obtener id de categoria
    static findCategoryById(id, callback) {
        const sql = `SELECT * FROM categorias WHERE id = ?`; // Consulta SQL con un parámetro
        db.get(sql, [id], (err, row) => {
            if (err) {
                console.error("Error al obtener la categoria:", err.message);
                return callback(err);
            }
            if (!row) {
                // Si no se encuentra ningún producto con ese id
                return callback(null, null); // Devuelve null para indicar que no se encontró
            }
            callback(null, row); // Devuelve el producto encontrado
        });
    }



   // actualiza las categorias  
   static updateCategory(id, category, callback) {
    const sql = `
        UPDATE categorias 
        SET categoria = ?
         WHERE id = ?`;
    db.run(sql, [category.categoria,id], function(err) {
        if (err) {
            console.error("Error al actualizar la categoria:", err.message);
            return callback(err);
        }
        callback(null, this.changes); // Devuelve el número de filas afectadas
    });
}


 // elimina el producto
 static deleteCategory(id, callback) {
    const sql = `DELETE FROM categorias WHERE id = ?`;
    db.run(sql, [id], function(err) {
        if (err) {
            console.error("Error al eliminar la categoria:", err.message);
            return callback(err);
        }
        if (this.changes === 0) {
            return callback(new Error("No se encontró la categoria con el ID proporcionado."));
        }
        callback(null, this.changes); // Devuelve el número de filas afectadas
        
    });
}




























    // static updateCategory(id, category, callback) {
    //     const sql = `UPDATE categorias SET categoria = ? WHERE id = ?`;
    //     db.run(sql, [category.categoria, id], function(err) {
    //         if (err) {
    //             console.error("Error al actualizar la categoría:", err.message);
    //             return callback(err);
    //         }
    //         callback(null, this.changes); // Devuelve el número de filas afectadas
    //     });
    // }


    // static deleteCategory(id, callback) {
    //     const sql = `DELETE FROM categorias WHERE id = ?`;
    //     db.run(sql, [id], function(err) {
    //         if (err) {
    //             console.error("Error al eliminar la categoría:", err.message);
    //             return callback(err);
    //         }
    //         callback(null, this.changes); // Devuelve el número de filas afectadas
    //     });
    // }

    
    // static deleteProduct(id, callback) {
    //     const sql = `DELETE FROM productos WHERE id = ?`;
    //     db.run(sql, [id], function(err) {
    //         if (err) {
    //             console.error("Error al eliminar el producto:", err.message);
    //             return callback(err);
    //         }
    //         callback(null, this.changes); // Devuelve el número de filas afectadas
    //     });
    // }

    
}

module.exports = Tablas;
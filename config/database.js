// config/database.js
const sqlite3 = require('sqlite3').verbose();

// Conectar a la base de datos (o crearla si no existe)
const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error('Error al conectar a la base de datos', err);
    } else {
        console.log('Conectado a la base de datos SQLite');
    }
});

module.exports = db;
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const methodOverride = require('method-override');

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar method-override antes de las rutas
app.use(methodOverride('_method'));

// Configurar EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para parsear JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
const indexRoutes = require('./routes/TablasRoutes');
app.use('/', indexRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

const Tablas = require('./models/TablasModel');

// Crear la tabla de usuarios si no existe
Tablas.createTable();
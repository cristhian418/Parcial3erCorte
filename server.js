const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));  // Para servir archivos estáticos como HTML, CSS, JS

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'venta_celulares'
});

db.connect(err => {
    if (err) throw err;
    console.log('Conexión exitosa a la base de datos');
});

// Ruta para registrar un usuario
app.post('/registro', (req, res) => {
    const { nombre, email, password } = req.body;
    const query = 'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)';
    db.query(query, [nombre, email, password], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Usuario registrado correctamente' });
    });
});

// Ruta para generar factura
app.post('/factura', (req, res) => {
    const { usuarioId, total, productos } = req.body;
    const query = 'INSERT INTO facturas (usuario_id, total, productos) VALUES (?, ?, ?)';
    db.query(query, [usuarioId, total, JSON.stringify(productos)], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Factura generada correctamente' });
    });
});

// Iniciar el servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});

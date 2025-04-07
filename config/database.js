const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'venta_celulares'
});

db.connect(err => {
    if (err) {
        console.log('Error de conexión:', err.message);
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
});

module.exports = db;

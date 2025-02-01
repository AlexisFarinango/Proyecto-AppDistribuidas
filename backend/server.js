const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
  host: 'db', // Nombre del servicio en docker-compose.yml
  user: 'root',
  password: 'password',
  database: 'cuidado_mascotas'
});

// Conectar a la base de datos
db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Manejar errores de conexión
db.on('error', err => {
  console.error('Database error:', err);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    // Reconectar si la conexión se pierde
    db.connect();
  } else {
    throw err;
  }
});

// Ruta para manejar el formulario
app.post('/api/formulario', (req, res) => {
  const { nombres, apellidos, direccion, edad, genero, celular, comentarios } = req.body;
  console.log(nombres, apellidos, direccion, edad, genero, celular, comentarios);
  
  const query = `
    INSERT INTO formulario (nombres, apellidos, direccion, edad, genero, celular, comentarios)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  console.log(query);
  
  db.query(query, [nombres, apellidos, direccion, edad, genero, celular, comentarios], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error saving data');
      return;
    }
    res.status(200).json({
        message: 'Data saved successfully',
        instance: process.env.INSTANCE_ID,
      });
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto: ${port}`);
});
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// --- CONFIGURACIÓN DE ALMACENAMIENTO (MULTER) ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/'); // Asegúrate de haber creado esta carpeta
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

const db = mysql.createConnection({
    host: '127.0.0.1', 
    user: 'fastech_user', 
    password: '1234',  
    database: 'tienda' 
});

db.connect((err) => {
    if (err) {
        console.log("-----------------------------------------");
        console.error('❌ ERROR DE CONEXIÓN:', err.code);
        console.error('MENSAJE:', err.sqlMessage);
        console.log("-----------------------------------------");
        return;
    }
    console.log('✅ CONEXIÓN EXITOSA: Fastech Studio está en línea.');
});

// --- RUTAS API ---

app.get("/productos", (req, res) => {
  db.query("SELECT * FROM productos", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

app.post("/productos", upload.single('imagen'), (req, res) => {
  const { nombre, precio, stock } = req.body;
  const rutaImagen = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : null;

  const query = "INSERT INTO productos (nombre, precio, stock, imagen) VALUES (?, ?, ?, ?)";
  db.query(query, [nombre, precio, stock, rutaImagen], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send("Producto guardado");
  });
});

// RUTA PARA ELIMINAR (CORREGIDA PARA QUE COINCIDA CON TU FRONTEND)
app.delete('/productos/:id', (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM productos WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ message: "Producto eliminado" });
    });
});

// RUTA PARA EDITAR (CORREGIDA PARA QUE COINCIDA CON TU FRONTEND)
app.put('/productos/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, precio, stock } = req.body;
    const sql = "UPDATE productos SET nombre = ?, precio = ?, stock = ? WHERE id = ?";
    db.query(sql, [nombre, precio, stock, id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ message: "Producto actualizado" });
    });
});

app.listen(5000, () => console.log("Servidor en puerto 5000"));
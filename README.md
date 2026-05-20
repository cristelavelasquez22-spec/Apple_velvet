 Apple Velvet - Sistema de Inventario Premium y Catálogo

¡Bienvenido a **Apple Velvet**! Una aplicación web full-stack de lujo diseñada para la gestión eficiente de inventarios de productos tecnológicos exclusivos y visualización de catálogo para usuarios.

> *"Lujo y red, Apple Velvet."*

---

 Características del Proyecto

- **Panel de Administración (Inventario):** - Registro de nuevos modelos con subida de imágenes en tiempo real.
  - Modificación dinámica de precios, stock y datos del producto.
  - Eliminación segura de artículos del catálogo.
  - **Generación de Reportes:** Botón integrado para descargar el estado actual del inventario en formato **PDF Premium** con la paleta de colores de la marca.
- **Área de Usuario (Cliente):** - Catálogo interactivo en cuadrícula (Grid) que consume datos en tiempo real.
  - Sistema de carrito de compras funcional para añadir productos y calcular el total de forma dinámica.
- **Backend Robusto:** API REST estructurada para el manejo de peticiones HTTP (`GET`, `POST`, `PUT`, `DELETE`).
- **Persistencia de Datos:** Conexión local optimizada a un servidor de bases de datos relacional.

---

 Tecnologías Utilizadas

### Frontend
- **React.js** (Hooks, Context/State Management)
- **CSS-in-JS** (Estilos minimalistas y elegantes en tonos vino `#550b14` y beige `#cbc0b2`)
- **jsPDF & jsPDF-AutoTable** (Generación nativa de documentos PDF de alta calidad)

### Backend
- **Node.js** & **Express.js** (Entorno de ejecución y framework de servidor)
- **Multer** (Middleware para el procesamiento y almacenamiento local de archivos/imágenes)
- **CORS** (Seguridad en el intercambio de recursos de origen cruzado)

### Base de Datos
- **MariaDB** / **MySQL** (Gestión de almacenamiento relacional para el catálogo)

---

##  Arquitectura de Base de Datos

El sistema utiliza una tabla llamada `productos` dentro de la base de datos `fastech_db`. La estructura base incluye:

- `id` (INT, Primary Key, Auto Increment)
- `nombre` (VARCHAR)
- `precio` (DECIMAL)
- `stock` (INT)
- `imagen` (VARCHAR - Ruta local del servidor)

---


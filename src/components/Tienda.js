import React, { useState, useEffect } from 'react';

const Tienda = ({ agregarAlCarrito }) => {
  const [productos, setProductos] = useState([]);
  const [errorServidor, setErrorServidor] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/productos')
      .then(res => {
        if (!res.ok) throw new Error("Error de respuesta");
        return res.json();
      })
      .then(data => setProductos(Array.isArray(data) ? data : []))
      .catch(err => {
        console.error("Error al cargar productos:", err);
        setErrorServidor(true);
      });
  }, []);

  if (errorServidor) {
    return <div style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>
      <h3>❌ Error de conexión</h3>
      <p>Asegúrate de que tu servidor (node server.js) esté encendido.</p>
    </div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: 'white', textAlign: 'center' }}>Nuestras Impresiones 3D</h2>
      
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '20px', 
        justifyContent: 'center' 
      }}>
        {productos.length === 0 ? (
          <p style={{ color: 'white' }}>Cargando catálogo...</p>
        ) : (
          productos.map(p => (
            <div key={p.id} style={{ 
              backgroundColor: '#94929B', 
              width: '220px', 
              borderRadius: '15px', 
              padding: '10px', 
              color: 'white', 
              textAlign: 'center' 
            }}>
              <img 
                src={p.imagen} 
                alt={p.nombre} 
                style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '10px' }} 
                onError={(e) => { e.target.src = "https://via.placeholder.com/150?text=Fastech+3D" }}
              />
              <h4>{p.nombre}</h4>
              <p style={{ fontWeight: 'bold', color: '#DDA0DD' }}>${p.precio}</p>
              <button 
                onClick={() => agregarAlCarrito(p)}
                style={{ 
                  backgroundColor: '#DDA0DD', 
                  border: 'none', 
                  padding: '8px 15px', 
                  borderRadius: '8px', 
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                Añadir al carrito
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Tienda;
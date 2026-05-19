import React, { useState, useEffect } from 'react';

const Carrito = ({ onSalir }) => {
    const [productosDisponibles, setProductosDisponibles] = useState([]);
    const [itemsEnCarrito, setItemsEnCarrito] = useState([]);

    // Cargar productos del inventario
    const obtenerProductos = async () => {
        try {
            const res = await fetch('http://localhost:5000/productos');
            const data = await res.json();
            setProductosDisponibles(data);
        } catch (err) {
            console.error("Error al cargar productos:", err);
        }
    };

    useEffect(() => {
        obtenerProductos();
    }, []);

    const agregarAlCarrito = (producto) => {
        setItemsEnCarrito([...itemsEnCarrito, producto]);
    };

    const total = itemsEnCarrito.reduce((acc, p) => acc + parseFloat(p.precio), 0);

    return (
        <div style={{ backgroundColor: '#f8f8f7', minHeight: '100vh', fontFamily: 'sans-serif' }}>
            
            {/* BARRA SUPERIOR (NAVBAR) */}
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                backgroundColor: '#550b14', 
                padding: '15px 40px', 
                position: 'sticky', 
                top: 0, 
                zIndex: 1000,
                boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
            }}>
                <h1 style={{ color: '#cbc0b2', margin: 0, letterSpacing: '3px', fontSize: '1.5rem' }}>APPLE VELVET</h1>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    {/* BOTÓN DE CARRITO EN LA BARRA */}
                    <div style={{ 
                        backgroundColor: '#cbc0b2', 
                        color: '#550b14', 
                        padding: '8px 20px', 
                        borderRadius: '20px', 
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                    }}>
                        🛒 {itemsEnCarrito.length} ítems | ${total.toFixed(2)}
                    </div>

                    <button onClick={onSalir} style={btnSalir}>SALIR</button>
                </div>
            </div>

            {/* CUERPO DEL CATÁLOGO */}
            <div style={{ padding: '40px' }}>
                <h2 style={{ color: '#550b14', textAlign: 'center', marginBottom: '30px', letterSpacing: '1px' }}>
                    NUESTRA COLECCIÓN PREMIUM
                </h2>

                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
                    gap: '30px' 
                }}>
                    {productosDisponibles.map(p => (
                        <div key={p.id} style={cardStyle}>
                            <div style={{ overflow: 'hidden', borderRadius: '10px' }}>
                                <img src={p.imagen} alt={p.nombre} style={imgStyle} />
                            </div>
                            <h3 style={{ color: '#550b14', margin: '15px 0 5px 0' }}>{p.nombre}</h3>
                            <p style={{ color: '#7e6961', fontSize: '1.2rem', fontWeight: 'bold', margin: '0 0 15px 0' }}>
                                ${p.precio}
                            </p>
                            <button 
                                onClick={() => agregarAlCarrito(p)} 
                                className="btn-agregar"
                                style={btnAgregar}
                            >
                                AÑADIR AL CARRITO
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                .btn-agregar:hover {
                    background-color: #7e6961 !important;
                    transform: translateY(-2px);
                }
                .btn-agregar:active {
                    transform: translateY(0);
                }
            `}</style>
        </div>
    );
};

// ESTILOS
const btnSalir = { 
    background: 'transparent', 
    color: '#cbc0b2', 
    border: '2px solid #cbc0b2', 
    padding: '8px 20px', 
    borderRadius: '20px', 
    cursor: 'pointer', 
    fontWeight: 'bold' 
};

const cardStyle = { 
    backgroundColor: '#fff', 
    padding: '20px', 
    borderRadius: '20px', 
    boxShadow: '0 10px 20px rgba(0,0,0,0.05)', 
    textAlign: 'center',
    transition: '0.3s'
};

const imgStyle = { 
    width: '100%', 
    height: '200px', 
    objectFit: 'contain', 
    marginBottom: '10px' 
};

const btnAgregar = { 
    background: '#550b14', 
    color: '#cbc0b2', 
    border: 'none', 
    padding: '12px', 
    borderRadius: '10px', 
    cursor: 'pointer', 
    width: '100%', 
    fontWeight: 'bold',
    transition: '0.3s'
};

export default Carrito;
import React, { useState, useEffect } from 'react';

// Recibimos 'onSalir' como propiedad para que el botón funcione sí o sí
const Inventario = ({ onSalir }) => {
    const [productos, setProductos] = useState([]);
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [stock, setStock] = useState('');
    const [imagen, setImagen] = useState(null);

    // Función para traer los productos del servidor
    const obtenerProductos = async () => {
        try {
            const res = await fetch('http://localhost:5000/productos');
            const data = await res.json();
            setProductos(data);
        } catch (err) {
            console.error("Error al obtener productos:", err);
        }
    };

    useEffect(() => {
        obtenerProductos();
    }, []);

    // Guardar nuevo producto
    const guardarProducto = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('precio', precio);
        formData.append('stock', stock);
        formData.append('imagen', imagen);

        try {
            await fetch('http://localhost:5000/productos', {
                method: 'POST',
                body: formData
            });
            setNombre(''); setPrecio(''); setStock(''); setImagen(null);
            obtenerProductos();
        } catch (err) {
            console.error("Error al guardar:", err);
        }
    };

    // Eliminar producto
    const eliminarProducto = async (id) => {
        if (window.confirm("¿Deseas eliminar este producto de Apple Velvet?")) {
            await fetch(`http://localhost:5000/productos/${id}`, {
                method: 'DELETE'
            });
            obtenerProductos();
        }
    };

    return (
        <div style={{ 
            backgroundColor: '#550b14', 
            minHeight: '100vh', 
            padding: '40px', 
            color: '#f8f8f7', 
            fontFamily: 'sans-serif'
        }}>
            
            {/* ENCABEZADO PREMIUM */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px' }}>
                <div>
                    <h1 style={{ margin: 0, letterSpacing: '5px', color: '#cbc0b2', fontSize: '3rem' }}>APPLE VELVET</h1>
                    <p style={{ margin: '5px 0 0 0', opacity: 0.9, color: '#f8f8f7', fontSize: '1.2rem', fontStyle: 'italic', borderLeft: '3px solid #cbc0b2', paddingLeft: '10px' }}>
                        Lujo y red, Apple Velvet.
                    </p>
                </div>
                
                {/* BOTÓN SALIR - AHORA FUNCIONAL */}
                <button 
                    className="btn-salir-apple"
                    onClick={onSalir} 
                    style={{
                        padding: '12px 35px',
                        borderRadius: '30px',
                        border: '2px solid #cbc0b2',
                        background: 'transparent',
                        color: '#cbc0b2',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: '0.3s'
                    }}
                >
                    SALIR →
                </button>
            </div>

            {/* FORMULARIO DE REGISTRO */}
            <div style={{ backgroundColor: '#7e6961', padding: '30px', borderRadius: '20px', marginBottom: '40px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
                <h3 style={{ marginTop: 0, color: '#cbc0b2' }}>Registrar en Catálogo</h3>
                <form onSubmit={guardarProducto} style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                    <input type="text" placeholder="Modelo (Ej: iPhone 15 Pro)" value={nombre} onChange={e => setNombre(e.target.value)} required style={inputStyle} />
                    <input type="file" onChange={e => setImagen(e.target.files[0])} required style={{...inputStyle, background: '#f8f8f7', color: '#550b14'}} />
                    <input type="number" placeholder="Precio ($)" value={precio} onChange={e => setPrecio(e.target.value)} required style={inputStyle} />
                    <input type="number" placeholder="Stock" value={stock} onChange={e => setStock(e.target.value)} required style={inputStyle} />
                    <button type="submit" style={btnPrincipal}>AÑADIR AL INVENTARIO</button>
                </form>
            </div>

            {/* TABLA DE PRODUCTOS */}
            <div style={{ backgroundColor: 'rgba(203, 192, 178, 0.05)', padding: '25px', borderRadius: '20px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #cbc0b2', color: '#cbc0b2' }}>
                            <th style={cellStyle}>Vista</th>
                            <th style={cellStyle}>Modelo</th>
                            <th style={cellStyle}>Precio</th>
                            <th style={cellStyle}>Stock</th>
                            <th style={cellStyle}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map(p => (
                            <tr key={p.id} style={{ borderBottom: '1px solid rgba(203, 192, 178, 0.1)' }}>
                                <td style={cellStyle}>
                                    <img src={p.imagen} alt={p.nombre} style={{ width: '70px', borderRadius: '12px' }} />
                                </td>
                                <td style={{...cellStyle, fontWeight: 'bold'}}>{p.nombre}</td>
                                <td style={cellStyle}>${p.precio}</td>
                                <td style={cellStyle}>{p.stock} uds</td>
                                <td style={cellStyle}>
                                    <button style={btnAccion('#cbc0b2', '#550b14')}>Editar</button>
                                    <button onClick={() => eliminarProducto(p.id)} style={btnAccion('#f8f8f7', '#7e6961')}>Borrar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* CSS PARA EL BOTÓN */}
            <style>{`
                .btn-salir-apple:hover {
                    background: #cbc0b2 !important;
                    color: #550b14 !important;
                    transform: scale(1.05);
                }
            `}</style>
        </div>
    );
};

// Estilos rápidos
const inputStyle = { padding: '14px', borderRadius: '12px', border: 'none', flex: 1, minWidth: '160px', outline: 'none' };
const cellStyle = { padding: '20px', textAlign: 'left' };
const btnPrincipal = { padding: '14px', borderRadius: '12px', border: 'none', background: '#cbc0b2', color: '#550b14', fontWeight: 'bold', cursor: 'pointer', flex: 1 };
const btnAccion = (bg, col) => ({ padding: '8px 18px', borderRadius: '8px', border: 'none', background: bg, color: col, cursor: 'pointer', marginRight: '8px', fontWeight: 'bold' });

export default Inventario;
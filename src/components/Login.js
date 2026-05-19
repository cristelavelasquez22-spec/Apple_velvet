import React, { useState } from 'react';

const Login = ({ onAdmin, onUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        
        // CONVERTIMOS A MINÚSCULAS PARA EVITAR ERRORES DE DEDO
        const userEmail = email.toLowerCase().trim();

        if (userEmail === 'admin@apple.com') {
            console.log("Accediendo como Administrador...");
            onAdmin(); // <--- Esto abre el Inventario (Vino)
        } else {
            console.log("Accediendo como Cliente...");
            onUser(); // <--- Esto abre el Carrito (Blanco)
        }
    };

    return (
        <div style={{ backgroundColor: '#550b14', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'sans-serif' }}>
            <div style={{ backgroundColor: '#cbc0b2', padding: '40px', borderRadius: '25px', textAlign: 'center', width: '350px', boxShadow: '0 15px 35px rgba(0,0,0,0.4)' }}>
                <h2 style={{ color: '#550b14', letterSpacing: '3px', marginBottom: '10px' }}>APPLE VELVET</h2>
                <p style={{ color: '#7e6961', marginBottom: '25px', fontSize: '0.9rem' }}>Luxury & Technology</p>
                
                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <input 
                        type="email" 
                        placeholder="Correo electrónico" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        style={inputStyle} 
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Contraseña" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        style={inputStyle} 
                        required 
                    />
                    <button type="submit" className="btn-login" style={btnStyle}>
                        INICIAR SESIÓN
                    </button>
                </form>
            </div>
            <style>{`
                .btn-login:hover { background-color: #3d080e !important; transform: scale(1.02); }
                .btn-login:active { transform: scale(0.98); }
            `}</style>
        </div>
    );
};

const inputStyle = { padding: '14px', borderRadius: '10px', border: '1px solid #7e6961', outline: 'none', fontSize: '1rem' };
const btnStyle = { padding: '14px', borderRadius: '10px', border: 'none', backgroundColor: '#550b14', color: '#cbc0b2', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s', marginTop: '10px' };

export default Login;
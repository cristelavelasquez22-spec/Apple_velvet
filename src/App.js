import React, { useState } from 'react';
import Login from './components/Login';
import Inventario from './components/Inventario';
import Carrito from './components/Carrito'; // <--- Asegúrate de que este archivo exista

function App() {
  const [pantalla, setPantalla] = useState('login');

  return (
    <div className="App">
      {/* Lógica de navegación por estados */}
      {pantalla === 'login' && (
        <Login 
          onAdmin={() => setPantalla('inventario')} 
          onUser={() => setPantalla('cliente')} 
        />
      )}
      
      {pantalla === 'inventario' && (
        <Inventario onSalir={() => setPantalla('login')} />
      )}
      
      {pantalla === 'cliente' && (
        <Carrito onSalir={() => setPantalla('login')} />
      )}
      {pantalla === 'login' && (
  <Login 
    onAdmin={() => setPantalla('inventario')} 
    onUser={() => setPantalla('carrito')} 
  />
)}
    </div>
  );
}

export default App;
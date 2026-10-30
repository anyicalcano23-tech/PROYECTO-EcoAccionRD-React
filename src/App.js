import React, { useState, useEffect } from 'react';
import './app.css';

function App() {
  // 1. Estado global de las acciones (cargando desde localStorage para que no se borren)
  const [acciones, setAcciones] = useState(() => {
    const guardados = localStorage.getItem('accionesEco');
    return guardados ? JSON.parse(guardados) : [];
  });

  // 2. Estado para el Modo Oscuro
  const [darkMode, setDarkMode] = useState(false);

  // 3. Estados para el formulario
  const [tipo, setTipo] = useState('Árboles');
  const [cantidad, setCantidad] = useState('');

  // Guardar en el navegador cada vez que cambien las acciones
  useEffect(() => {
    localStorage.setItem('accionesEco', JSON.stringify(acciones));
  }, [acciones]);

  // Activar o desactivar la clase dark-mode en el cuerpo de la página
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  // Función para agregar acción con validación (evita números negativos)
  const handleSubmit = (e) => {
    e.preventDefault();
    const cantNum = Number(cantidad);
    
    if (cantNum <= 0 || isNaN(cantNum)) {
      alert('Por favor, ingresa un número válido mayor a 0.');
      return;
    }

    const nuevaAccion = {
      id: Date.now(),
      tipo,
      cantidad: cantNum,
      fecha: new Date().toLocaleDateString()
    };

    setAcciones([nuevaAccion, ...acciones]);
    setCantidad('');
  };

  // Cálculos automáticos usando el método .reduce()
  const totalArboles = acciones
    .filter(a => a.tipo === 'Árboles')
    .reduce((acc, curr) => acc + curr.cantidad, 0);

  const totalReciclaje = acciones
    .filter(a => a.tipo === 'Reciclaje (kg)')
    .reduce((acc, curr) => acc + curr.cantidad, 0);

  const totalEnergia = acciones
    .filter(a => a.tipo === 'Ahorro Energía (kWh)')
    .reduce((acc, curr) => acc + curr.cantidad, 0);

  return (
    <div className="app-contenidor">
      {/* Botón de Modo Oscuro / Claro (Requisito de Glimer) */}
      <button 
        className="btn-dark-mode" 
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}
      </button>

      {/* Cabecera */}
      <header>
        <h1>EcoAcciónRD 🌿</h1>
        <p>Medidor de impacto ecológico - Panel de Control (Anyi)</p>
      </header>

      {/* Formulario (Parte de Henry) */}
      <section className="formulario">
        <h2>Registrar Acción Ecológica</h2>
        <form onSubmit={handleSubmit}>
          <label>Tipo de Acción:</label>
          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="Árboles">Árboles Plantados</option>
            <option value="Reciclaje (kg)">Reciclaje (kg)</option>
            <option value="Ahorro Energía (kWh)">Ahorro Energía (kWh)</option>
          </select>

          <label>Cantidad:</label>
          <input 
            type="number" 
            min="1" 
            value={cantidad} 
            onChange={(e) => setCantidad(e.target.value)} 
            placeholder="Ej. 5"
            required 
          />

          <button type="submit">Guardar Acción</button>
        </form>
      </section>

      {/* Panel de Impacto con Tarjetas y .reduce() (Parte de Ismailyn) */}
      <section className="panel-impacto">
        <h2>Panel de Impacto Acumulado</h2>
        <div className="tarjetas">
          <div className="tarjeta">
            <h3>{totalArboles} Árboles</h3>
            <p>Plantados</p>
          </div>
          <div className="tarjeta" style={{ borderBottomColor: '#1565C0' }}>
            <h3 style={{ color: '#1565C0' }}>{totalReciclaje} kg</h3>
            <p>Reciclados</p>
          </div>
          <div className="tarjeta" style={{ borderBottomColor: '#E8A317' }}>
            <h3 style={{ color: '#E8A317' }}>{totalEnergia} kWh</h3>
            <p>Ahorro Energético</p>
          </div>
        </div>
      </section>

      {/* Historial de Acciones */}
      <section className="historial">
        <h2>Historial de Acciones</h2>
        {acciones.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '15px' }}>No hay acciones registradas todavía.</p>
        ) : (
          <ul>
            {acciones.map((item) => (
              <li key={item.id}>
                <strong>{item.tipo}:</strong> {item.cantidad} — <small>{item.fecha}</small>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default App;
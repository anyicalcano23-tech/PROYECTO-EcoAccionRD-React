import React, { useState } from 'react';

function FormularioAccion({ onAgregarAccion }) {
  const [tipo, setTipo] = useState('arboles');
  const [cantidad, setCantidad] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cantidad || Number(cantidad) <= 0) return;

    const nuevaAccion = {
      id: Date.now(),
      tipo,
      cantidad: Number(cantidad),
      descripcion,
      fecha: new Date().toLocaleDateString()
    };

    onAgregarAccion(nuevaAccion);
    setCantidad('');
    setDescripcion('');
  };

  return (
    <div className="tarjeta formulario-accion">
      <h3>Registrar Acción Ecológica</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Tipo de Acción:</label>
          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="arboles">Árboles Plantados 🌳</option>
            <option value="reciclaje">Reciclaje (kg) ♻️</option>
            <option value="energia">Ahorro de Energía (kWh) ⚡</option>
          </select>
        </div>

        <div className="form-group">
          <label>Cantidad:</label>
          <input 
            type="number" 
            value={cantidad} 
            onChange={(e) => setCantidad(e.target.value)} 
            placeholder="Ej. 5"
            required 
          />
        </div>

        <div className="form-group">
          <label>Descripción / Detalle:</label>
          <input 
            type="text" 
            value={descripcion} 
            onChange={(e) => setDescripcion(e.target.value)} 
            placeholder="Ej. Jornada en el parque" 
          />
        </div>

        <button type="submit" className="btn-verde">Guardar Acción</button>
      </form>
    </div>
  );
}

export default FormularioAccion;
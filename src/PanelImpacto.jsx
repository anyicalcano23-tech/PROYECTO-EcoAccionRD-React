import React from 'react';

function PanelImpacto({ acciones = [] }) {
  const totalArboles = acciones
    .filter(a => a.tipo === 'arboles')
    .reduce((acc, curr) => acc + curr.cantidad, 0);

  const totalReciclaje = acciones
    .filter(a => a.tipo === 'reciclaje')
    .reduce((acc, curr) => acc + curr.cantidad, 0);

  const totalEnergia = acciones
    .filter(a => a.tipo === 'energia')
    .reduce((acc, curr) => acc + curr.cantidad, 0);

  return (
    <div className="tarjeta panel-impacto">
      <h3>Panel de Impacto Ecológico 📊</h3>
      
      <div className="grid-tarjetas">
        <div className="card-metrica">
          <h4>Árboles Plantados</h4>
          <p className="numero">{totalArboles} 🌳</p>
        </div>

        <div className="card-metrica">
          <h4>Reciclaje Total</h4>
          <p className="numero">{totalReciclaje} kg ♻️</p>
        </div>

        <div className="card-metrica">
          <h4>Ahorro de Energía</h4>
          <p className="numero">{totalEnergia} kWh ⚡</p>
        </div>
      </div>

      <div className="historial-container">
        <h4>Historial de Acciones</h4>
        {acciones.length === 0 ? (
          <p>No hay acciones registradas todavía.</p>
        ) : (
          <ul>
            {acciones.map((item) => (
              <li key={item.id}>
                <span><strong>{item.tipo.toUpperCase()}</strong>: {item.cantidad} - {item.descripcion || 'Sin descripción'} ({item.fecha})</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default PanelImpacto;
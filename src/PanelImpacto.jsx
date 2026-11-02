import React from 'react';

function PanelImpacto({ acciones }) {
    
  const totalArboles = acciones
    .filter(a => a.tipo === 'arboles') 
    .reduce((sum, a) => sum + Number(a.cantidad), 0);

  const totalReciclaje = acciones
    .filter(a => a.tipo === 'reciclaje') 
    .reduce((sum, a) => sum + Number(a.cantidad), 0);

  const totalEnergia = acciones
    .filter(a => a.tipo === 'energia') 
    .reduce((sum, a) => sum + Number(a.cantidad), 0);

  return (
    <div className="panel-impacto">
      <h2>Panel de Impacto Acumulado</h2>
      
      <div className="tarjetas-container">
        <div className="tarjeta arboles">
          <h3>{totalArboles} Árboles</h3>
          <p>Plantados</p>
        </div>

        <div className="tarjeta reciclaje">
          <h3>{totalReciclaje} kg</h3>
          <p>Reciclados</p>
        </div>

        <div className="tarjeta energia">
          <h3>{totalEnergia} kWh</h3>
          <p>Ahorro Energético</p>
        </div>
      </div>

      <div className="historial">
        <h3>Historial de Acciones</h3>
        {acciones.length === 0 ? (
          <p>No hay acciones registradas todavía.</p>
        ) : (
          <ul>
            {acciones.map((accion, index) => (
              <li key={index}>
                <strong>{accion.tipo}:</strong> {accion.cantidad} — {accion.detalle || 'Sin detalle'}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default PanelImpacto;

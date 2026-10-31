import React from 'react';
import useLocalStorage from './useLocalStorage';
import FormularioAccion from './FormularioAccion';
import PanelImpacto from './PanelImpacto';
import './app.css';

function App() {
  // Estado persistente en LocalStorage (tu módulo de QA)
  const [acciones, setAcciones] = useLocalStorage('eco_acciones', []);

  // Función para agregar nuevas acciones desde el formulario de Henry
  const agregarAccion = (nuevaAccion) => {
    setAcciones([nuevaAccion, ...acciones]);
  };

  return (
    <div className="App">
      <header className="header">
        <h1>🌱 EcoAcciónRD</h1>
        <p>Reto 8: Medir el impacto de acciones ecológicas en República Dominicana</p>
      </header>

      <main className="main-content">
        {/* Componente de Henry */}
        <FormularioAccion onAgregarAccion={agregarAccion} />

        {/* Componente de Ismailyn */}
        <PanelImpacto acciones={acciones} />
      </main>

      <footer className="footer">
        <p>Proyecto Integrador 2025 - Grupo 8</p>
      </footer>
    </div>
  );
}

export default App;
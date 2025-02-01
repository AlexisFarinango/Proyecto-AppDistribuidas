import React from 'react';
import Formulario from './components/Formulario';
import './styles.css';

function App() {
  return (
    <div className="App">
    <header className="hero">
      <h1>Cuidado de Mascotas</h1>
      <p>La guía esencial para mantener a tus mascotas felices y saludables.</p>
      <p>Información proporcionada de la Instancia: {process.env.REACT_APP_INSTANCE_ID}</p>
    </header>
    
    <div className="content">
      <section>
        <h2>¿Por qué es importante cuidar a tus mascotas?</h2>
        <p>
          Las mascotas no solo son nuestros compañeros, sino que también son 
          parte de nuestra familia. Asegurarte de que reciban los cuidados 
          adecuados es esencial para su bienestar.
        </p>
      </section>
      <section>
        <h2>Información esencial</h2>
        <ul>
          <li>Alimentación balanceada y saludable.</li>
          <li>Revisiones veterinarias regulares.</li>
          <li>Ejercicio diario y enriquecimiento mental.</li>
        </ul>
      </section>
    <Formulario/>
    </div>
  </div>
    
  );
}

export default App;
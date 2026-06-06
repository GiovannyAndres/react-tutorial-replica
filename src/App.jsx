import TodoApp from './components/TodoApp.jsx'
import { useState } from 'react';
import './index.css';

// <h1>${nombre}</h1>
// <></> Fragment = Fragmento vacio, sirve para envolver elementos sin agregar nodos al DOM

// Pasar Props a un componente Siempre es de componente padre a componente hijo, nunca al revés
function App() {

  // const notas = [
  //   {
  //     id: crypto.randomUUID(), // Crear un hash de letras y números para identificar cada nota
  //     text: "Nota 1"
  //   },
  //   {
  //     id: crypto.randomUUID(), // Crear un hash de letras y números para identificar cada nota
  //     text: "Nota 2"
  //   }
  // ]

  // const titulosApp = {
  //   tituloApp: "App de Notas",
  //   subTituloApp: "Subtitulo de la App"
  // }
  //  {...titulosApp}

  return (
    <section className="containerTodoApp">
      <TodoApp></TodoApp>
    </section>
  );
}

export default App;

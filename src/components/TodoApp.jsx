import styles from "./todoApp.module.css";
import { useState, useEffect } from "react";
import TodoForm from "./TodoForm/TodoForm";
import EditNoteForm from "./EditNoteForm/EditNoteForm";
import {
  SquarePen,
  Trash,
  GripVertical,
  SquareCheck,
  SquareX,
} from "lucide-react";

function TodoApp() {
  const [notas, setNotas] = useState([]);
  const [notaEditandoId, setNotaEditandoId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/notas");

        if (!response.ok) {
          throw new Error(`Error http: ${response.status}`);
        }

        const data = await response.json();
        setNotas(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const agregarNota = (nuevaNota) => {
    setNotas([...notas, nuevaNota]);
  };

  const eliminarNota = (id) => {
    setNotas(notas.filter((nota) => nota.id !== id));
    fetch(`http://localhost:3000/notas/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error al eliminar la nota: ${response.status}`);
        }
        console.log("Nota eliminada correctamente");
      })
      .catch((error) => console.error(error));
  };

  // Handlers para el Drag and Drop
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("index", index);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Necesario para permitir el "drop"
  };

  const handleDrop = (e, targetIndex) => {
    const sourceIndex = Number(e.dataTransfer.getData("index"));
    if (sourceIndex === targetIndex) return;

    const updatedNotas = [...notas];
    const [movedItem] = updatedNotas.splice(sourceIndex, 1);
    updatedNotas.splice(targetIndex, 0, movedItem);
    setNotas(updatedNotas);
  };

  // (props) | (props Componente)
  // { notasApp } = props
  // const { notasApp } = props
  // map = retorna un array

  // console.log(event.target); // Elemento que dispara el evento

  const actualizarNota = (notaActualizada) => {
    setNotas(
      notas.map((nota) => {
        return nota.id === notaActualizada.id ? notaActualizada : nota;
      }),
    );
  };

  const marcarComoCompleta = async (notaId) => {
    try {
      const nota = notas.find((nota) => nota.id === notaId);
      const response = await fetch(`http://localhost:3000/notas/${notaId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !nota.completed }),
      });

      if (!response.ok) {
        throw new Error(`Error al actualizar una nota: ${response.status}`);
      }

      const notaActualizada = await response.json();
      setNotas(
        notas.map((nota) => (nota.id === notaId ? notaActualizada : nota)),
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1 className={styles.titulo}>Notas {notas.length}</h1>
      <TodoForm onAgregarNota={agregarNota}></TodoForm>
      <ul className={styles.noteList} onDragOver={handleDragOver}>
        {notas.map((nota, index) => (
          <li
            className={styles.noteItem}
            key={nota.id}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDrop={(e) => handleDrop(e, index)}
          >
            <GripVertical size={20} style={{ cursor: "grab", color: "#666" }} />
            <span>
              {nota.completed ? "✅" : "❌"} {nota.text}
            </span>
            <div className={styles.iconsContainer}>
              <button
                title={nota.completed ? "Desmarcar" : "Completar"}
                className={styles.iconButton}
                onClick={() => marcarComoCompleta(nota.id)}
              >
                {nota.completed ? (
                  <SquareX size={26} />
                ) : (
                  <SquareCheck size={26} />
                )}
              </button>
              <SquarePen onClick={() => setNotaEditandoId(nota.id)} size={26} />
              <Trash onClick={() => eliminarNota(nota.id)} size={26} />
            </div>
            {notaEditandoId === nota.id && (
              <EditNoteForm
                nota={nota}
                onEditarNota={actualizarNota}
                onCancelar={() => setNotaEditandoId(null)}
              />
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

export default TodoApp;

import styles from "./todoForm.module.css";
import { useState } from "react";
import { Plus } from "lucide-react";

const TodoForm = ({ onAgregarNota }) => {
  const [textNote, setTextNote] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (textNote === "") {
      console.log("No se pueden agregar notas vacías");
      return;
    }
    // Aquí se envía la nota a la DB
    const newNote = {
      text: textNote,
      completed: false,
    };

    fetch("http://localhost:3000/notas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNote),
    })
      .then((response) => response.json())
      .then((data) => {
        onAgregarNota(data);
        setTextNote("");
      });
  };

  //  const handleChange = (e) => {
  //    setTextNote(e.target.value)
  //  }

  return (
    <div className={styles.formContainer}>
      <h2>Todo Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="nota"
          name="nota"
          value={textNote}
          onChange={(event) => setTextNote(event.target.value)}
        />
        <button type="submit">
          <Plus size={16} />
          Crear Nota
        </button>
      </form>
    </div>
  );
};

export default TodoForm;

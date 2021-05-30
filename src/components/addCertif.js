import {
  addDatetime,
  addUrl,
  addStringNoLocale,
  createThing,
  getSourceUrl,
  saveSolidDatasetAt,
  setThing,
} from "@inrupt/solid-client";
import { useSession } from "@inrupt/solid-ui-react";
import React, {useState } from "react";

//still has to be updated with correct structure for chosen certificate format
//wil eventually only have to be called after a succesfull validation got stored on-chain

const TEXT_PREDICATE = "http://schema.org/text";
const CREATED_PREDICATE = "http://www.w3.org/2002/12/cal/ical#created";
const TODO_CLASS = "http://www.w3.org/2002/12/cal/ical#Vtodo";
const TYPE_PREDICATE = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type";

function AddCertif({ todoList, setTodoList}) {
  const { session } = useSession();
  const [todoText, setTodoText] = useState("");

  const addTodo = async (text) => {
    const indexUrl = getSourceUrl(todoList);
    const todoWithText = addStringNoLocale(createThing(), TEXT_PREDICATE, text);
    const todoWithDate = addDatetime(
      todoWithText,
      CREATED_PREDICATE,
      new Date()
    );
    const todoWithType = addUrl(todoWithDate, TYPE_PREDICATE, TODO_CLASS);
    const updatedTodoList = setThing(todoList, todoWithType);
    const updatedDataset = await saveSolidDatasetAt(indexUrl, updatedTodoList, {
      fetch: session.fetch,
    });
    setTodoList(updatedDataset);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    addTodo(todoText);
    //setTodoText("");
  };

  const handleChange = (e) => {
    e.preventDefault();
    setTodoText(e.target.value);
  };

  return (
      <form onSubmit={handleSubmit} className="todo-form">
        <label htmlFor="todo-input">
          <input
            id="todo-input"
            type="text"
            value={todoText}
            onChange={handleChange}
          />
        </label>
        <button type="submit" className="add-button">
          Add Todo
        </button>
      </form>
  );
}

export default AddCertif;
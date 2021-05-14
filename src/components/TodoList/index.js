import React from "react";
import { 
    getThingAll, 
    setThing,
    removeThing,
    getUrl, 
    getSourceUrl, 
    saveSolidDatasetAt, 
    addDatetime, 
    getDatetime,
    removeDatetime
} from "@inrupt/solid-client";
import { Table, TableColumn, useSession, useThing } from "@inrupt/solid-ui-react";

const TEXT_PREDICATE = "http://schema.org/text";
const CREATED_PREDICATE = "http://www.w3.org/2002/12/cal/ical#created";
const TODO_CLASS = "http://www.w3.org/2002/12/cal/ical#Vtodo";
const TYPE_PREDICATE = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type";
const COMPLETED_PREDICATE = "http://www.w3.org/2002/12/cal/ical#completed";

//react components for hooks

function CompletedBody({ checked, handleCheck }) {
    const { thing } = useThing();
    return (
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={() => handleCheck(thing, checked)}
        />
      </label>
    );
}

function DeleteButton({ deleteTodo }) {
    const { thing } = useThing();
    return (
      <button className="delete-button" onClick={() => deleteTodo(thing)}>
        Delete
      </button>
    );
}

//main function

function TodoList({ todoList, setTodoList }) {
    const { fetch } = useSession();

    const todoThings = todoList ? getThingAll(todoList) : [];
    todoThings.sort((a, b) => {
        return (
          getDatetime(a, CREATED_PREDICATE) - getDatetime(b, CREATED_PREDICATE)
        );
    });

    const handleCheck = async (todo, checked) => {
        const todosUrl = getSourceUrl(todoList);
        let updatedTodos;
        let date;
        if (!checked) {
          date = new Date();
          const doneTodo = addDatetime(todo, COMPLETED_PREDICATE, date);
          updatedTodos = setThing(todoList, doneTodo, { fetch });
        } else {
          const date = getDatetime(todo, COMPLETED_PREDICATE);
          const undoneTodo = removeDatetime(todo, COMPLETED_PREDICATE, date);
          updatedTodos = setThing(todoList, undoneTodo, { fetch });
        }
        const updatedList = await saveSolidDatasetAt(todosUrl, updatedTodos, {
          fetch,
        });
        setTodoList(updatedList);
    };

    const deleteTodo = async (todo) => {
        const todosUrl = getSourceUrl(todoList);
        const updatedTodos = removeThing(todoList, todo);
        const updatedDataset = await saveSolidDatasetAt(todosUrl, updatedTodos, {
            fetch,
        });
        setTodoList(updatedDataset)
    };

    const thingsArray = todoThings
        //filters for todo-type predicates, (don't think this is needed in current version) but it can be an extra check
        .filter((t) => getUrl(t, TYPE_PREDICATE) === TODO_CLASS)
        .map((t) => {
            return { dataset: todoList, thing: t }; 
        
        });

    if (!thingsArray.length) return null;

    return (
        <div className="table-container">
            <span className="tasks-message">
            Your to-do list has {todoThings.length} items
            </span>
            <Table className="table" things={thingsArray}>
                <TableColumn 
                    property={TEXT_PREDICATE} 
                    header="To Do" 
                    sortable
                />
                <TableColumn
                    property={CREATED_PREDICATE}
                    dataType="datetime"
                    header="Created At"
                    body={({ value }) => value.toDateString()}
                    sortable
                />
                <TableColumn
                    property={COMPLETED_PREDICATE}
                    dataType="datetime"
                    header="Done"
                    body={({ value }) => <CompletedBody checked={Boolean(value)} handleCheck={handleCheck} />}
                />
                <TableColumn
                    property={TEXT_PREDICATE}
                    header=""
                    body={() => <DeleteButton deleteTodo={deleteTodo} />}
                />
            </Table>
        </div>
    );
}

export default TodoList;
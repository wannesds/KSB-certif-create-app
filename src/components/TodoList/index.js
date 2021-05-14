import React from "react";
import { getThingAll, getUrl } from "@inrupt/solid-client";
import { Table, TableColumn } from "@inrupt/solid-ui-react";

function TodoList({ todoList }) {
    const todoThings = todoList ? getThingAll(todoList) : [];
    
    const TEXT_PREDICATE = "http://schema.org/text";
    const CREATED_PREDICATE = "http://www.w3.org/2002/12/cal/ical#created";
    const TODO_CLASS = "http://www.w3.org/2002/12/cal/ical#Vtodo";
    const TYPE_PREDICATE = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type";
    const COMPLETED_PREDICATE = "http://www.w3.org/2002/12/cal/ical#completed";

    const thingsArray = todoThings.filter((t) => getUrl(t, TYPE_PREDICATE) === TODO_CLASS).map((t) => {
        return { dataset: todoList, thing: t }; 
        //filters for todo-type predicates, (don't think this is needed in current version) but it can be an extra check
    });

    if (!thingsArray.length) return null;

    return (
        <div className="table-container">
            <span className="tasks-message">
            Your to-do list has {todoThings.length} items
            </span>
            <Table className="table" things={thingsArray}>
            <TableColumn property={TEXT_PREDICATE} header="" />
                <TableColumn
                    property={CREATED_PREDICATE}
                    dataType="datetime"
                    header="Created At"
                    body={({ value }) => value.toDateString()}
                />
                <TableColumn
                    property={COMPLETED_PREDICATE}
                    dataType="datetime"
                    header="Done"
                    body={({ value }) => (
                        <label>
                            <input type="checkbox" />
                        </label>
                    )}
                />
            </Table>
        </div>
    );
}

export default TodoList;
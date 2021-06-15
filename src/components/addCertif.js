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


const TEXT_PREDICATE = "http://schema.org/text";
const CREATED_PREDICATE = "http://www.w3.org/2002/12/cal/ical#created";
//const TODO_CLASS = "http://www.w3.org/2002/12/cal/ical#Vtodo";
const TYPE_PREDICATE = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type";
const CERTIFICATION_CLASS = "http://data.europa.eu/snb/credential/e34929035b";

function AddCertif({ data, validTxn, certifList, setCertifList}) {

  const { session } = useSession();
  //const [todoText, setTodoText] = useState("");
  const addCertif = async () => {
    const indexUrl = getSourceUrl(certifList);
    const todoWithText = addStringNoLocale(createThing(), TEXT_PREDICATE, data.certifID);
    const todoWithDate = addDatetime(
      todoWithText,
      CREATED_PREDICATE,
      new Date()
    );
    const todoWithType = addUrl(todoWithDate, TYPE_PREDICATE, CERTIFICATION_CLASS);
    const updatedTodoList = setThing(certifList, todoWithType);
    const updatedDataset = await saveSolidDatasetAt(indexUrl, updatedTodoList, {
      fetch: session.fetch,
    });
    setCertifList(updatedDataset)
    console.log("Certif added to pod :", data.certifID);
  }
  
  const callAddCertif = async () => {
    addCertif()
  }
 

  return(
    <button onClick={callAddCertif} className="ma3">
      Add to my pod
    </button>
  );
  //implement a button to initialize
      
}

export default AddCertif;
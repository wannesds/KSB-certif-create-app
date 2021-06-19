import {
  addDatetime,
  addUrl,
  addStringNoLocale,
  createThing,
  getSourceUrl,
  saveSolidDatasetAt,
  setThing,
  AddOfType,
} from "@inrupt/solid-client";
import { useSession } from "@inrupt/solid-ui-react";
import React, {useState } from "react";


const TEXT_PREDICATE = "http://schema.org/text";
const CREATED_PREDICATE = "http://www.w3.org/2002/12/cal/ical#created";
const SHA1_PREDICATE = "http://xmlns.com/foaf/0.1/sha1";
const TYPE_PREDICATE = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type";
const CERTIFICATION_CLASS = "http://data.europa.eu/snb/credential/e34929035b";

function AddCertif({ data, validTxn, certifList, setCertifList}) {

  const { session } = useSession();
  //const [todoText, setTodoText] = useState("");
  const addCertif = async () => {
    //gets the chosen dataset to store things in
    const indexUrl = getSourceUrl(certifList);
    //creates a thing and adds triples to it each time needed using solid-client functions
    const certifWithText = addStringNoLocale(createThing(), TEXT_PREDICATE, data.certifID);
    const certifWithDate = addDatetime(certifWithText, CREATED_PREDICATE, new Date() );
    const certifWithHash = addStringNoLocale(certifWithDate, SHA1_PREDICATE, validTxn.hash);
    //adds correct class
    const certifWithType = addUrl(certifWithHash, TYPE_PREDICATE, CERTIFICATION_CLASS);
    //updates certification list with newly added thing
    const updatedCertifList = setThing(certifList, certifWithType);
    //saves dataset on Pod
    const updatedDataset = await saveSolidDatasetAt(indexUrl, updatedCertifList, {
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
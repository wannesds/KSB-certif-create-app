import React, { useEffect, useState } from "react";
import { LoginButton, LogoutButton, Text, useSession, CombinedDataProvider } from "@inrupt/solid-ui-react";
import { getSolidDataset, getUrlAll, getThing } from "@inrupt/solid-client";
import { getOrCreateCertifList } from "./utils/getOrCreateCertifList";
import AddCertif from "./components/addCertif";
import QueList from './components/queList.js';


//custom alchemy API for connecting to an ethereum node, seems good for developing purposes and low scale app usage

const STORAGE_PREDICATE = "http://www.w3.org/ns/pim/space#storage";

const authOptions = {
    clientName: "Certif-create App",
  };

function App() {

  const { session } = useSession();
  const [todoList, setTodoList] = useState();
  const [oidcIssuer, setOidcIssuer] = useState("");


  const handleChange = (event) => {
    setOidcIssuer(event.target.value);
  };


  useEffect(() => {
    if (!session || !session.info.isLoggedIn) return;
    (async () => {
      const profileDataset = await getSolidDataset(session.info.webId, {
        fetch: session.fetch,
      });
      const profileThing = getThing(profileDataset, session.info.webId);
      const podsUrls = getUrlAll(profileThing, STORAGE_PREDICATE);
      const pod = podsUrls[0];
      const containerUri = `${pod}certificates/`;
      await getOrCreateCertifList(containerUri, session.fetch);
    })();
  }, [session, session.info.isLoggedIn]);

  

  return (
    <div className="app-container">
      {session.info.isLoggedIn ? ( //logged in?
        <CombinedDataProvider
          datasetUrl={session.info.webId}
          thingUrl={session.info.webId}
        >
          <div className="message logged-in">
            <span>You are logged in as: </span>
            <Text properties={[
                "http://www.w3.org/2006/vcard/ns#fn",
                "http://xmlns.com/foaf/0.1/name",
              ]} />
              <LogoutButton />
          </div>
          <section>
            <AddCertif todoList={todoList} setTodoList={setTodoList}/>
            {/*<TodoList todoList={todoList} setTodoList={setTodoList}/> */}
          </section>
          <section>
            <QueList />
          </section>
        </CombinedDataProvider>
      ) : (  //if not logged in then
        <div className="message">
          <span>You are not logged in. </span>
          <span>
            Log in with:
            <input
              className="oidc-issuer-input "
              type="text"
              name="oidcIssuer"
              list="providers"
              value={oidcIssuer}
              onChange={handleChange}
            />
           <datalist id="providers">
             <option value="https://broker.pod.inrupt.com/" />
             <option value="https://inrupt.net/" />
             <option value="https://solidcommunity.net" />
           </datalist>
          </span>
          <LoginButton
            oidcIssuer={oidcIssuer}
            redirectUrl={window.location.href}
            authOptions={authOptions}
          />
        </div>
      )}
    </div>
  );
}

export default App;
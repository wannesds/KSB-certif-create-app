import React, { useEffect, useState } from "react";
import { LoginButton, LogoutButton, Text, useSession, CombinedDataProvider } from "@inrupt/solid-ui-react";
import { getSolidDataset, getUrlAll, getThing } from "@inrupt/solid-client";
import { getOrCreateCertifList } from "./utils/getOrCreateCertifList";
import AddCertif from "./components/addCertif";
import MerkleTools from "merkle-tools";
//import MerkleTree from "merkle-tools";
//custom alchemy API for connecting to an ethereum node, seems good for developing purposes and low scale app usage

const STORAGE_PREDICATE = "http://www.w3.org/ns/pim/space#storage";

const authOptions = {
    clientName: "Certif-create App",
  };

 const QueList = [
    {
      certifID : "UC-4fd7adbc-9a20-4a86-b3ed-ba179b88429c",
      WebID : "https://wannes.solidcommunity.net/"
    },
    {
      certifID : "UC-3a3efcc3-1aa0-1a5e-e498-51edd6b9a23a",
      WebID : "https://bob.solidcommunity.net/"
    },
    {
      certifID : "UC-2e5abd10-160c-9aed-b1fd-ba179b88429c",
      WebID : "https://alice.solidcommunity.net/"
    }
];


//section for connecting to eth thru metamask, put in own file and call it when user wants to do a transaction
window.addEventListener('load', async () => {
  const Web3 = require('web3');
  const web3 = new Web3("https://eth-rinkeby.alchemyapi.io/v2/aOmf3RlJunKUJcRWbVXWMdZukj_SMvTl");
  // Modern dapp browsers...
  if (window.ethereum) {
      window.web3 = new Web3("https://eth-rinkeby.alchemyapi.io/v2/aOmf3RlJunKUJcRWbVXWMdZukj_SMvTl");
      try {
          // Request account access if needed
          await window.ethereum.enable();
          // Acccounts now exposed

          //parameters will have to be optimised for easier usage, especially GAS
            const transactionParameters = {
              //nonce: '0x00', // ignored by MetaMask
              gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
              gas: '0x6710', // customizable by user during MetaMask confirmation.
              to: "0x69ce25019cF12de7f78f489cD413A868e44e251c", // Required except during contract publications.
              from: window.ethereum.selectedAddress, // must match user's active address.
              value: '100000000000', // Only required to send ether to the recipient from the initiating external account.
              data: '0x0aaa', // Optional, but used for defining smart contract creation and interaction.
              chainId: '0x3', // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
            };
            // // txHash is a hex string
            // // "As with any RPC call, it may throw an error"
            const txHash = await window.ethereum.request({
              //transaction gets signed with Browser Wallet
              method: 'eth_sendTransaction',
              params: [transactionParameters],
            })//callback hash passed down
            .then(txHash => {
              //transaction gets send to on-chain 
              window.ethereum.request({
                method: 'eth_sendRawTransaction',
                params: [txHash],
              })
            });
            //Show transaction processing progress, NEEDED UX feature 

      } catch (error) {
          // User denied account access...
      }
  }
  // Legacy dapp browsers...
  else if (window.web3) {
      window.web3 = new Web3(web3.currentProvider);
      // Acccounts always exposed
      web3.eth.sendTransaction({/* ... */});
  }
  // Non-dapp browsers...
  else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
  }
});

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
      const list = await getOrCreateCertifList(containerUri, session.fetch);
      //setTodoList(list);
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
//get logged in WebID and check it against WebID's from QueList
import { useSession } from "@inrupt/solid-ui-react";

//temp que list
const queFeed = [ 
    {
      certifID : "UC-4fd7adbc-9a20-4a86-b3ed-ba179b88429c",
      webID : "https://wannes.solidcommunity.net/profile/card#me"
    },
    {
      certifID : "UC-003efcc3-1aa0-1a5e-e498-51fd0104423a",
      webID : "https://wannes.solidcommunity.net/profile/card#me"
    },
    {
      certifID : "UC-115abd10-160c-9aed-b1fd-6a37e2f12d9a",
      webID : "https://wannes.solidcommunity.net/profile/card#me"
    }
];

function CheckQue(){
  const { session } = useSession();
  
  //checks the certif que feed for all that match user Pod WebID
  const queFeedRes = queFeed.filter(item => item.webID === session.info.webId);
  //trim "profile/card#me"
  //get multiple items in array
  return(queFeedRes);
}

export default CheckQue;

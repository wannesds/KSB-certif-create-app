//get logged in WebID and check it against WebID's from QueList
import { useSession } from "@inrupt/solid-ui-react";

//temp
const queList = [ 
    {
      certifID : "UC-4fd7adbc-9a20-4a86-b3ed-ba179b88429c",
      webID : "https://wannes.solidcommunity.net/profile/card#me"
    },
    {
      certifID : "UC-3a3efcc3-1aa0-1a5e-e498-51edd6b9a23a",
      webID : "https://bob.solidcommunity.net/"
    },
    {
      certifID : "UC-2e5abd10-160c-9aed-b1fd-ba179b88429c",
      webID : "https://alice.solidcommunity.net/"
    }
];

export async function CheckQue(){
  const { session } = useSession();
    //trim "profile/card#me"
    return queList.find(x => x.webID===session.info.webId)
}

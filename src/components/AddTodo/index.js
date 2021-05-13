import { getSolidDataset, getThing, getUrlAll } from "@inrupt/solid-client";
import { useSession } from "@inrupt/solid-ui-react";
import React, { useEffect, useState } from "react";
import { getOrCreateTodoList } from "../../utils";

function AddTodo() {
  const { session } = useSession();
  const [todoList, setTodoList] = useState();

  useEffect(() => {
    if (!session) return;
    (async () => {
      const profileDataset = await getSolidDataset(session.info.webId, {
        fetch: session.fetch,
      });
      const profileThing = getThing(profileDataset, session.info.webId);
      const podsUrls = getUrlAll(
        profileThing,
        "http://www.w3.org/ns/pim/space#storage"
      );
      const pod = podsUrls[0];
      const containerUri = `${pod}todos/`;
      const list = await getOrCreateTodoList(containerUri, session.fetch);
      setTodoList(list);
    })();
  }, [session]);

  return <button className="add-button">Add Todo</button>;
}

export default AddTodo;
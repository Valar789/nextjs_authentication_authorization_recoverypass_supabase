import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

export default function UserLinks({ user_id }) {
  const [links, setLinks] = useState([]);
  const [link, setLink] = useState(null);

  useEffect(() => {
   

    subscribeToInserts();
    loadList( )
  }, []);

  const loadList = async () =>{
    (async () => {
        let { data, error } = await supabase.from("links").select("*");
        setLinks(data);
      })();
  }

  const subscribeToInserts = async () => {
    supabase.channel('*')
    .on('postgres_changes', { event: '*', schema: '*' }, loadList)
    .subscribe()
  };

  const addLink = async () => {
    try {
      const { data, error } = await supabase
        .from("links")
        .insert([{ name: link, user_id }]);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div>
      <input
        onChange={(e) => setLink(e.target.value)}
        className="input-group-text"
        type="text"
        required
      />
      <button onClick={addLink} className="btn btn-primary my-2">
        Agregar
      </button>
      <ul>
        {links.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

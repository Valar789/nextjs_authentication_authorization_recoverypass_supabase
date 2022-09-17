import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import UserLinks from "./UserLinks";

export default function PrivateArea() {
  const [userSession, setUserSession] = useState({});


  useEffect(() => {
    (async () => {
      const dataSession = await supabase.auth.getSession();
      setUserSession(dataSession.data.session.user);
    })();
  }, []);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <>
      {userSession && (
        <div className="container">
          <h1 className="m-4">Esto solo se muestra si esta logueado</h1>
          <button onClick={handleLogout} className="btn btn-danger m-4">
            Cerrar Sesion
          </button>
          <h1 className="mt-4">Links</h1>
          <UserLinks user_id={userSession.id} />
        </div>
      )}
    </>
  );
}

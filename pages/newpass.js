import { useRouter } from "next/router";
import { useState } from "react";
import { supabase } from "../utils/supabaseClient";

export default function newpass() {
   const{push}= useRouter()
  const [new_password, setNew_password] = useState("");
  
  const [confirmpass, setConfirmpass] = useState("");
  const handleReset = async () => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        password: new_password,
      });
      if (error) throw error
      alert('las constraseña se cambio correactamente')
      push('/')
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className="container">
      <h1>Formulario para cambio de contraseña </h1>
      <div className="field mt-3">
        <label className="">Escribe la nueva contraseña</label>
        <input
          autoComplete="off"
          required
          onChange={(e) => setNew_password(e.target.value)}
          type="password"
          className="input-group-text"
        />
        <div className="field mt-3">
          <label className="">Confirma la contraseña</label>
          <input
            autoComplete="off"
            required
            type="password"
            className="input-group-text"
          />
        </div>
        <button onClick={handleReset} className="btn btn-success mt-4">
          Guardar nueva contraseña
        </button>
      </div>
    </div>
  );
}

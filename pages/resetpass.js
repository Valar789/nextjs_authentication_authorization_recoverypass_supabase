import { useState } from "react";
import { supabase } from "../utils/supabaseClient";

export default function resetpass () {
    const [email, setemail] = useState('')

    const resetPassword = async() =>{
        try {
          const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: 'http://localhost:3000/newpass',
          })
          alert('Revisa tu correo')
        } catch (e) {
          console.log(e.message);
        }
      }
  return (
    <div className="container">
      <div className="mt-4">
      <h1>Confirma tu correo</h1>
      <div className="sigin mt-4">
        <div className="field">
          <label className="">Email</label>
          <input
            onChange={(e) => setemail(e.target.value)}
            type="email"
            required
            className="input-group-text"
          />
        </div>
        <button onClick={resetPassword} className="btn btn-success my-4">
          Registrarse
        </button>
      </div>
    </div>
    </div>
  );
}

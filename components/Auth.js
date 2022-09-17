import react, { useState } from "react";
import { supabase } from "../utils/supabaseClient";

export default function Auth() {

  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(true)

  const handleSingUp = async () =>{
    try {
        const { user, session, error } = await supabase.auth.signUp({
            email,
            password,
          })
          if (error) throw error
          alert('revisa tu correo para confirmar')
    } catch (error) {
        alert(error);
    }
  }

  const handleSingIn = async () =>{
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          })
          if (error) throw error
          alert('has iniciado sesion')
     
    } catch (error) {
        alert(error);
    }
  }

  const changeForm = () =>{
    setIsSignUp(value => !value)

  }
  return (
    <div className="mt-4">
      <h1>{isSignUp ? 'Sing-Up' : 'Login'}</h1>
      <div className="sigin mt-4">
        <div className="field">
          <label className="">
            Email
          </label>
          <input
            onChange={e=>setemail(e.target.value)}
            type="email"
            required
            className="input-group-text"
          />
        </div>
        <div className="field mt-3">
          <label  className="">
            Contraseña
          </label>
          <input
           autoComplete="off"
            required
            onChange={e=>setpassword(e.target.value)}
            type="password"
            className="input-group-password"
          />
        </div>
        {
            isSignUp && <button onClick={handleSingUp} className="btn btn-success my-4">Registrarse</button>
        }
         {
            !isSignUp && <button onClick={handleSingIn} className="btn btn-primary my-4">Login</button>
        }
      </div>
      <a onClick={changeForm} href="#!">{isSignUp ? 'Ya tienes cuenta? Inicia sesion': 'Eres nuevo? registrate'}</a>
    </div>
  );
}

import { useState } from "react";
import appFirebase from "../credentials";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const auth = getAuth(appFirebase);

const Login = () => {
  const [registrando, setRegistrando] = useState(false);

  const funcAuth = async (e) => {
    e.preventDefault();
    const correo = e.target.email.value;
    const contrasena = e.target.password.value;
    
    if (registrando) {
      try {
        await createUserWithEmailAndPassword(auth, correo, contrasena);
      } catch (err) {
        alert("la contraseña debe de tener mas de 8 caraceres");
      }
    } else {
      try {
        await signInWithEmailAndPassword(auth, correo, contrasena);
      } catch (error) {
        alert("el correo o contraseña son incorrectos");
      }
    }
  };

  return (
    <div className="bg-black grid justify-center items-center h-72 p-10 rounded-md">
      <h1 className="text-center text-red-600 font-bold">{registrando? 'REGISTRARSE': 'INICIAR SESION'}</h1>
      <form className="grid gap-3 " onSubmit={funcAuth}>
        <input className="text-black text-center" type="text" placeholder="Correo" id="email" />
        <input className="text-black text-center" type="password" placeholder="Contraseña" id="password" />
        <button>{registrando ? "registrate" : "iniciar sesion"}</button>
      </form>
      <h4>
        {registrando ? "¿Ya tienes cuenta? " : "¿No tienes una cuenta? "}
        <button onClick={() => setRegistrando(!registrando)}>
          {registrando ? "inicia sesion" : "registrate"}
        </button>
      </h4>
    </div>
  );
};

export default Login;

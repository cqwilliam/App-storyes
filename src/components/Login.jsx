import React, { useState } from "react";

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
      await createUserWithEmailAndPassword(auth, correo, contrasena);
    } else {
      await signInWithEmailAndPassword(auth, correo, contrasena);
    }
  };

  return (
    <div>
      <form action="" onSubmit={funcAuth}>
        <input type="text" placeholder="Correo" id="email" />
        <input type="password" placeholder="Contraseña" id="password" />
        <button>{registrando ? "registrate" : "iniciar sesion"}</button>
      </form>
      <h4>
        {registrando ? "si tienes cuenta" : "no tienes una cuenta"}
        <button onClick={() => setRegistrando(!registrando)}>
          {registrando ? "inicia sesion" : "registrate"}
        </button>
      </h4>
    </div>
  );
};

export default Login;

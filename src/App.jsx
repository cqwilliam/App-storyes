import React, { useState } from "react";
import appFirebase from "./credentials";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Login from "./components/Login";
import Home from "./components/Home";

const auth = getAuth(appFirebase);

Login;
Home;

const App = () => {
  const [usuario, setUsuario] = useState(null);

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      setUsuario(usuarioFirebase);
    } else {
      setUsuario(null);
    }
  });

  return (
    <div>
      <div>{usuario ? <Home correoUsuario={usuario.email} /> : <Login />}</div>
    </div>
  );
};

export default App;
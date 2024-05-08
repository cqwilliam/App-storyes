// import React, { useState } from "react";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AppRouter } from "./components/routes/AppRouter";

// const auth = getAuth(appFirebase);

const App = () => {
  // const [usuario, setUsuario] = useState(null);

  // onAuthStateChanged(auth, (usuarioFirebase) => {
  //   if (usuarioFirebase) {
  //     setUsuario(usuarioFirebase);
  //   } else {
  //     setUsuario(null);
  //   }
  // });

  return (
    <div>
      <AppRouter/>
      {/* <div>{usuario ? <Home correoUsuario={usuario.email} /> : <Login />}</div> */}
    </div>
  );
};

export default App;
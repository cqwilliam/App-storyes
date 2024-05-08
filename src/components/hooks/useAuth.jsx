import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import appFirebase from "../../credentials";

const auth = getAuth(appFirebase);

export const useAuth = () => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuarioFirebase) => {
      if (usuarioFirebase) {
        setUsuario(usuarioFirebase);
        console.log('usuario existe');
      } else {
        setUsuario(null);
        console.log('usuario no existe');
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // console.log(usuario);
  return { usuario };
};

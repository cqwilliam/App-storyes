import { useEffect, useState } from "react";
import { useAuth } from "../components/hooks/useAuth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../credentials";

const RegisterName = () => {
  const { usuario } = useAuth(); // Obtener el usuario autenticado

  const [usersList, setUsersList] = useState([]);
  const [newName, setNewName] = useState("");
  const [newEdad, setNewEdad] = useState(0);
  const [newNacionalidad, setNewNacionalidad] = useState("");
  const [userExists, setUserExists] = useState(false);

  const usersCollectionRef = collection(db, "users"); // Referencia a la colección "users" en Firestore

  useEffect(() => {
    const getUsersList = async () => {
      if (usuario) {
        // Si el usuario está autenticado
        try {
          const q = query(usersCollectionRef, where("uid", "==", usuario.uid)); // Consultar documentos donde el uid coincida con el del usuario
          const data = await getDocs(q);
          const filteredData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setUsersList(filteredData); // Actualizar la lista de usuarios con los datos filtrados
          setUserExists(!data.empty); // Verificar si el usuario ya ha hecho una publicación
        } catch (err) {
          console.error(err);
        }
      }
    };
    getUsersList(); // Ejecutar la función para obtener la lista de usuarios
  }, [usuario]); // Dependencia en usuario para ejecutar cuando cambie

  const onSubmitUsers = async (e) => {
    e.preventDefault(); // Prevenir el envío del formulario
    if (userExists) {
      alert("Ya has hecho una publicación.");
      return;
    }

    try {
      await addDoc(usersCollectionRef, {
        uid: usuario.uid, // Guardar el uid del usuario
        // author: usuario.displayName, // Guardar el email del autor
        nombre: newName, // Guarda el nombre del autor
        edad: newEdad, // Guarda la edad del autor
        nacionalidad: newNacionalidad, // Guarda la nacionalidad del autor
      });

      const q = query(usersCollectionRef, where("uid", "==", usuario.uid)); // Consultar de nuevo para obtener los datos actualizados
      const data = await getDocs(q);
      const updatedData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUsersList(updatedData); // Actualizar la lista de usuarios con los datos actualizados
      setUserExists(true); // Marcar que el usuario ya ha hecho una publicación
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="grid justify-center items-center h-screen">
      {!userExists ? (
        <form className="grid w-96 gap-5" onSubmit={onSubmitUsers}>
          <input
            type="text"
            placeholder="Nombre"
            onChange={(e) => setNewName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Edad"
            onChange={(e) => setNewEdad(Number(e.target.value))}
          />
          <input
            type="text"
            placeholder="Nacionalidad"
            onChange={(e) => setNewNacionalidad(e.target.value)}
          />
          <button type="submit">Enviar datos</button>
        </form>
      ) : (
        <p>Gracias por registrarte.</p>
      )}
      <div>
        {usersList.map((user) => (
          <div key={user.id}>
            <div>BIENVENIDO {user.nombre}</div>
          </div>
        ))}
      </div>
      {/* <div>
        {usersList.map((user) => (
          <div key={user.uid}>
            <div>nombre: {user.nombre}</div>
            <div>edad: {user.edad}</div>
            <div>nacionalidad: {user.nacionalidad}</div>
          </div>
          <div>autor: {user.author}</div> Mostrar el nombre del autor 
        ))}
      </div> */}
    </div>
  );
};

export default RegisterName;

import React, { useEffect, useState } from "react";
// import appFirebase from "../credentials";
import { signOut } from "firebase/auth";
import { db } from "../credentials";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const Home = ({ correoUsuario }) => {
  const [postsLists, setPostsLists] = useState([]);

  //new posts states
  const [newTitle, setNewtitle] = useState("");
  const [newSubTitle, setNewSubTitle] = useState("");

  //update posts states
  // const [updateTitle, setUpdateTitle]=
  const postsCollectionRef = collection(db, "posts");

  useEffect(() => {
    const getPostsLists = async () => {
      try {
        const data = await getDocs(postsCollectionRef);
        const filterData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setPostsLists(filterData);
        // console.log(filterData)
      } catch (err) {
        console.error(err);
      }
    };
    getPostsLists();
  }, []);

  const onSubmitPosts = async () => {
    try {
      await addDoc(postsCollectionRef, {
        title: newTitle,
        subtitle: newSubTitle,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
  };

  return (
    <div>
      Estas en la página Home{correoUsuario}
      <div>
        <button onClick={() => signOut(auth)}>Logout</button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Escribe el título"
          onChange={(e) => setNewtitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="aqui va un subtitulo"
          onChange={(e) => setNewSubTitle(e.target.value)}
        />
        <button onClick={onSubmitPosts}>SUBMIT POSTS</button>
      </div>
      <div>
        {postsLists.map((posts) => (
          <div key={posts.id}>
            <h1>{posts.title}</h1>
            <p>{posts.subtitle}</p>
            <button onClick={() => deletePost(posts.id)}>Eliminar</button>
            {/* <button>ACTUALIZAR</button> */}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;

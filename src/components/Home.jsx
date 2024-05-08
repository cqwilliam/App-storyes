import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import appFirebase, { db } from "../credentials";
import { getAuth } from "firebase/auth";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import PropTypes from "prop-types";
import Post from "./Post"; // Importa el nuevo componente

const auth = getAuth(appFirebase);

const Home = ({ correoUsuario }) => {
  const [postsLists, setPostsLists] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newSubTitle, setNewSubTitle] = useState("");
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
      } catch (err) {
        console.error(err);
      }
    };
    getPostsLists();
  }, [postsCollectionRef]);

  const onSubmitPosts = async () => {
    try {
      await addDoc(postsCollectionRef, {
        title: newTitle,
        subtitle: newSubTitle,
        author: correoUsuario,
      });
      setNewTitle("");
      setNewSubTitle("");
    } catch (err) {
      console.error(err);
    }
  };

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
  };

  return (
    <div className=" ">
      Estás en la página Home{correoUsuario}
      <div>
        <button onClick={() => signOut(auth)}>Logout</button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Escribe el título"
          // value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Aquí va un subtítulo"
          // value={newSubTitle}
          onChange={(e) => setNewSubTitle(e.target.value)}
        />
        <button onClick={onSubmitPosts}>SUBMIT POSTS</button>
      </div>
      <div>
        {postsLists.map((post) => (
          <Post key={post.id} post={post} onDelete={deletePost} />
        ))}
      </div>
    </div>
  );
};

Home.propTypes = {
  correoUsuario: PropTypes.string,
};

Home.defaultProps = {
  correoUsuario: "any",
};

export default Home;

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import appFirebase, { db } from "../credentials";
import { getAuth } from "firebase/auth";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import PropTypes from "prop-types";
import Post from "../components/Post";
import { useAuth } from "../components/hooks/useAuth";

const auth = getAuth(appFirebase);

const Home = () => {
  const { usuario } = useAuth();

  const [postsLists, setPostsLists] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newSubTitle, setNewSubTitle] = useState("");
  const [currentPostId, setCurrentPostId] = useState(null);

  const postsCollectionRef = collection(db, "posts");
  const correoUsuario = usuario?.email;

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
        console.error("Error fetching posts:", err);
      }
    };
    getPostsLists();
  }, []);

  const onSubmitPosts = async () => {
    try {
      if (currentPostId) {
        const postDoc = doc(db, "posts", currentPostId);
        await updateDoc(postDoc, { title: newTitle, subtitle: newSubTitle });
        setPostsLists(
          postsLists.map((post) =>
            post.id === currentPostId
              ? { ...post, title: newTitle, subtitle: newSubTitle }
              : post
          )
        );
      } else {
        const docRef = await addDoc(postsCollectionRef, {
          title: newTitle,
          subtitle: newSubTitle,
          author: correoUsuario,
        });
        setPostsLists((prev) => [
          ...prev,
          {
            id: docRef.id,
            title: newTitle,
            subtitle: newSubTitle,
            author: correoUsuario,
          },
        ]);
      }
      resetForm();
    } catch (err) {
      console.error("Error submitting post:", err);
    }
  };

  const resetForm = () => {
    setNewTitle("");
    setNewSubTitle("");
    setCurrentPostId(null);
  };

  const deletePost = async (id) => {
    const postToDelete = postsLists.find((post) => post.id === id);
    if (!postToDelete || postToDelete.author !== correoUsuario) {
      alert("No puedes eliminar este post");
      return;
    }
    try {
      const postDoc = doc(db, "posts", id);
      await deleteDoc(postDoc);
      setPostsLists(postsLists.filter((post) => post.id !== id));
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  const editPost = (post) => {
    setNewTitle(post.title);
    setNewSubTitle(post.subtitle);
    setCurrentPostId(post.id);
  };

  return (
    <div className="">
      Estás en la página Home {correoUsuario}
      <div>
        <button onClick={() => signOut(auth)}>Logout</button>
        <button>
          <Link to="/hola">ir a RegisterName</Link>
        </button>
      </div>
      <div className="text-black">
        <input
          type="text"
          placeholder="Escribe el título"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Aquí va un subtítulo"
          value={newSubTitle}
          onChange={(e) => setNewSubTitle(e.target.value)}
        />
        <button onClick={onSubmitPosts}>
          {currentPostId ? "Actualizar" : "Submit Post"}
        </button>
      </div>
      <div>
        {postsLists.map((post) => (
          <Post
            key={post.id}
            post={post}
            onDelete={deletePost}
            onEdit={editPost}
          />
        ))}
      </div>
    </div>
  );
};

Home.propTypes = {
  correoUsuario: PropTypes.string,
};

Home.defaultProps = {
  correoUsuario: "ANY",
};

export default Home;

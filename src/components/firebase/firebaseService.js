import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../credentials";

const postsCollectionRef = collection(db, "posts");

export const getPostsLists = async () => {
  const data = await getDocs(postsCollectionRef);
  return data.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
};

export const addPost = async (newPost) => {
  const docRef = await addDoc(postsCollectionRef, newPost);
  return { ...newPost, id: docRef.id };
};

export const updatePost = async (id, updatedPost) => {
  const postDoc = doc(db, "posts", id);
  await updateDoc(postDoc, updatedPost);
};

export const deletePost = async (id) => {
  const postDoc = doc(db, "posts", id);
  await deleteDoc(postDoc);
};

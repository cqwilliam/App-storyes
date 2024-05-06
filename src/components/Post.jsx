import React from "react";
import PropTypes from "prop-types";

const Post = ({ post, onDelete }) => {
  return (
    <div key={post.id}>
      <h1>{post.title}</h1>
      <p>{post.subtitle}</p>
      <p>Publicado por: {post.author}</p>
      <button onClick={() => onDelete(post.id)}>Eliminar</button>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    author: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Post;

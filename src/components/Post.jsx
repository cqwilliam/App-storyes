import PropTypes from "prop-types";

const Post = ({ post, onDelete, onEdit }) => {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.subtitle}</p>
      <p>Publicado por: {post.author}</p>
      <button onClick={() => onDelete(post.id)}>Eliminar</button>
      <button onClick={() => onEdit(post)}>Editar</button>
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
  onEdit: PropTypes.func.isRequired,
};

export default Post;

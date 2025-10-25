import axios from "axios";
import { useEffect, useState } from "react";

const Trational = () => {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPost = async () => {
    try {
      const response = await axios.get("http://localhost:4000/posts");
      setPost(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Posts:</h2>
      <ul>
        {post.map((post) => (
          <li key={post.id}>
            <li>{post.title}</li>
            <span>{post.body}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Trational;

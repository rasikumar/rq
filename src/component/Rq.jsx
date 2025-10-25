import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const fetchPost = async () => {
  return await axios.get("http://localhost:4000/posts");
};

const createPost = (post) => {
  return axios.post("http://localhost:4000/posts", post);
};

const Rq = () => {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPost,
  });

  const { mutate } = useMutation({
    mutationFn: createPost,
    onSuccess: (postData) => {
      // queryClient.invalidateQueries("posts");
      queryClient.setQueryData(["posts"], (previousData) => {
        return {
          ...previousData,
          data: [...previousData.data, postData.data],
        };
      });
    },
  });

  const handlesumbit = (e) => {
    e.preventDefault();
    const data = { title, body };
    mutate(data);

    setTitle("");
    setBody("");
  };

  console.log({ isLoading, isFetching });

  if (isLoading) {
    return <div className="container">Loading...</div>;
  }
  if (isError) {
    return <div className="container">Error: {error.message}</div>;
  }

  return (
    <div className="container">
      <h2>Posts:</h2>
      <form onSubmit={handlesumbit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button>Sumbit</button>
      </form>
      <ul className="post-list">
        {data?.data.map((post) => (
          <li key={post.id} className="post-item">
            <Link to={`/rq-posts/${post.id}`} className="post-link">
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Add some basic styles
const styles = `
  .container {
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  .post-list {
    list-style-type: none;
    padding: 0;
  }
  .post-item {
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
  }
  .post-link {
    text-decoration: none;
    color: #333;
  }
  .post-link h3 {
    margin: 0;
    font-size: 1.2em;
  }
  .post-link p {
    margin: 5px 0 0;
    color: #666;
  }
`;

// Inject styles into the document head
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default Rq;

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";

const fetchDataId = (id) => {
  return axios.get(`http://localhost:4000/posts/${id}`);
};
const PosyIndPage = () => {
  const { id } = useParams();
  console.log(id);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => fetchDataId(id),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  const { title, body } = data?.data || {};

  return (
    <div>
      <h2>{title}</h2>
      <p>{body}</p>
      <button onClick={() => console.log("Button clicked!")}>Click me!</button>
    </div>
  );
};

export default PosyIndPage;

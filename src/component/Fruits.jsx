import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";

// Fetch function
const fetchFruits = async (page) => {
  const response = await axios.get(
    `http://localhost:4000/fruits?_limit=4&_page=${page}`
  );

  // Extract total count from headers (if provided by the server)
  const totalCount = response.headers["x-total-count"];
  return { data: response.data, totalCount: Number(totalCount) };
};

const Fruits = () => {
  const [page, setPage] = useState(1); // Current page
  const [totalCount, setTotalCount] = useState(0); // Total count
  const queryClient = useQueryClient(); // Query Client

  // Fetch data
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["fruits", page], // Include page in queryKey
    queryFn: () => fetchFruits(page),
    keepPreviousData: true, // Keep old data while fetching new data
    onSuccess: (result) => {
      setTotalCount(result.totalCount); // Set total count
    },
  });

  // Prefetch next page
  React.useEffect(() => {
    if (page < Math.ceil(totalCount / 4)) {
      queryClient.prefetchQuery(["fruits", page + 1], () =>
        fetchFruits(page + 1)
      );
    }
  }, [page, queryClient, totalCount]);

  // Handle loading and errors
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <ul>
        {data.data.map((fruit) => (
          <li key={fruit.id}>{fruit.name}</li>
        ))}
      </ul>

      <div style={{ marginTop: "10px" }}>
        {/* Pagination buttons */}
        <button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1} // Disable if on first page
        >
          Prev Page
        </button>
        <span style={{ margin: "0 10px" }}>
          Page {page} of {Math.ceil(totalCount / 4)}
        </span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === Math.ceil(totalCount / 4)} // Disable if on last page
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default Fruits;

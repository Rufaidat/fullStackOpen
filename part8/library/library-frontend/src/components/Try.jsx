import React from "react";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
function Try() {
  const [genre, setGenre] = useState("crim");
  const result = useQuery(ALL_BOOKS, {
    variables: { genre },
    skip: !genre,
  });

  if (genre && result.data) {
    return (
      <p>
        yes
        {console.log(result.data)}
      </p>
    );
  }
  return <p>no</p>;
}

export default Try;

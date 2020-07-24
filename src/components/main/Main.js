import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export const Main = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('')

  useEffect(() => {
    async function fetchData() {
      let response = await axios(
        "https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas"
      );
      setData(response.data.results);
    }
    fetchData();
  }, []);

  const filteredData = data.filter((worker) =>
    worker.first_name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
  )

  console.log(filteredData)

  return (
    <div>
      testing main
      <form className="">
        <input
          type="text"
          placeholder="Search for..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          name="query"
        />
      </form>
      <ul>
        {data.map((worker) => (
          <li key={worker.id}>
            <a href={worker.id}>
              {worker.first_name}
              {worker.last_name}
            </a>
            <li>{worker.profession}</li>
          </li>
        ))}
      </ul>
    </div>
  );
};

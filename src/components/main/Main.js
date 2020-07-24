import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export const Main = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('')


  //Fetch data on 1st load
  useEffect(() => {
    async function fetchData() {
      let response = await axios(
        "https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas"
      );
      setData(response.data.results);
    }
    fetchData();
  }, []);

  //Filtering
  const filteredFirstName = data.filter((worker) =>
    worker.first_name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
  )
  const filteredLastName = data.filter((worker) =>
    worker.last_name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
  )
  const filteredProfession = data.filter((worker) =>
    worker.profession.toLocaleLowerCase().includes(query.toLocaleLowerCase())
  )

  const filteredData = [...new Set([...filteredFirstName, ...filteredProfession, ...filteredLastName])]
  

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
        {filteredData.map((worker) => (
          <li key={worker.id}>
          <Link to={`/${worker.id}`}>{worker.id}</Link>
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

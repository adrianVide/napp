import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export const Main = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let response = await axios('https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas')
      setData(response.data.results)
    }
    fetchData()
  }, [])

  return (
    <div>
      testing main
      <ul>
        {data.map((worker) => (
          <li key={worker.id}>
            <a href={worker.id}>{worker.first_name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

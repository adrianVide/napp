import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./main.css";

export const Main = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");

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
  );
  const filteredLastName = data.filter((worker) =>
    worker.last_name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
  );
  const filteredProfession = data.filter((worker) =>
    worker.profession.toLocaleLowerCase().includes(query.toLocaleLowerCase())
  );

  const filteredData = [
    ...new Set([
      ...filteredFirstName,
      ...filteredProfession,
      ...filteredLastName,
    ]),
  ];

  return (
    <div className="master">
      <div className="main">
        <div className="search-container">
          <form className="searchbar">
            <input
              type="text"
              placeholder="Search for..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              name="query"
            />
          </form>
        </div>

        <h1>Find your Oompa Loompa</h1>
        <p className='subtitle'>There are more than 100k</p>
        <div className="cards">
          {filteredData.map((worker) => (
            <Link to={`/${worker.id}`} className="card">
              <div key={worker.id}>
                <img src={worker.image} alt="worker" className='card-image'/>
                <div>
                  <h4>
                    <b>
                      {worker.first_name} {worker.last_name}
                    </b>
                  </h4>
                  <p>{worker.profession}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

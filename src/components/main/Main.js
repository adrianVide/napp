import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./main.css";

export const Main = () => {
  const [pageData, setPageData] = useState();
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  //Fetch data on 1st load
  useEffect(() => {
    checkCache(1)
  }, []);

  //Checks if in 24hr range and sets data to cache or calls fetchData if out of 24hr range
  function checkCache(pageNumber) {
    let actualTime = Date.parse(new Date())
    let pageCache = Date.parse(window.localStorage.getItem(`timeCache${pageNumber}`))

    if (window.localStorage.getItem(`timeCache${pageNumber}`) != null && (actualTime - pageCache) < (24*60*60*1000)) {
      console.log('in 24hr range')
      setData(JSON.parse(window.localStorage.getItem(`cacheData${pageNumber}`)));
    } else {
      fetchData(pageNumber)
    }
  }

  //Fetch data for each pageNumber and set to localstorage
  async function fetchData(pageNumber) {
    let response = await axios(
      `https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas?page=${pageNumber}`
    );
    setData(response.data.results);
    console.log("New fetched data");
    window.localStorage.setItem(
      `cacheData${pageNumber}`,
      JSON.stringify(response.data.results)
    );
    window.localStorage.setItem(`timeCache${pageNumber}`, new Date());
  }

  //Add non existing items to array

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
        <form className="searchbar">
          <input
            type="text"
            placeholder="Search for..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            name="query"
          />
        </form>

        <h1>Find your Oompa Loompa</h1>
        <p className="subtitle">There are more than 100k</p>
        <div className="cards">
          {filteredData.map((worker) => (
            <Link to={`/${worker.id}`} key={worker.id} className="card">
              <img src={worker.image} alt="worker" className="card-image" />
              <h2>
                <b>
                  {worker.first_name} {worker.last_name}
                </b>
              </h2>
              <p>{worker.gender === "F" ? "Female" : "Male"}</p>
              <p>{worker.profession}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

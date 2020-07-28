import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./main.css";
import useInfiniteScroll from "@closeio/use-infinite-scroll";

export const Main = () => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [page, loaderRef, scrollerRef] = useInfiniteScroll({ hasMore });
  const [query, setQuery] = useState("");

  //Rerender when scrolling
  useEffect(() => {
    (async () => {
      const realPage = page + 1;
      const data = await APIcall(realPage);
      setHasMore(realPage * 25 <= 500);
      setItems((prev) => [...prev, ...data]);
    })();
  }, [page]);

  //Grab from cache or call API and set cache for next load
  async function APIcall(realPage) {
    let actualTime = Date.parse(new Date());
    let pageCache = Date.parse(
      window.localStorage.getItem(`timeCache${realPage}`)
    );
    if (pageCache != null && actualTime - pageCache < 24 * 60 * 60 * 1000) {
      let cached = JSON.parse(
        window.localStorage.getItem(`cacheData${realPage}`)
      );
      return cached;
    } else {
      let response = await axios(
        `https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas?page=${realPage}`
      );
      window.localStorage.setItem(
        `cacheData${realPage}`,
        JSON.stringify(response.data.results)
      );
      window.localStorage.setItem(`timeCache${realPage}`, new Date());
      return response.data.results;
    }
  }

  //Filtering
  const filteredFirstName = items.filter((worker) =>
    worker.first_name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
  );
  const filteredLastName = items.filter((worker) =>
    worker.last_name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
  );
  const filteredProfession = items.filter((worker) =>
    worker.profession.toLocaleLowerCase().includes(query.toLocaleLowerCase())
  );

  //Filtered data to render
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
      {/* <form className="searchbar">
      <input className="input-control"
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            name="query">
      </input><img className='btn-img' src="https://s3.eu-central-1.amazonaws.com/napptilus/level-test/imgs/ic_search.png" />
    </form> */}
        <form className="searchbar">
          <input
            className="input-control"
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            name="query"
          ></input>
        
        </form>

        <h1>Find your Oompa Loompa</h1>
        <p className="subtitle">There are more than 100k</p>
        <div className="cards" ref={scrollerRef}>
          {filteredData.map((worker) => (
            <Link to={`/${worker.id}`} key={worker.id} className="card">
              <img src={worker.image} alt="worker" className="card-image" />
              <h2>
                {worker.first_name} {worker.last_name}
              </h2>
              <p className="main-info">
                {worker.gender === "F" ? "Female" : "Male"}
              </p>
              <p className="main-info profession">{worker.profession}</p>
            </Link>
          ))}
          {hasMore && <div ref={loaderRef}></div>}
        </div>
      </div>
    </div>
  );
};

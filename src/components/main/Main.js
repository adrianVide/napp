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

  useEffect(() => {
    (async () => {
      const realPage = page + 1;
      console.log(realPage)
      const data = await APIcall(realPage)
      console.log(data.total)
      // const data = await resp.json();
      // setHasMore(realPage * 25 <= 500);
      setHasMore(realPage * 25 <= 500);
      setItems(prev => [...prev, ...data.results]);
      console.log(page)
      console.log(hasMore)
    })();
  }, [page]);


  async function APIcall(realPage) {
    let response = await axios(
      `https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas?page=${realPage}`
    );
    return response.data;
  }


  return (
    <div className="master">
      <div className="main">
        <form className="searchbar">
          {/* <input
            type="text"
            placeholder="Search for..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            name="query"
          /> */}
        </form>

        <h1>Find your Oompa Loompa</h1>
        <p className="subtitle">There are more than 100k</p>
        <div className="cards" ref={scrollerRef}>
          {items.map((worker) => (
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
          {hasMore && <div ref={loaderRef}>Loading…</div>}
        </div>
      </div>
    </div>
  );
};

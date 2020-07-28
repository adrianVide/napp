import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";


import useInfiniteScroll from '@closeio/use-infinite-scroll';

import "./main.css";

const URL = 'https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas';

export default function Example() {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [page, loaderRef, scrollerRef] = useInfiniteScroll({ hasMore });

  useEffect(() => {
    (async () => {
      const realPage = page + 1;
      const resp = await fetch(`${URL}?page=${realPage}`);
      const data = await resp.json();
      setHasMore(realPage * 10 <= data.total);
      setItems(prev => [...prev, ...data.results]);
    })();
  }, [page]);

  return (
    <div ref={scrollerRef} className='cards'>
      {items.map((worker) => (
            <div to={`/${worker.id}`} key={worker.id} className="card">
              <img src={worker.image} alt="worker" className="card-image" />
              <h2>
                <b>
                  {worker.first_name} {worker.last_name}
                </b>
              </h2>
              <p>{worker.gender === "F" ? "Female" : "Male"}</p>
              <p>{worker.profession}</p>
            </div>
          ))}
      {hasMore && <div ref={loaderRef}>Loading…</div>}
    </div>
  );
}

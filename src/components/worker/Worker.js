import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./worker.css";

export const Worker = (props) => {
  const [data, setData] = useState({});

  useEffect(() => {
    async function fetchData() {
      let actualTime = Date.parse(new Date());
      let pageCache = Date.parse(
        window.localStorage.getItem(`timeCacheId${props.match.params.id}`)
      );
      if (pageCache != null && actualTime - pageCache < 24 * 60 * 60 * 1000) {
        let cached = JSON.parse(
          window.localStorage.getItem(`cacheDataId${props.match.params.id}`)
        );
        setData(cached);
      } else {
        let response = await axios(
          `https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas/${props.match.params.id}`
        );
        window.localStorage.setItem(
          `cacheDataId${props.match.params.id}`,
          JSON.stringify(response.data)
        );
        window.localStorage.setItem(
          `timeCacheId${props.match.params.id}`,
          new Date()
        );
        setData(response.data);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="master">
      <div className="main">
   
          <img className='half worker-image' src={data.image} alt="" />
          <div className='half description'>
            <p>{data.first_name} {data.last_name}</p>
            <p>{data.gender === "F" ? "Female" : "Male"}</p>
            <p>{data.profession}</p>
            <p>{data.description}</p>
          </div>
      </div>
    </div>
  );
};

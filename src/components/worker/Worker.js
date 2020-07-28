import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

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
        console.log('using CACHED data', cached)
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
        console.log('using NEW data', response.data)
        setData(response.data);
      }
    }
    fetchData();
  }, []);


  return (
    <div>
      <div>Testing Worker</div>
      <div>{data.first_name}</div>
      <div>{data.last_name}</div>
      <img src={data.image} alt="" />
    </div>
  );
};

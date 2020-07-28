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

  // if (data.description) {
  //   data.description.replace(/<[^>]+>/g, "");
  // }

  //Setting if includes HTML or not to parse
  if (/<\/?[a-z][\s\S]*>/.test(data.description)) {
    document.getElementById("test").innerHTML = data.description;
    data.description = "";
  }
  //   var div = document.createElement("div");
  //   div.innerHTML = html;
  //   data.description = div.textContent || div.innerText || "";
  // }

  // document.getElementById('test').innerHTML = data.description

  // /<\/?[a-z][\s\S]*>/.test(data.description) ? document.getElementById("test").innerHTML = data.description : data.description = data.description;

  return (
    <div className="master-worker">
      <div className="main">
        <img className="half worker-image" src={data.image} alt="" />
        <div className="half description">
          <h2>
            {data.first_name} {data.last_name}
          </h2>
          <p className="main-info">{data.gender === "F" ? "Female" : "Male"}</p>
          <p className="main-info profession">{data.profession}</p>
          {/* <p className='main-info profession'>{data.description.includes("<", 0)}</p> */}
          {/* {data.description ? data.description.replace(/<[^>]+>/g, '') : null} */}
          {/* {/<\/?[a-z][\s\S]*>/.test(data.description) ? document.createElement("div").innerHTML = data.description : data.description = data.description} */}
          {/* <p className='worker-description'>{data.description}</p> */}
          {/* {data.description
            ? (document.getElementById("test").innerHTML = data.description)
            : data.description} */}
          <div id="test"></div>
          {data.description}
          {/* <p className="worker-description">{text}</p> */}
        </div>
      </div>
    </div>
  );
};

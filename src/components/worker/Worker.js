import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

export const Worker = (props) => {
  const [data, setData] = useState({});

  useEffect(() => {
    async function fetchData() {

      let response = await axios(
        `https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas/${props.match.params.id}`
      );
      console.log(response)
      setData(response.data);
    }
    fetchData();
  }, []);   

  console.log(data)

  return (
    <div>
      <div>Testing Worker</div>
      <div>{data.first_name}</div>
    </div>
  );
};

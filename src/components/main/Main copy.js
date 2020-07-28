import React from "react";
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
import axios from "axios";
import "./main.css";

export const Main = () => {
  function InfiniteList({}) {
    const [items, setItems] = useState([]);
    const [hasNextPage, setHasNextPage] = useState();
   
    /// ...
   
    useEffect(() => {
      const list = document.getElementById('list');
  
      if(list.clientHeight <= window.innerHeight && list.clientHeight) {
        setLoadMore(true);
        console.log('loadmore triggered')
      }
    }, [props.state]);
   
    const infiniteRef = useInfiniteScroll({
      loading,
      hasNextPage,
      onLoadMore: handleLoadMore,
      scrollContainer
    });
   
    // ...
   
    return (
      <List ref={infiniteRef}>
        {items.map(item => (
          <ListItem key={item.key}>{item.value}</ListItem>
        ))}
        {loading && <ListItem>Loading...</ListItem>}
      </List>
    );
  }
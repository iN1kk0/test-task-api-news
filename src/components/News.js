import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";

const News = () => {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(2);
  const [more, setMore] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 600;

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  useEffect(() => {
    fetch("https://api.hnpwa.com/v0/news/1.json")
      .then((response) => response.json())
      .then((data) => setNews(data));
  }, []);

  const fetchData = () => {
    if (page <= 10) {
      fetch(`https://api.hnpwa.com/v0/news/${page}.json`)
        .then((response) => response.json())
        .then((data) => {
          setNews([...news, ...data]);
          setPage(page + 1);
        });
    } else {
      setMore(false);
    }
  };

  const compareValues = (key, order = "asc") => {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }

      const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
      const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return order === "desc" ? comparison * -1 : comparison;
    };
  };

  const sortColumn = (key) => {
    const sortedNews = [...news];
    const attrsort = event.target.getAttribute("data-sort");

    sortedNews.sort(compareValues(key, attrsort));
    setNews(sortedNews);

    if (attrsort === "asc") {
      event.target.setAttribute("data-sort", "desc");
    } else {
      event.target.setAttribute("data-sort", "asc");
    }
  };

  return width > breakpoint ? (
    <InfiniteScroll
      dataLength={news.length}
      next={fetchData}
      hasMore={more}
      loader={<h4 style={{ textAlign: "center" }}>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      <table>
        <thead>
          <tr>
            <th data-sort="asc" onClick={() => sortColumn("title")}>
              Title
            </th>
            <th data-sort="asc" onClick={() => sortColumn("time")}>
              Time
            </th>
            <th data-sort="asc" onClick={() => sortColumn("domain")}>
              Domain
            </th>
          </tr>
        </thead>
        <tbody>
          {news.map((item, index) => (
            <tr key={index}>
              <td>
                <Link to={`/comment/${item.id}`}>{item.title}</Link>
              </td>
              <td>
                {new Date(item.time * 1000).toLocaleDateString("uk-UA", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })}
              </td>
              <td>{item.domain}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </InfiniteScroll>
  ) : (
    <InfiniteScroll
      dataLength={news.length}
      next={fetchData}
      hasMore={more}
      loader={<h4 style={{ textAlign: "center" }}>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      <table>
        <thead>
          <tr>
            <th data-sort="asc" onClick={() => sortColumn("title")}>
              Title
            </th>
          </tr>
        </thead>
        <tbody>
          {news.map((item, index) => (
            <tr key={index}>
              <td>{item.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </InfiniteScroll>
  );
};

export default News;

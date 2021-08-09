import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import "../styles/News.css";

const News = (props) => {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(2);
  const [more, setMore] = useState(true);

  useEffect(() => {
    fetch(`https://api.hnpwa.com/v0/${props.cat}/1.json`)
      .then((response) => response.json())
      .then((data) => setNews(data));
  }, [props.cat]);

  const fetchData = () => {
    if (page <= 10) {
      fetch(`https://api.hnpwa.com/v0/${props.cat}/${page}.json`)
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

  const sortColumn = (event, key) => {
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

  return (
    <InfiniteScroll
      dataLength={news.length}
      next={fetchData}
      hasMore={more}
      loader={<h4 className="loading">Loading...</h4>}
      endMessage={
        <p className="loading">
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      <table>
        <thead>
          <tr>
            <th data-sort="asc" onClick={(event) => sortColumn(event, "title")}>
              Title
            </th>
            <th data-sort="asc" onClick={(event) => sortColumn(event, "time")}>
              Time
            </th>
            <th
              data-sort="asc"
              onClick={(event) => sortColumn(event, "domain")}
            >
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
      <div
        onClick={(event) => sortColumn(event, "time")}
        className="sortmobilebutton"
      >
        Sort by date
      </div>
    </InfiniteScroll>
  );
};

export default News;

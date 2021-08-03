import React, { useState, useEffect } from "react";

import "../styles/App.css";

const App = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch("https://api.hnpwa.com/v0/news/1.json")
      .then((res) => res.json())
      .then((res) => setNews(res));
  }, []);

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

  return (
    <>
      <h1>News</h1>
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
              <td>{item.title}</td>
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
    </>
  );
};

export default App;

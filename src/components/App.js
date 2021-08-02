import React, { useState, useEffect } from "react";

import "../styles/App.css";

const App = () => {
  const [news, setNews] = useState([]);

  useEffect(() =>
    fetch("https://api.hnpwa.com/v0/news/1.json")
      .then((res) => res.json())
      .then((res) => setNews(res))
  ),
    [news];

  return (
    <>
      <h1>News</h1>
      <table className="m-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Time</th>
            <th>Domain</th>
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

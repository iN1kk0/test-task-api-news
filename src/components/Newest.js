import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const Newest = () => {
  const [newest, setNewest] = useState([]);
  const [newestPage, setNewestPage] = useState(2);
  const [newestMore, setNewestMore] = useState(true);

  useEffect(() => {
    fetch("https://api.hnpwa.com/v0/newest/1.json")
      .then((response) => response.json())
      .then((data) => setNewest(data));
  }, []);

  const fetchData = () => {
    if (newestPage <= 12) {
      fetch(`https://api.hnpwa.com/v0/newest/${newestPage}.json`)
        .then((response) => response.json())
        .then((data) => {
          setNewest([...newest, ...data]);
          setNewestPage(newestPage + 1);
        });
    } else {
      setNewestMore(false);
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
    const sortedNewest = [...newest];
    const attrsort = event.target.getAttribute("data-sort");

    sortedNewest.sort(compareValues(key, attrsort));
    setNewest(sortedNewest);

    if (attrsort === "asc") {
      event.target.setAttribute("data-sort", "desc");
    } else {
      event.target.setAttribute("data-sort", "asc");
    }
  };

  return (
    <InfiniteScroll
      dataLength={newest.length} //This is important field to render the next data
      next={fetchData}
      hasMore={newestMore}
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
          {newest.map((item, index) => (
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
    </InfiniteScroll>
  );
};

export default Newest;

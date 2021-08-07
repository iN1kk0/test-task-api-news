import React, { useState, useEffect } from "react";

export const Comments = () => {
  const pathArray = window.location.pathname.split("/");
  const id = pathArray[2];

  const [currentcomments, setComments] = useState([]);

  useEffect(() => {
    fetch(`https://api.hnpwa.com/v0/item/${id}.json`)
      .then((response) => response.json())
      .then((data) => setComments([data]));
  }, []);

  const CommentsList = ({ comment }) => {
    const nestedComments = comment.comments.map((comment) => {
      return <CommentsList key={comment.id} comment={comment} />;
    });
    return (
      <ul style={{ margin: "10px", listStyle: "none" }}>
        <li>
          <b>{comment.user}</b>
        </li>
        <li>{comment.content || comment.title}</li>
        {nestedComments}
      </ul>
    );
  };

  return (
    <div>
      {currentcomments.map((comment) => {
        return <CommentsList key={comment.id} comment={comment} />;
      })}
    </div>
  );
};

import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import "../styles/Comments.css";

export const Comments = () => {
  const { params } = useRouteMatch();

  const [currentcomments, setComments] = useState([]);

  useEffect(() => {
    fetch(`https://api.hnpwa.com/v0/item/${params.id}.json`)
      .then((response) => response.json())
      .then((data) => setComments([data]));
  }, []);

  const CommentsList = ({ comment }) => {
    const nestedComments = comment.comments.map((comment) => {
      return <CommentsList key={comment.id} comment={comment} />;
    });
    return (
      <ul className="comments">
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

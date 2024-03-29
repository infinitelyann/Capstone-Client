import React, { useState } from "react";
import CommentForm from "../shared/forms/CommentForm";
import { createComment } from "../../api/comment";

const CreateComment = ({
  user,
  post,
  handleClose,
  msgAlert,
  triggerRefresh,
}) => {
  const defaultComment = {
    text: "",
    likes: 0,
    dislikes: 0,
    owner: user,
  };
  const [comment, setComment] = useState(defaultComment);

  const handleChange = (e) => {
    setComment((prevComment) => {
      const name = e.target.name;
      let value = e.target.value;

      const updatedComment = { [name]: value };

      return {
        ...prevComment,
        ...updatedComment,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createComment(user, post._id, comment)
      .then(() => handleClose())
      .then(() => {
        msgAlert({
          heading: "Oh yeah!",
          message: "Great! The post loves it!",
          variant: "success",
        });
      })
      .then(() => triggerRefresh())
      .catch((err) => {
        msgAlert({
          heading: "Oh No!",
          message: "Something went wrong! Please try again" + err,
          variant: "danger",
        });
      });
  };
  if (user) {
    return (
      <CommentForm
        comment={comment}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        heading="Give this post a comment!"
      />
    );
  }
};

export default CreateComment;

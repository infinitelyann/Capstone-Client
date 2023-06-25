import React, { useEffect, useState } from "react";
import { postUpdate } from "../../api/post";
import { Form } from "react-bootstrap";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const LIKE_STATE = {
  LIKE: 1,
  UNSET: 0,
  DISLIKE: -1,
};

const PostLikes = ({ user, post, handleUpdatePost, msgAlert }) => {
  const [likes, setLikes] = useState(post.likes);
  const [dislikes, setDislikes] = useState(post.dislikes);
  const [likeState, setLikeState] = useState(LIKE_STATE.UNSET);
  const handleLike = () => {
    if (likeState === LIKE_STATE.LIKE) {
      setLikes(likes - 1);
      setLikeState(LIKE_STATE.UNSET);
    } else if (likeState === LIKE_STATE.DISLIKE) {
      setLikes(likes + 1);
      setDislikes(dislikes + 1);
      setLikeState(LIKE_STATE.LIKE);
    } else {
      setLikes(likes + 1);
      setLikeState(LIKE_STATE.LIKE);
    }
  };

  const handleDislike = () => {
    if (likeState === LIKE_STATE.LIKE) {
      setLikes(likes - 1);
      setDislikes(dislikes - 1);
      setLikeState(LIKE_STATE.DISLIKE);
    } else if (likeState === LIKE_STATE.DISLIKE) {
      setDislikes(dislikes + 1);
      setLikeState(LIKE_STATE.UNSET);
    } else {
      setDislikes(dislikes - 1);
      setLikeState(LIKE_STATE.DISLIKE);
    }
  };

  useEffect(() => {
    console.log("hello");
    handleUpdatePost({
      ...post,
      likes,
      dislikes,
    });
  }, [likeState]);

  return (
    <div>
      {user ? (
        <>
          <div>
            <KeyboardArrowUpIcon
              name="likes"
              id="likes"
              value={likes}
              onClick={handleLike}
            />
            {likes}
            <KeyboardArrowDownIcon
              name="dislikes"
              id="dislikes"
              value={dislikes}
              onClick={handleDislike}
            />
            {dislikes}
          </div>
        </>
      ) : (
        <>
          <KeyboardArrowUpIcon style={{ color: "green" }} />
          {likes}
          <KeyboardArrowDownIcon style={{ color: "red" }} />
          {dislikes}
        </>
      )}
    </div>
  );
};

export default PostLikes;

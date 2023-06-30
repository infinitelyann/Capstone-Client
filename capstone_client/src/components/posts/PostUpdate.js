import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { postDelete, postUpdate } from "../../api/post";
import PostUpdateForm from "../shared/forms/PostUdpateForm";
import PostLikes from "./PostLikes";

const PostUpdate = ({ user, msgAlert }) => {
  const [post, setPost] = useState({});
  const [isUpdateShown, setIsUpdateShown] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const toggleShowUpdate = (e) => {
    setIsUpdateShown((prevUpdateShown) => !prevUpdateShown);
  };

  const handleChange = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };

  const handleUpdatePost = (newPost = post) => {
    postUpdate(newPost, user, id)
      .then(() => {
        msgAlert({
          heading: "Success",
          message: "Updating Post",
          variant: "success",
        });
      })
      .catch((error) => {
        msgAlert({
          heading: "Failure",
          message: "Update Post Failure" + error,
          variant: "danger",
        });
      });
  };

  const handleDeletePost = () => {
    postDelete(user, id)
      .then(() => {
        setDeleted(true);
      })
      .catch((error) => {
        msgAlert({
          heading: "Failure",
          message: "Deleting a Post Failure" + error,
          variant: "danger",
        });
      });
  };
  if (deleted) navigate("/posts");

  if (post.owner && user && post.owner._id === user._id) {
    return (
      <div style={{ float: "right" }}>
        <button className="btn btn-outline-dark" onClick={toggleShowUpdate}>
          update
        </button>
        {isUpdateShown && (
          <PostUpdateForm
            post={post}
            handleChange={handleChange}
            handleUpdatePost={handleUpdatePost}
          />
        )}
        <button onClick={handleDeletePost} className="btn btn-outline-dark">
          delete
        </button>
      </div>
    );
  }
  return (
    <PostLikes
      post={post}
      msgAlert={msgAlert}
      user={user}
      handleUpdatePost={handleUpdatePost}
    />
  );
};
export default PostUpdate;

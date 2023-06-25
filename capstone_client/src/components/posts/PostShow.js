import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card } from "react-bootstrap";
import { postDelete, postShow, postUpdate } from "../../api/post";
import LoadingScreen from "../shared/LoadingScreen";
import ForumIcon from "@mui/icons-material/Forum";
import CreateComment from "../comment/CreateComment";
import ShowComment from "../comment/ShowComment";
import PostUpdate from "./PostUdpate";
import PostLikes from "./PostLikes";
import { Avatar } from "@mui/material";

const PostShow = ({ user, msgAlert }) => {
  const [post, setPost] = useState({});
  const [isUpdateShown, setIsUpdateShown] = useState(false);
  const [commentShow, setCommentShow] = useState(false);
  const [comment, setComment] = useState(null);
  const [deleted, setDeleted] = useState(false);
  const [owner, setOwner] = useState("");
  const [updated, setUpdated] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    postShow(user, id)
      .then((res) => {
        setPost(res.data.post);
        console.log(res.data.post);
        setOwner(post.owner.email);
      })
      .catch((error) => {});
  }, [id, msgAlert, user]);

  const toggleShowUpdate = (e) => {
    setIsUpdateShown((prevUpdateShown) => !prevUpdateShown);
  };
  const toggleShowComment = (e) => {
    setComment((prevComment) => !prevComment);
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
  let commentCards;

  if (post && comment) {
    if (post.comments.length > 0) {
      commentCards = post.comments.map((comment) => (
        <ShowComment
          key={comment._id}
          msgAlert={msgAlert}
          user={user}
          owner={comment.owner.email}
          post={post}
          comment={comment}
          triggerRefresh={() => setUpdated((prev) => !prev)}
        />
      ));
    }
  }

  if (deleted) navigate("/posts");

  if (!post.owner) {
    return <LoadingScreen />;
  }
  if (post) {
    return (
      <Container className="fluid">
        <Card>
          <Card.Header>
            <Avatar />
            {owner}
          </Card.Header>
          <Container>
            <h3>{post.title}</h3>
          </Container>

          <Card.Body>
            <Card.Text>{post.text}</Card.Text>
          </Card.Body>
          <Card.Footer>
            {commentCards}
            {!user ? (
              <>log in to comment and post</>
            ) : (
              <>
                <small
                  onClick={toggleShowComment}
                  className="btn btn-outline-dark"
                >
                  <ForumIcon />
                </small>

                {comment && (
                  <CreateComment
                    user={user}
                    post={post}
                    show={commentShow}
                    msgAlert={msgAlert}
                    triggerRefresh={() => setComment((prev) => !prev)}
                    handleClose={() => setCommentShow(false)}
                  />
                )}
                <PostLikes
                  post={post}
                  msgAlert={msgAlert}
                  user={user}
                  handleUpdatePost={handleUpdatePost}
                />

                {post.owner && user && post.owner._id === user._id ? (
                  <div>
                    <button
                      className="btn btn-outline-dark"
                      onClick={toggleShowUpdate}
                    >
                      update
                    </button>
                    {isUpdateShown && (
                      <PostUpdate
                        post={post}
                        handleChange={handleChange}
                        handleUpdatePost={handleUpdatePost}
                      />
                    )}

                    <button
                      onClick={handleDeletePost}
                      className="btn btn-outline-dark"
                    >
                      delete
                    </button>
                  </div>
                ) : null}
              </>
            )}
          </Card.Footer>
        </Card>
      </Container>
    );
  }
};
export default PostShow;

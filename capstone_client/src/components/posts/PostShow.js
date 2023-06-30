import React, { useEffect, useState } from "react";
import PostUpdate from "./PostUpdate";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card } from "react-bootstrap";
import { postDelete, postShow, postUpdate } from "../../api/post";
import LoadingScreen from "../shared/LoadingScreen";
import ForumIcon from "@mui/icons-material/Forum";
import CreateComment from "../comment/CreateComment";
import ShowComment from "../comment/ShowComment";
import PostUpdateForm from "../shared/forms/PostUdpateForm";

import { Avatar } from "@mui/material";

const PostShow = ({ user, msgAlert }) => {
  const [updated, setUpdated] = useState(false);
  const [post, setPost] = useState({});
  const [commentShow, setCommentShow] = useState(false);
  const [comment, setComment] = useState(null);
  const [owner, setOwner] = useState("");
  const toggleShowComment = (e) => {
    setComment((prevComment) => !prevComment);
  };

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

  let commentCards;

  if (post && comment) {
    if (post.comments.length > 0) {
      commentCards = post.comments.map((comment) => (
        <ShowComment
          key={comment._id}
          msgAlert={msgAlert}
          user={user}
          owner={comment.owner}
          post={post}
          comment={comment}
          triggerRefresh={() => setUpdated((prev) => !prev)}
        />
      ));
    }
  }

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
                </small>

                <PostUpdate user={user} msgAlert={msgAlert} post={post} />
              </>
            )}
          </Card.Footer>
        </Card>
      </Container>
    );
  }
};
export default PostShow;

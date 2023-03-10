import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ForumIcon from "@mui/icons-material/Forum";
import { Link } from "react-router-dom";
import { postIndex } from "../../api/post";
import LoadingScreen from "../shared/LoadingScreen";
import { Container } from "react-bootstrap";

// import { style } from "@mui/system";

const PostIndex = ({ user, msgAlert }) => {
  const [allPosts, setAllPosts] = useState([]);

  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const styles = {
    app: {
      borderStyle: "solid",
      borderColor: "",
      borderWidth: "1px",
      margin: "10px",
    },
    row: {
      // backgroundColor: "#A0E4CB",
      maxWidth: "fit-content",
    },
    linkStyle: {
      fontSize: ".75rem",
      margin: "5rem",
      color: isHover ? "orange" : "#5F8D4E",
    },
  };

  useEffect(() => {
    postIndex(user)
      .then((res) => {
        setAllPosts(res.data.posts);
      })
      .catch((error) => {
        msgAlert({
          heading: "Failure",
          message: "Index Posts Failure" + error,
          variant: "danger",
        });
      });
  }, []);

  const postCards = allPosts.map((post) => (
    <div key={post._id} style={styles.app}>
      <Card>
        <CardContent>
          <Typography style={{}} variant="h5" component="div">
            {post.title}
          </Typography>
          <Typography variant="body2">{post.text}</Typography>
        </CardContent>
        <Container>
          {user && user.email === post.owner.email ? (
            <>
              <Typography
                sx={{ fontSize: 14, float: "right" }}
                color="text.secondary"
                gutterBottom
              >
                by you
              </Typography>
            </>
          ) : (
            <>
              <Typography
                sx={{ fontSize: 14, float: "right" }}
                color="text.secondary"
                gutterBottom
              >
                by @{post.owner.email}
              </Typography>
            </>
          )}
        </Container>
        <Container>
          <Link
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            to={`/posts/${post._id}`}
          >
            <ForumIcon />
          </Link>
          {post.comments.length}
          <KeyboardArrowUpIcon style={{ color: "green" }} />
          {post.likes}
          <KeyboardArrowDownIcon style={{ color: "orange" }} />
          {post.dislikes}
        </Container>
      </Card>
    </div>
  ));

  if (!allPosts) {
    return <LoadingScreen />;
  }

  return (
    <Container style={styles.row}>
      <Box sx={{ minWidth: 275 }}>{postCards}</Box>
    </Container>
  );
};

export default PostIndex;

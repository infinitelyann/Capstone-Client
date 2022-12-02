import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import { Link } from "react-router-dom";
import { postIndex } from "../../api/post";
import LoadingScreen from "../shared/LoadingScreen";
import { Container } from "react-bootstrap";
import { style } from "@mui/system";

const styles = {
  app: {
    
    borderStyle:'solid',
   borderColor: "",
   borderWidth: "1px",
   margin: "10px",
},
row: {
      backgroundColor: "#A0E4CB",
      maxWidth: 'fit-content'
  
  },
  linkStyle: {

	color: "#5F8D4E",
	fontSize: "20px",
	margin: "15px",
  
}


};

const PostIndex = ({ user, msgAlert }) => {
  const [allPosts, setAllPosts] = useState([]);

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
          {user === post.owner ? (
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

          <Link style={styles.linkStyle} to={`/posts/${post._id}`}>see more</Link>
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

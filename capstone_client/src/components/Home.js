import { Avatar } from "@mui/material";
import React from "react";
import { Container } from "react-bootstrap";
import PostIndex from "./posts/PostIndex";

const Home = (props) => {
  const { msgAlert, user } = props;

  return (
    <>
      <div className="container-fluid">
        {user ? (
          <Container>
            <Avatar /> hello {user.email}
          </Container>
        ) : null}
        <PostIndex msgAlert={msgAlert} />
      </div>
    </>
  );
};

export default Home;

import React from "react";
import PostIndex from "./posts/PostIndex";
import Header from "./shared/Header";
const Home = (props) => {
  const { msgAlert, user } = props;
  console.log("props in home", props);

  return (
    <>
      <div className="container-fluid">
        
        {/* {user && */}
        <PostIndex msgAlert={msgAlert} />
        
      </div>
    </>
  );
};

export default Home;

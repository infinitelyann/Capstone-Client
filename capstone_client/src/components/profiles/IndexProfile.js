import React, { useState, useEffect } from "react";
import ShowProfile from "./ShowProfile";
import CreateProfile from "./CreateProfile";
import { userIndex } from "../../api/user";
import { Card, Container } from "react-bootstrap";
import LoadingScreen from "../shared/LoadingScreen";

const IndexProfile = (props) => {
  const { user, msgAlert } = props;
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    userIndex(user)
      .then((res) => {
        setAllUsers(res.data.users);
        console.log(allUsers);
      })
      .catch((error) => {
        msgAlert({
          heading: "Failure",
          message: error,
          variant: "danger",
        });
      });
  }, [msgAlert, user]);

  const userCards = allUsers.map((user) => (
    <Card key={user._id}>
      <Card.Header>{user.email}</Card.Header>

      <>{user.profile.bio}</>
      <h1>{user._id}</h1>
    </Card>
  ));
  if (!allUsers) {
    return <LoadingScreen />;
  }
  return (
    <>
      <Container>{userCards}</Container>
      <div>
        <div className="container-md">
          <>
            <CreateProfile user={user} />
          </>
          {/* :
                
                <ShowProfile user={user}/>
            } */}
        </div>
      </div>
    </>
  );

  // return(
  // )
};

export default IndexProfile;

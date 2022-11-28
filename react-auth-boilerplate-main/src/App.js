// import React, { Component, Fragment } from 'react'
import React, { useState, Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import { v4 as uuid } from "uuid";

// import AuthenticatedRoute from './components/shared/AuthenticatedRoute'
import AutoDismissAlert from "./components/shared/AutoDismissAlert/AutoDismissAlert";
import Header from "./components/shared/Header";
import RequireAuth from "./components/shared/RequireAuth";
import Home from "./components/Home";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import SignOut from "./components/auth/SignOut";
import ChangePassword from "./components/auth/ChangePassword";
import AvatarUpload from "./imageUpload";
import PostIndex from "./components/posts/PostIndex";
import PostCreate from "./components/posts/PostCreate";
import PostShow from "./components/posts/PostShow";
import CreateProfile from "./components/profiles/CreateProfile";
import ShowProfile from "./components/profiles/ShowProfile";
import IndexProfile from "./components/profiles/IndexProfile";

const App = () => {
  const [user, setUser] = useState(null);
  const [msgAlerts, setMsgAlerts] = useState([]);

  //   console.log('user in app', user)
  //   console.log('message alerts', msgAlerts)
  const clearUser = () => {
    // console.log('clear user ran')
    setUser(null);
  };

  const deleteAlert = (id) => {
    setMsgAlerts((prevState) => {
      return prevState.filter((msg) => msg.id !== id);
    });
  };

  const msgAlert = ({ heading, message, variant }) => {
    const id = uuid();
    setMsgAlerts(() => {
      return [{ heading, message, variant, id }];
    });
  };

  return (
    <Fragment>
      <Header user={user} />
      <Routes>
        <Route
          path="/posts"
          element={<PostIndex msgAlert={msgAlert} user={user} />}
        />
        <Route
          path="/create"
          element={<PostCreate msgAlert={msgAlert} user={user} />}
        />
        <Route
          path="/posts/:id"
          element={<PostShow msgAlert={msgAlert} user={user} />}
        />

        <Route
          path="/profiles"
          element={<IndexProfile msgAlert={msgAlert} user={user} />}
        />
        <Route
          path="/profiles/:id"
          element={<ShowProfile msgAlert={msgAlert} user={user} />}
        />
         <Route
          path="/editprofile"
          element={<CreateProfile msgAlert={msgAlert} user={user} />}
        />
        <Route path="/" element={<Home msgAlert={msgAlert} user={user} />} />
        <Route
          path="/sign-up"
          element={<SignUp msgAlert={msgAlert} setUser={setUser} />}
        />
        <Route
          path="/sign-in"
          element={<SignIn msgAlert={msgAlert} setUser={setUser} />}
        />
        <Route
          path="/sign-out"
          element={
            <RequireAuth user={user}>
              <SignOut msgAlert={msgAlert} clearUser={clearUser} user={user} />
            </RequireAuth>
          }
        />
        <Route
          path="/change-password"
          element={
            <RequireAuth user={user}>
              <ChangePassword msgAlert={msgAlert} user={user} />
            </RequireAuth>
          }
        />
      </Routes>
      {msgAlerts.map((msgAlert) => (
        <AutoDismissAlert
          key={msgAlert.id}
          heading={msgAlert.heading}
          variant={msgAlert.variant}
          message={msgAlert.message}
          id={msgAlert.id}
          deleteAlert={deleteAlert}
        />
      ))}
    </Fragment>
  );
};

export default App;

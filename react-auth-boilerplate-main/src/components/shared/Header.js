import React, { Fragment } from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
} from "@material-ui/core";

import { Link } from "react-router-dom";
import { padding } from "@mui/system";

const linkStyle = {
  textDecoration: "none",
  color: "#F1DBBF",
  fontSize: "20px",
  padding: "5px",
};
const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(10),
    display: "flex",
  },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
}));

const authenticatedOptions = (
  <>
    <Link to="change-password" style={linkStyle}>
      change Password
    </Link>

    <Link to="sign-out" style={linkStyle}>
      sign Out
    </Link>

    <Link to="/create" style={linkStyle}>
      write
    </Link>

    <Link to="/profiles" style={linkStyle}>
      profiles
    </Link>
  </>
);

const unauthenticatedOptions = (
  <>
    <Link to="sign-up" style={linkStyle}>
      sign up
    </Link>

    <Link to="sign-in" style={linkStyle}>
      sign in
    </Link>
  </>
);

const alwaysOptions = (
  <>
    <Link to="/posts" style={linkStyle}>
      posts
    </Link>
  </>
);

function Header(props) {
  const { user } = props;
  const classes = useStyles();

  return (
    <>
      <style>
        {"body{background-image: url(https://i.imgur.com/2gZX4Db.jpg)}"}
      </style>
      <AppBar
        style={{ backgroundColor: "#698269", padding: "2%" }}
        position="static"
      >
        <CssBaseline />
        <Toolbar>
          <Typography
            variant="h4"
            className={classes.logo}
            id="blogr"
            style={{
              color: "#E7B10A",
              textDecoration: "bold",
              fontSize: "4em",
            }}
          >
            blogr
          </Typography>
          <div className={classes.navlinks}>
            {/* {user && (
		  <span style={linkStyle}>Welcome, {user.email}</span>
		)} */}
            {alwaysOptions}
            {user ? authenticatedOptions : unauthenticatedOptions}
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;

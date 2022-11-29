
import React, { Fragment } from "react";
import {
	AppBar,
	Toolbar,
	CssBaseline,
	Typography,
	makeStyles } from '@material-ui/core'
	
import { Link } from "react-router-dom";
	
const linkStyle = {
	textDecoration: "none",
	color: "white",
	fontSize: "20px",
	padding: "5px"
  
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
    <Link to="change-password" style={linkStyle} >
      Change Password
    </Link>

    <Link to="sign-out" style={linkStyle} >
      Sign Out
    </Link>

    <Link to="/create" style={linkStyle}>
      Write
    </Link>

    <Link to="/profiles" style={linkStyle}>
      Profiles
    </Link>
  </>
);

const unauthenticatedOptions = (
  <>
    <Link to="sign-up" style={linkStyle}>
      Sign Up
    </Link>

    <Link to="sign-in" style={linkStyle}>
      Sign In
    </Link>
  </>
);

const alwaysOptions = (
  <>
    <Link to="/" style={linkStyle}>
      Home
    </Link>

    <Link to="/posts" style={linkStyle}>
      Posts
    </Link>
  </>
);
  
  function Header(props) {
	const { user } = props
	const classes = useStyles();
  
	return (
	  <AppBar position="static">
		<CssBaseline />
		<Toolbar>
		  <Typography variant="h4" className={classes.logo}>
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
	);
  }
  
  export default Header;
  

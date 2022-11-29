import { padding } from '@mui/system'
import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
const linkStyle = {
    color: 'white',
    textDecoration: 'none'
}
const authenticatedOptions = (
	<>
	
		<Nav.Item>
			<Link to='change-password' style={linkStyle}>
				Change Password
			</Link>
		</Nav.Item>
		<Nav.Item>
			<Link to='sign-out' style={linkStyle}>
				Sign Out
			</Link>
		</Nav.Item>
		<Nav.Item>
			<Link to='/create' style={linkStyle}>
				Write
			</Link>
		</Nav.Item>
		<Nav.Item>
			<Link to='/profiles' style={linkStyle}>
				Profiles
			</Link>
		</Nav.Item>
	
	</>
)

const unauthenticatedOptions = (
	<>
	
        <Nav.Item>
		    <Link to='sign-up' style={linkStyle}>Sign Up</Link>
        </Nav.Item>
        <Nav.Item>
		    <Link to='sign-in' style={linkStyle}>Sign In</Link>
        </Nav.Item>



	</>
)

const alwaysOptions = (
	<>
	

		<Nav.Item>
			<Link to='/' style={linkStyle}>
				Home
			</Link>
		</Nav.Item>
		<Nav.Item>
			<Link to='/posts' style={linkStyle}>
				Posts
			</Link>
		</Nav.Item>

		
	</>
)

const Header = ({ user }) => (
	<Navbar className=' nav flex-column' bg='primary' variant='dark' expand='md' style=
	{{float: "left", 
	// marginTop: "10px",
	// marginLeft: "10px",
	// padding: "auto"
	}}>
		<Navbar.Brand>
            <Link to='/' style={linkStyle} id='name-title'>
                blogr
            </Link>
        </Navbar.Brand>
		<Navbar.Toggle aria-controls='basic-navbar-nav' />
		<Navbar.Collapse id='basic-navbar-nav'>
			<Nav className='ml-auto flex-column'>
				{user && (
					<span className='navbar-text mr-2'>Welcome, {user.email}</span>
				)}
				{alwaysOptions}
				{user ? authenticatedOptions : unauthenticatedOptions}
			</Nav>
		</Navbar.Collapse>
	</Navbar>
)

export default Header

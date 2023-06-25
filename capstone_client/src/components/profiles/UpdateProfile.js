import React from "react";
import { Container, Form } from "react-bootstrap";

const UpdateProfile = (props)=>{
    const { profile, handleChange, handleUpdateProfile } = props
    return (
		<>
        <Container className="container-sm">
        <Form>
			<Form.Control 
            
            value={profile.bio} 
            name='bio' 
            id="bio"
            onChange={handleChange} 
            ></Form.Control>
		  

			<button onClick={handleUpdateProfile} className="btn btn-outline-dark">submit</button>

        </Form>

        </Container>
		</>
	)
}
export default UpdateProfile
import React from "react";
import { Form } from "react-bootstrap";

const PostUpdate = ({ post, handleChange, handleUpdatePost })=>{
  
    return (
		<>
        <Form>
			<input 
            type='text' 
            value={post.title} 
            name='title' 
            onChange={handleChange} 
            />
			<input 
            type='text' 
            value={post.text} 
            name='text' 
            onChange={handleChange} 
            />
			<button onClick={handleUpdatePost} className="btn btn-outline-dark">submit</button>

        </Form>
		</>
	)
}
export default PostUpdate
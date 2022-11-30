import React from "react";
import { Form, Button } from "react-bootstrap";
import { createComment } from "../../../api/comment";

const CommentForm = (props) =>{
const {post, comment, handleChange, handleSubmit } = props
    return(
       <>
        <Form >
        <Form.Control
            placeholder="text?"
            name='text' 
            id="text"
            value={post.comments.text} 
            onChange={handleChange} 
        >

        </Form.Control>
            
            <Button onClick={handleSubmit} type="submit">Submit</Button>
        </Form>
       </>
    )
}

export default CommentForm
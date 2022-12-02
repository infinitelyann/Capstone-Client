import React from "react";
import { Form, Button } from "react-bootstrap";
import { createComment } from "../../../api/comment";

const CommentForm = (props) =>{
const { comment, handleChange, handleSubmit } = props
    return(
       <>
        <Form >
        <Form.Control
            placeholder="text?"
            name='text' 
            id="text"
            value={comment.text} 
            onChange={handleChange} 
        >

        </Form.Control>
            
            <Button className="btn-outline-dark" onClick={handleSubmit}> submit comment</Button>
        </Form>
       </>
    )
}

export default CommentForm
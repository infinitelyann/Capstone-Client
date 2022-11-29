import React from "react";
import { Form, Button } from "react-bootstrap";
import { createComment } from "../../../api/comment";

const CommentForm = (props) =>{
const { post, comment, handleChange, handleSubmit } = props
    return(
       <>
        <Form onSubmit={handleSubmit}>
        <input 
            type='text' 
            value={comment.text} 
            name='text' 
            onChange={handleChange} 
            />
            <Button type="submit">Submit</Button>
        </Form>
       </>
    )
}

export default CommentForm
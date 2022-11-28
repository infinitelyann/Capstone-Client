import React from "react";
import { Form } from "react-bootstrap";

const CreateComment = (props) =>{
const { post } = props
    return(
       <>
        <Form>
        <input 
            type='text' 
            value={post.comment.text} 
            name='comment' 
            // onChange={handleChange} 
            />
        </Form>
       </>
    )
}

export default CreateComment
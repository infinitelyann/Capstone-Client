import React from "react";
import { Button, Card, Container } from "react-bootstrap";
import { deleteComment, updateComment } from "../../api/comment";
import { Avatar } from "@mui/material";

const ShowComment = (props) =>{
    const { comment, post, user, msgAlert, triggerRefresh, commentOwner} = props

    const destroyComment = () => {
     
        deleteComment(user, post._id, comment._id)
            .then(() => {
                msgAlert({
                    heading: 'deleted!',
                  
                    variant: 'success'
                })
                console.log("this is the comment")
            })
            .then(() => triggerRefresh())
            .catch(() => {
                msgAlert({
                    heading: 'Oh no!',
                    variant: 'danger'
                })
            })
    }




   return(
    <Container>
           <Card>
            <Avatar/>
            
               
                <Card.Body>
                    <small>{ comment.text }</small><br/>
                    <small></small>
                   
                    <Button onClick={() => destroyComment()}>delete</Button>
                    
                </Card.Body>
           </Card>

    </Container>
   )

        
}

export default ShowComment
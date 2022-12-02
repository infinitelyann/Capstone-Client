import React from "react";
import { Button, Card } from "react-bootstrap";
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

           <Card>
            <Avatar/>
               <Card.Header>{ commentOwner }</Card.Header>
               
                <Card.Body>
                    <small>{ comment.text }</small><br/>
                    <small></small>
                   
                    <Button onClick={() => destroyComment()}>delete</Button>
                    
                </Card.Body>
           </Card>
   )

        
}

export default ShowComment
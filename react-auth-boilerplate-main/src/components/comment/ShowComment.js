import React from "react";
import { Button, Card } from "react-bootstrap";
import { deleteComment } from "../../api/comment";

const ShowComment = (props) =>{
    const { comment, post, user, msgAlert, triggerRefresh} = props

    const destroyComment = () => {
        console.log(comment)
        console.log(post)
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
               <Card.Header>{ comment._id }{ comment.owner.email }</Card.Header>
               
                <Card.Body>
                    <small>{ comment.text }</small><br/>
                   
                    <Button onClick={() => destroyComment()}>delete</Button>
                    
                </Card.Body>
           </Card>
   )

        
}

export default ShowComment
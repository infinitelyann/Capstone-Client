import React from "react";
import { Card } from "react-bootstrap";
import { deleteComment } from "../../api/comment";

const ShowComment = (props) =>{
    const { comment, post, user, msgAlert, triggerRefresh} = props

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

   

    if(!comment){
        return(
            <>no comments yet</>
            
        )

    }
    return(
            <>
            <h1>

                { post.comments }
            </h1>
            </>
    )

}

export default ShowComment
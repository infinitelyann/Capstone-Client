import React, { useEffect, useState } from "react";
import { postUpdate } from "../../api/post"

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const PostLikes = ({user, post, msgAlert, id}) => {

    // const [likes, setLikes] = useState(0);
    // const [dislikes, setDislikes] = useState(0);
    
    const handleLike = (e) => {
        // setLikes({...post, [e.target.name]: e.target.value})
        //   console.log(post)
      };
      
      const handleDislike = (e) => {
      
        // setDislikes({...post, [e.target.name]: e.target.value})
      }
  

    const handleUpdateLikes = () => {
        postUpdate(post, user, id)
        .then(() => {
            msgAlert({
                heading: 'Success',
                message: 'voting',
                variant: 'success'
            })
        })
        .catch((error) => {
            msgAlert({
                heading: 'Failure',
                message: 'Update Post Failure' + error,
                variant: 'danger'
            })
        })
    }
    return(
        <div>
           { user ? (
            <>
               <KeyboardArrowUpIcon
               
               name="likes"
               id="likes"
               value= { post.likes }
                onClick={handleUpdateLikes} />
               {post.likes}
               <KeyboardArrowDownIcon 
                name="dislikes"
                id="dislikes"
                value= { post.dislikes }
               onClick={handleDislike} />
               {post.dislikes}
            </>

           ) : (
            <>
            <KeyboardArrowUpIcon style={{ color: "green"}}/>
            {post.likes}
            <KeyboardArrowDownIcon style={{color: "red"}}/>
            {post.dislikes}
            </>
           )}
        </div>
    )
}

export default PostLikes
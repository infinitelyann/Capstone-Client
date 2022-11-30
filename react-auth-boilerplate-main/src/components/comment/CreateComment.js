import React, { useState } from 'react'
// import { Modal } from 'react-bootstrap'
import CommentForm from '../shared/forms/CommentForm'
import { createComment } from '../../api/comment'
import { useNavigate } from 'react-router-dom'

const CreateComment = (props) => {
    const { 
        user, post, show, handleClose, msgAlert, triggerRefresh
    } = props
    const navigate = useNavigate()
    const [commentOwner, setCommentOwner] = useState('')

    const defaultComment = {
        text: '',
        owner: user,
    }
    const [comment, setComment] = useState(defaultComment)

    const handleChange = (e) => {
        setCommentOwner(user.email)
        setComment(prevComment => {
            const name = e.target.name
            let value = e.target.value


            const updatedComment = { [name]: value }

            return {
                ...prevComment, ...updatedComment
            }

        })

        
        
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        
        createComment(user, post._id, comment)
        .then(res => { navigate(`/posts/${res.data.post._id}`)})
        .then(() => {
            msgAlert({
                heading: 'Oh yeah!',
                message: 'Great! The post loves it!',
                variant: 'success'
            })
            console.log(post.comment)
        })
        .catch((err) => {
            msgAlert({
                heading: 'Oh No!',
                message: 'Something went wrong! Please try again' + err, 
                variant: 'danger'
            })
        })
        
        console.log("hello from createcomment", comment, post)
    }
    if(user){
        return (
          
                    <CommentForm 
                        post={post}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        commentOwner={commentOwner}
                        heading="Give this post a comment!"
                    />
        )

    }
}

export default CreateComment
import React, { useState } from 'react'
// import { Modal } from 'react-bootstrap'
import CommentForm from '../shared/forms/CommentForm'
import { createComment } from '../../api/comment'

const CreateComment = (props) => {
    const { 
        user, post, show, handleClose, msgAlert, triggerRefresh
    } = props

    const [comment, setComment] = useState({})

    const handleChange = (e) => {
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
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Oh yeah!',
                    message: 'Great! The post loves it!',
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: 'Something went wrong! Please try again',
                    variant: 'danger'
                })
            })
    }
    if(user){
        return (
          
                    <CommentForm 
                        post={post}
                        comment={comment}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        heading="Give this post a comment!"
                    />
        )

    }
}

export default CreateComment
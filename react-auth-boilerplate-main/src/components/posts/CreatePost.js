import React, { useState } from 'react' 
import { postCreate } from '../../api/post'
import { useNavigate } from 'react-router-dom'

import PostForm from '../shared/PostForm'

const PostCreate = ({ user, msgAlert }) => {
    const navigate = useNavigate()

    const defaultPost = {
        title: '',
        text: ''
    }

    const [post, setPost] = useState(defaultPost)

    const handleChange = (e) => {
     
        setPost(prevPost => {
            const updatedTitle = e.target.title
            let updatedValue = e.target.value
     
            const updatedPost = { [updatedTitle]: updatedValue }

            return { ...prevPost, ...updatedPost }
        })
    }

    const handleCreatePost = (e) => {
        e.preventDefault()
        
        postCreate(post, user)
            .then(res => { navigate(`/posts/${res.data.post.id}`)})
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: 'Create Post',
                    variant: 'success'
                })
            })
            .catch((error) => {
                msgAlert({
                    heading: 'Failure',
                    message: 'Create Post Failure' + error,
                    variant: 'danger'
                })
            })
    }

    return (
        <PostForm
            post={ post }
            handleChange={ handleChange }
            heading="Add a new post!"
            handleSubmit={ handleCreatePost }
        />
	)
}

export default PostCreate
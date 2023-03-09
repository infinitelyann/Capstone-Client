import React, { useState } from 'react' 
import { postCreate } from '../../api/post'
import { useNavigate } from 'react-router-dom'

import PostForm from '../shared/forms/PostForm'

const PostCreate = ({ user, msgAlert }) => {
    const navigate = useNavigate()

    const defaultPost = {
        title: '',
        text: '',
        likes: 0,
        dislikes: 0,
        owner: user
    }

    const [post, setPost] = useState(defaultPost)



    const handleChange = (e) => {
        setPost(prevPost => {
             const updatedName = e.target.name
            let updatedValue = e.target.value

            const updatedPost = { [updatedName]: updatedValue }

            return { ...prevPost, ...updatedPost }
        })
    }
    
    const handleCreatePost = (e) => {

        
        e.preventDefault()
        
        postCreate(post, user)
        .then(res => { navigate(`/posts`)})
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
            handleCreatePost={ handleCreatePost }
        />
	)
}

export default PostCreate
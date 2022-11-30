import React, { useState } from 'react' 
import { postCreate } from '../../api/post'
import { useNavigate } from 'react-router-dom'

import PostForm from '../shared/forms/PostForm'

const PostCreate = ({ user, msgAlert }) => {
    const navigate = useNavigate()

    const defaultPost = {
        title: '',
        text: '',
        owner: user
    }

    const [post, setPost] = useState(defaultPost)



    const handleChange = (e) => {
    //  console.log("hello from handleChange", post.title)
        setPost(prevPost => {
             const updatedName = e.target.name
            let updatedValue = e.target.value

            const updatedPost = { [updatedName]: updatedValue }

            return { ...prevPost, ...updatedPost }
        })
    }
    
    const handleCreatePost = (e) => {
        // console.log("hello from handleCreatePost")
        
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
        console.log(post)
        
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
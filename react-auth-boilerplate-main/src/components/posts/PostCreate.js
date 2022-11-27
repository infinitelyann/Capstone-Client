import React, { useState } from 'react' 
import { postCreate } from '../../api/post'
import { useNavigate } from 'react-router-dom'

import PostForm from '../shared/PostForm'

const PostCreate = ({ user, msgAlert }) => {
    const navigate = useNavigate()

    // const defaultPost = {
    //     title: '',
    //     text: ''
    // }

    const [post, setPost] = useState()


    const handleChange = (event) => {
    //  console.log("hello from handleChange", post.title)
        setPost(event.target.value)
            console.log("hello from setPost", post)
    }
    
    const handleCreatePost = (e) => {
        // console.log("hello from handleCreatePost")
        
        e.preventDefault()
        
        postCreate(post, user)
        .then(res => { navigate(`/posts/${res.data.post._id}`)})
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
        
        console.log("hello from post", post)
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
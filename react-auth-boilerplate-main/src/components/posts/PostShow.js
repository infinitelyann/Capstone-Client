import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Button } from 'react-bootstrap'
import { postDelete, postShow, postUpdate } from '../../api/post'
import LoadingScreen from '../shared/LoadingScreen'
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CreateComment from '../comment/CreateComment'
import PostUpdate from './PostUdpate'

const cardContainerLayout = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const PostShow = ({ user, msgAlert}) =>{
    // const [post, setPost] = useState(null)
    // const [isUpdateShown, setIsUpdateShown] = useState(false)
    // const [deleted, setDeleted] = useState(false)
    // const [updated, setUpdated] = useState(false)
    
    // const { id } = useParams()
    // const navigate = useNavigate()

    // useEffect(() => {
    //     postShow(user, id)
    //         .then((res) => {
    //             setPost(res.data.post)
    //         })
    //         .catch((error) => {
    //             msgAlert({
    //                 heading: 'Failure',
    //                 message: 'Show Post Failure' + error,
    //                 variant: 'danger'
    //             })
    //         })
    // }, [updated])

    // // const handleCommentClick = () =>{
    // //     return(
    // //         <CreateComment/>
    // //     )
    // // }
    // // const handleUpdate = () =>{
    // //     return(
    // //         <PostUpdate post={post}/>
    // //     )

    // // }

    // const handleUpdatePost = () => {
    //     postUpdate(post, user, id)
    //     .then(() => {
    //         msgAlert({
    //             heading: 'Success',
    //             message: 'Updating Post',
    //             variant: 'success'
    //         })
    //     })
    //     .catch((error) => {
    //         msgAlert({
    //             heading: 'Failure',
    //             message: 'Update Postt Failure' + error,
    //             variant: 'danger'
    //         })
    //     })
    // }
    

    // const handleDeletePost = () => {
    //     postDelete(user, id)
    //     .then(() => {
    //         setDeleted(true)
    //         msgAlert({
    //             heading: 'Success',
    //             message: 'Deleting a Post',
    //             variant: 'success'
    //         })
            
    //     })
    //     .catch((error) => {
    //         msgAlert({
    //             heading: 'Failure',
    //             message: 'Deleting a Post Failure' + error,
    //             variant: 'danger'
    //         })
    //     })
    // }

    const [post, setPost] = useState({})
    const [isUpdateShown, setIsUpdateShown] = useState(false)
    const [comment, setComment] = useState(null)
    const [deleted, setDeleted] = useState(false)
    const [owner, setOwner] = useState(null)

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        postShow(user, id)
        .then((res) => {
            setPost(res.data.post)
            setOwner(res.data.post.owner.email)
        })
        .catch((error) => {
            msgAlert({
                heading: 'Failure',
                message: 'Show Post Failure' + error,
                variant: 'danger'
            })
        })
    }, [])

    const toggleShowUpdate = (e) => {
        setIsUpdateShown(prevUpdateShown => !prevUpdateShown)
        e.target.style.display = "none"
        
    }
    const toggleShowComment = (e) => {
        setComment(prevComment => !prevComment)
        e.target.style.display = "none"
        
    }

    const handleChange = (event) => {
        // to keep the values as users input info 
        // first spread the current post
        // then comma and modify the key to the value you need
        setPost({...post, [event.target.name]: event.target.value})
    }

    const handleUpdatePost = () => {
        postUpdate(post, user, id)
        .then(() => {
            msgAlert({
                heading: 'Success',
                message: 'Updating Post',
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

    const handleDeletePost = () => {
        postDelete(user, id)
        .then(() => {
            setDeleted(true)
            msgAlert({
                heading: 'Success',
                message: 'Deleting a Post',
                variant: 'success'
            })

        })
        .catch((error) => {
            msgAlert({
                heading: 'Failure',
                message: 'Deleting a Post Failure' + error,
                variant: 'danger'
            })
        })
    }


    if (deleted) navigate('/posts')
    if(!post){
        return <LoadingScreen/>
    }
    return(
        <Container className="fluid">
                <Card>
                {owner}
                <Card.Header>{post.title}</Card.Header>
                <Card.Body>
                   {post.text}
                    <Card.Text>
                       
                       
                     
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <small onClick={toggleShowComment} className="btn btn-outline-dark" >comment</small>
                    {comment && (
					<CreateComment
						post={post}
						// handleChange={handleChange}
						// handleUpdatePost={handleUpdatePost}
					/>
				)}
                    <ExpandLessIcon style={{float: "right"}}/>
                    <ExpandMoreIcon style={{float: "right"}}/>
                    <button className="btn btn-outline-dark" onClick={toggleShowUpdate}>Update</button>
				{isUpdateShown && (
					<PostUpdate
						post={post}
						handleChange={handleChange}
						handleUpdatePost={handleUpdatePost}
					/>
				)}
                   
                   
                    <button onClick={handleDeletePost}className="btn btn-outline-dark" >Delete</button>
                </Card.Footer>
         
                </Card>
            </Container>
    )
}
export default PostShow
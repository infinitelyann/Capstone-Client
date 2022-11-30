import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Button } from 'react-bootstrap'
import { postDelete, postShow, postUpdate } from '../../api/post'
import LoadingScreen from '../shared/LoadingScreen'
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CreateComment from '../comment/CreateComment'
import ShowComment from '../comment/ShowComment'
import PostUpdate from './PostUdpate'

const cardContainerLayout = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const PostShow = ({ user, msgAlert}) =>{
  

    const [post, setPost] = useState({})
    const [isUpdateShown, setIsUpdateShown] = useState(false)
    const [commentShow, setCommentShow] = useState(false)
    const [comment, setComment] = useState(null)
    const [deleted, setDeleted] = useState(false)
    const [owner, setOwner] = useState(null)
    const [updated, setUpdated] = useState(false)

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
        
        
    }
    const toggleShowComment = (e) => {
        setComment(prevComment => !prevComment)
       
        
    }

    const handleChange = (event) => {
    
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
                       {/* {comment &&

                        {comment}
                       }
                      */}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    {!user 
                    ?
                    
                    <>log in to comment and post</>
                    : 
                    <>
                    <small onClick={toggleShowComment} className="btn btn-outline-dark" >comment</small>
                    
                    
                    {comment && (
					<CreateComment
                    user={user}
                    post={post}
                    show={commentShow}
                    msgAlert={msgAlert}
                    triggerRefresh={() => setComment(prev => !prev)}
                    handleClose={() => setCommentShow(false)}
					/>
				)}
                    <ExpandLessIcon style={{float: "right"}}/>
                    <ExpandMoreIcon style={{float: "right"}}/>
                    
                    
                   {user.email === owner ?
                    <div>
                    <button className="btn btn-outline-dark" onClick={toggleShowUpdate}>update</button>
				{isUpdateShown && (
					<PostUpdate
						post={post}
						handleChange={handleChange}
						handleUpdatePost={handleUpdatePost}
					/>
				)}
                   
                   
                    <button onClick={handleDeletePost}className="btn btn-outline-dark" >delete</button>
                    </div>
                    :
                    null
                }
                    </>

                    
                }
                
              
                </Card.Footer>
         
                </Card>
                
                
                {comment}
                    <ShowComment
                    
                    msgAlert={msgAlert}
                    user={user}
                    post={post}
                    comment={comment}
                    triggerRefresh={() => setUpdated(prev => !prev)}/>
            
                
            </Container>
    )
}
export default PostShow
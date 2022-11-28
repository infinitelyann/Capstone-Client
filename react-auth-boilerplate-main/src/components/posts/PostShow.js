import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Button } from 'react-bootstrap'
import { postDelete, postShow } from '../../api/post'
import LoadingScreen from '../shared/LoadingScreen'

const cardContainerLayout = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const PostShow = ({ user, msgAlert}) =>{
    const [post, setPost] = useState(null)
    const [deleted, setDeleted] = useState(false)
    const [updated, setUpdated] = useState(false)
    
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        postShow(user, id)
            .then((res) => {
                setPost(res.data.post)
            })
            .catch((error) => {
                msgAlert({
                    heading: 'Failure',
                    message: 'Show Post Failure' + error,
                    variant: 'danger'
                })
            })
            console.log(post)
    }, [updated])

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
    if(!post){
        return <LoadingScreen/>
    }
    // if (deleted) navigate('/posts')
    return(
        <Container className="fluid">
                <Card>
                <Card.Header>{post.title}</Card.Header>
                <Card.Body>
                   {post.text}
                    <Card.Text>
                       <button className="btn btn-outline-dark">add a comment</button>
                       
                     
                    </Card.Text>
                </Card.Body>
         
                </Card>
            </Container>
    )
}
export default PostShow
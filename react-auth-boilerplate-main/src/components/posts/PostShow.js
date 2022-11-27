import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Button } from 'react-bootstrap'
import { postDelete, postShow } from '../../api/post'

const cardContainerLayout = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const PostShow = ({ user, msgAlert}) =>{
    const [post, setPost] = useState({})
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
                    message: 'Show Postt Failure' + error,
                    variant: 'danger'
                })
            })
    }, [updated])

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
    return(
        <Container className="fluid">
                <Card>
                <Card.Header>{ post.title }</Card.Header>
                <Card.Body>
                   
                    <Card.Text>
                        <small>Text { post.text }</small><br/>
                       
                     
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    
                    { 
                        post.owner && user && post.owner._id === user._id 
                        ?
                        <>
                            
                            <Button onClick={() => handleDeletePost()}
                                className="m-2"
                                variant="danger"
                            >
                                Delete
                            </Button>
                        </>
                        :
                        null
                    }
                </Card.Footer>
                    {/* <h3>Name: {pet.name}</h3>
                    <p>Type: {pet.type}</p>
                    <button onClick={toggleShowUpdate}>Toggle Update</button>
                    {isUpdateShown && (
                        <PetUpdate
                            pet={pet}
                            handleChange={handleChange}
                            handleUpdatePet={handleUpdatePet}
                        />
                    )}
                    <button onClick={handleDeletePet} >Delete</button> */}
                </Card>
            </Container>
    )
}
export default PostShow
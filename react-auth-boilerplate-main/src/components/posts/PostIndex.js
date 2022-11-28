import React, { useEffect, useState } from 'react' 
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { postIndex } from '../../api/post'
import LoadingScreen from '../shared/LoadingScreen'


const cardContainerLayout = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const PostIndex = ({ user, msgAlert }) => {

    const [allPosts, setAllPosts] = useState([])

    useEffect(() => {
        postIndex(user)
        .then(res => {
            setAllPosts(res.data.posts)
        })
        .catch((error) => {
            msgAlert({
                heading: 'Failure',
                message: 'Index Posts Failure' + error,
                variant: 'danger'
            })
        })
    }, [])

    const postCards = allPosts.map(post => (
        <Card key={ post._id } style={{ width: '30%', margin: 5 }}>
            <Card.Header>{ post.title }</Card.Header>
            <Card.Body>
                { post.text }
                <Card.Text>
                    <Link to={ `/posts/${post._id}` }>View { post.title }</Link>
                </Card.Text>
            </Card.Body>
        </Card>
    ))

    if (!allPosts) {
        return <LoadingScreen />
    }

    return (
        <div>

      
        <div className='container-md' style={ cardContainerLayout }>
            { postCards }
        </div>
        </div>
    )
}

export default PostIndex
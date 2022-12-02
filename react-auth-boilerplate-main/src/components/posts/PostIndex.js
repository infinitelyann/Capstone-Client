import React, { useEffect, useState } from 'react' 
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { Link } from 'react-router-dom'
import { postIndex } from '../../api/post'
import LoadingScreen from '../shared/LoadingScreen'
import { Container } from 'react-bootstrap';




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
        <Card key={ post._id } style={{ width: '30%', margin: 5,}}>
            <CardContent>

            <Typography variant="h5" component="div">
                { post.title }
            </Typography>
            <Typography variant="body2">{post.text}</Typography>     
            </CardContent>
            <Container>
        {
            user === post.owner ?
            <>
            <Typography sx={{ fontSize: 14, float: "right"}} color="text.secondary" gutterBottom>by you</Typography>
            </>
            : 
          
            <>
            <Typography sx={{ fontSize: 14, float: "right"}} color="text.secondary" gutterBottom>by @{post.owner.email }</Typography>
            </>
            
            
        }
        

    


            
                    <Link  to={ `/posts/${post._id}` }>see more</Link>

            
            </Container>
            </Card>
        
    ))

    if (!allPosts) {
        return <LoadingScreen />
    }

 
        return (
            <Box sx={{ minWidth: 275 }}>
             {postCards}
            </Box>
          );
}

export default PostIndex
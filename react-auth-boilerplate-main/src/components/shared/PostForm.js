import { Form, Button, Container } from 'react-bootstrap'

const PostForm = (props) => {
    // here are the props we're going to bring into our form
    const { post, handleChange, heading, handleCreatePost } = props

    return (
        <Container className="justify-content-center">
         
            <Form > 
                <Form.Label>Title:</Form.Label>
                <Form.Control   
                   
                    name="title"
                    id="title"
                    defaultValue = { post.title }
                    onChange={ handleChange }
                />
                <Form.Label>Text:</Form.Label>
                <Form.Control 
                    
                    name="text"
                    id="text"
                    defaultValue = { post.text }
                    onChange={ handleChange }
                />
                <Button onClick={ handleCreatePost }type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default PostForm
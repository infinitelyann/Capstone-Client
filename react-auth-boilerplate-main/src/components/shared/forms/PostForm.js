import { Form, Button, Container } from 'react-bootstrap'

const PostForm = (props) => {
    // here are the props we're going to bring into our form
    const { post, handleChange, handleCreatePost } = props

    return (
        <Container className="justify-content-center">
         
            <Form > 
                <Form.Label>Title:</Form.Label>
                <Form.Control   
                      placeholder="title?"
                      name="title"
                      id="title"
                      value= { post.title }
                      onChange={ handleChange }
                />
                <Form.Label>Text:</Form.Label>
                <Form.Control 
                    placeholder='text?'
                    name="text"
                    id="text"
                    value = { post.text }
                    onChange={ handleChange }
                />
                <Button onClick={ handleCreatePost }type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default PostForm
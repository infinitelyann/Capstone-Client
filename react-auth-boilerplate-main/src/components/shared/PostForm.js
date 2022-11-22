import { Form, Button, Container } from 'react-bootstrap'

const PostForm = (props) => {
    // here are the props we're going to bring into our form
    const { post, handleChange, heading, handleSubmit } = props

    return (
        <Container className="justify-content-center">
            <h3>{ heading }</h3>
            <Form onSubmit={ handleSubmit }>
                <Form.Label>Title:</Form.Label>
                <Form.Control 
                    type="text"
                    placeholder=""
                    name="title"
                    id="title"
                    value= { post.title }
                    onChange={ handleChange }
                />
                <Form.Label>Text:</Form.Label>
                <Form.Control 
                    type="text"
                    placeholder="what's on your mind?"
                    name="text"
                    id="text"
                    value= { post.text }
                    onChange={ handleChange }
                />
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default PostForm
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import ProfilePicUpload from '../../../src/imageUpload'
import axios from "axios";

const ProfileForm = (props) =>{
    const { profile, handleChange, heading, handleCreateProfile, user } = props
  const [logo, setLogo] = useState('')
  const [imageUpload,] = useState({})
    const[, setImg] = useState({})

    const handleImg = (e) => {
        if(e.target.files[0]){
            setImg({
                src: URL.createObjectURL(e.target.files[0]),
                alt: e.target.files[0].name
            })
            setLogo(e.target.files[0])
        }
    }
    const profileUpload = async (file) =>{
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', 'sqdxczpl')
        let data = ''
        await axios.get(
            'https://api.cloudinary.com/v1_1/sqdxczpl/image/upload', formData).then((response) =>{
                data = response.data["secure_url"]
            })
            return data
    }
    const handleSubmit = async (e) =>{
        imageUpload.image = logo
        await profileUpload(logo)
    }

    
    return(
        <>
        <Form>
        <ProfilePicUpload  imageUpload={handleImg} image={imageUpload.image} user={user} handleSubmit={handleSubmit} />
        <input
        type="text"
        placeholder="bio?"
        name="bio"
        id="bio"
        value={ profile.bio }

       
        ></input>
    <Button className="btn btn-outline-dark" 
        onClick={(e) => handleSubmit(e)}>submit</Button>
        </Form>

        </>
    )
}
export default ProfileForm
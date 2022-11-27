import { useState } from "react";
import { Form } from "react-bootstrap";
import AvatarUpload from '../../../src/imageUpload'
import axios from "axios";

const ProfileForm = (props) =>{
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

// const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/lagos/image/upload';
// const CLOUDINARY_UPLOAD_PRESET = 'fbswcnss';
// const image = document.querySelector('#fileupload');
// image.addEventListener('change', (e) => {
//   const file = e.target.files[0];
//   const formData = new FormData();
//   formData.append('file', file);
//   formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

//   fetch(CLOUDINARY_URL, {
//     method: 'POST',
//     body: formData,
//   })
//     .then(response => response.json())
//     .then((data) => {
//       if (data.secure_url !== '') {
//         const uploadedFileUrl = data.secure_url;
//         localStorage.setItem('passportUrl', uploadedFileUrl);
//       }
//     })
//     .catch(err => console.error(err));
// });
    return(
        <>
        <AvatarUpload imageUpload={handleImg} image={imageUpload.image} />
        <button className="btn btn-outline-dark" onClick={(e) => handleSubmit(e)}></button>

        </>
    )
}
export default ProfileForm
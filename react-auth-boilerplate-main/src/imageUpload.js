import { createRef, useState } from 'react'
import { Avatar, Button } from '@material-ui/core'
import DeleteIcon from '@mui/icons-material/Delete'
import UploadIcon from '@mui/icons-material/Upload'
import { spacing } from '@material-ui/system'
import { imageCreate } from './api/img'


const ProfilePicUpload = (props) =>{
    const { user, profile, handleSubmit } = props
    
    const [image, _setImage] = useState()
    const inputFileRef = createRef()
    const cleanup = () =>{
        URL.revokeObjectURL(image && props.image);
        inputFileRef.current.value = null
    }
    const setImage = (newImage) => {
        if(image){
            cleanup()
        }
        _setImage(newImage)
        console.log()
    }
    const handleOnChange = (event) => {
        const newImage = event.target.files[0]
        if(newImage){
            setImage(URL.createObjectURL(newImage))
        }
        props.imageUpload(event)
        console.log(newImage, "hello")
        console.log(user.img)
    }
    
    return(
      <div>
          <Avatar
          alt='Avatar'
          src={image}
          style={{ width: "110px", borderRadius: "50%", height: "100px"}}
          />
        <input
        name="img"
        // value={user.img }
        ref={inputFileRef}
        accept="image/*"
        hidden
        id="avatar-image-upload"
        type="file"
        onChange={handleOnChange}
        /> 
        <label htmlFor='avatar-image-upload'>
            <Button
            className='btn btn-outline-dark'
            component="span"
            >
                
                {image ? 'Uploaded' : 'Upload'}
            </Button>
            <Button onClick={handleSubmit}>post</Button>
        </label>
      

      </div>
    )
}
export default ProfilePicUpload
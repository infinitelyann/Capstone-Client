import { createRef, useState } from 'react'
import { Avatar, Button } from '@material-ui/core'
import DeleteIcon from '@mui/icons-material/Delete'
import UploadIcon from '@mui/icons-material/Upload'
import { spacing } from '@material-ui/system'


const AvatarUpload = (props) =>{
    
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
        console.log(newImage+ "hello")
    }
 
    return(
      <div>
          <Avatar
          alt='Avatar'
          src={image}
          style={{ width: "110px", borderRadius: "50%", height: "100px"}}
          />
        <input
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
                {image ? <DeleteIcon mr={2}/> : <UploadIcon mr={2}/>}
                {image ? 'Uploaded' : 'Upload'}
            </Button>
        </label>
      

      </div>
    )
}
export default AvatarUpload
import React, { useEffect, useState } from 'react'
import { Avatar } from '@mui/material';
import { Link, useParams, useNavigate } from "react-router-dom";
import { profileShow, profileDelete, profileUpdate} from "../../api/profile";
import UpdateProfile from './UpdateProfile';
import { Container } from 'react-bootstrap';
import LoadingScreen from '../shared/LoadingScreen';
import ProfileForm from '../shared/ProfileForm';

const ShowProfile = ({ user, msgAlert }) =>{
    
    const [profile, setProfile] = useState({})
    const [isUpdateShown, setIsUpdateShown] = useState(false)
    const [updated, setUpdated] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        profileShow(user, id)
        .then((res) => {
            setProfile(res.data.profile)
            console.log(profile)
            
            
        })
        .catch((error) => {
            // msgAlert({
            //     heading: 'Failure',
            //     message: 'Show Profile Failure' + error,
            //     variant: 'danger'
            // })
        })
        
    }, [updated])

    const toggleShowUpdate = (e) => {
        setIsUpdateShown(prevUpdateShown => !prevUpdateShown)
        
        
    }
  

    const handleChange = (event) => {
    
        setProfile({...profile, [event.target.name]: event.target.value})
    }

    const handleUpdateProfile = () => {
        profileUpdate(profile._id, user, id)
        .then(() => {
            msgAlert({
                heading: 'Success',
                message: 'Updating Profile',
                variant: 'success'
            })
            console.log("from profileUpdate", profile)
        })
        .catch((error) => {
            msgAlert({
                heading: 'Failure',
                message: 'Update Profile Failure' + error,
                variant: 'danger'
            })
        })
    }

    const handleDeleteProfile = () => {
        profileDelete(user, id)
        .then(() => {
            setDeleted(true)
            msgAlert({
                heading: 'Success',
                message: 'Deleting a Profile',
                variant: 'success'
            })

        })
        .catch((error) => {
            msgAlert({
                heading: 'Failure',
                message: 'Deleting a Profile Failure' + error,
                variant: 'danger'
            })
        })
    }

    if(deleted) navigate('/profiles')

    if(!profile){
        return <ProfileForm/>
    }

    return(
        <>
       <Container >
        <Avatar style={{marginTop: "20px", marginBottom:"20px"}}/>
        {user && 
        <h1>{user.email}</h1>
        }
        <h2>{profile.bio}</h2>
       </Container>
       {/* {user === profile.owner ?  */}
         <>
          <button className="btn btn-outline-dark" onClick={toggleShowUpdate}>update</button>
          {isUpdateShown && (
              <UpdateProfile
              profile={profile}
              handleChange={handleChange}
              handleUpdateProfile={handleUpdateProfile}
              />

          )}
         </>
         {/* :
         null} */}
        </>
    )
}

export default ShowProfile
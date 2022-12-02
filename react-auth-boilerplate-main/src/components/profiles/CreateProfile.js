import React, { useState } from 'react' 
import { profileCreate } from '../../api/profile'
import { useNavigate } from 'react-router-dom'

import ProfileForm from '../shared/ProfileForm'

const CreateProfile = (props) => {
    const {user, msgAlert} = props
    const navigate = useNavigate()

    const defaultProfile = {
        bio: '',
        img: '',
        owner: user,
        
    }

    const [profile, setProfile] = useState(defaultProfile)

    const handleChange = (e) => {
     
        setProfile(prevProfile => {
            const updatedName = e.target.name
            let updatedValue = e.target.value
     
            const updatedProfile = { [updatedName]: updatedValue }

            return { ...prevProfile, ...updatedProfile }
        })
        console.log("from handleProfileChange", profile.bio)
    }

    const handleCreateProfile = (e) => {
        e.preventDefault()
        
        profileCreate(profile, user)
            .then(res => { navigate(`/profiles`)})
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: 'Create Profile',
                    variant: 'success'
                })
                console.log("from profileCreate", profile)
            })
            .catch((error) => {
                msgAlert({
                    heading: 'Failure',
                    message: 'Create Profile Failure' + error,
                    variant: 'danger'
                })
            })
            
    }

    return (
        <ProfileForm
            user ={user}
            profile={ profile }
            handleChange={ handleChange }
            heading="Add a new profile!"
            handleCreateProfile={ handleCreateProfile }
        />
	)
}

export default CreateProfile
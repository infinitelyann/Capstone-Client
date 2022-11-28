import React, { useState } from 'react' 
import { profileCreate } from '../../api/profile'
import { useNavigate } from 'react-router-dom'

import ProfileForm from '../shared/ProfileForm'

const CreateProfile = (props) => {
    const {user, msgAlert} = props
    const navigate = useNavigate()

    const defaultProfile = {
        title: '',
        text: ''
    }

    const [profile, setProfile] = useState(defaultProfile)

    const handleChange = (e) => {
     
        setProfile(prevProfile => {
            const updatedTitle = e.target.title
            let updatedValue = e.target.value
     
            const updatedProfile = { [updatedTitle]: updatedValue }

            return { ...prevProfile, ...updatedProfile }
        })
    }

    const handleCreateProfile = (e) => {
        e.preventDefault()
        
        profileCreate(profile, user)
            .then(res => { navigate(`/profiles/${res.data.profile.id}`)})
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: 'Create Profile',
                    variant: 'success'
                })
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
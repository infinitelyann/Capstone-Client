import React, { useState, useEffect } from "react";
import ShowProfile from "./ShowProfile";
import { userIndex } from "../../api/user";
import { Card } from "react-bootstrap";
import LoadingScreen from "../shared/LoadingScreen";


const IndexProfile = (props) =>{
    const { user, msgAlert} = props
    const [allUsers, setAllUsers] = useState([])

    useEffect(() => {
        userIndex(user)
        .then(res => {
            setAllUsers(res.data.users)
            console.log('this is the data', allUsers)
        })
        .catch((error) => {
            msgAlert({
                heading: 'Failure',
                message: 'Index User Failure' + error,
                variant: 'danger'
            })
        })
    }, [])

    const userCards = allUsers.map(user => (
        <Card key={ user._id}>
            <Card.Header>
                {user.email}
            </Card.Header>
        </Card>
    ))
    if(!allUsers){
        return <LoadingScreen/>
    }

    return(
        <div>
            <div className="container-md">
                {userCards}
            </div>
        </div>
    )
}

export default IndexProfile
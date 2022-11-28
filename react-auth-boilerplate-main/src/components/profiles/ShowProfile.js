import React from "react";
import { Link } from "react-router-dom";
import { userIndex } from "../../api/user";

const ShowProfile = (props) =>{
    const { user } = props
    if(user)
    return(
        <>
         <>hello {user.email}</>
        <Link to={ `/editprofile` }>Edit Profile</Link>
        </>
    )
    else 
    return(
        <>hello</>
    )
}

export default ShowProfile
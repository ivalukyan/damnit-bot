import React, {useContext} from "react";
import UserData from "./Profile/UserData";
import { UserConetext } from "../context/UserContext";
import Auth from "./Auth";
import ProfileHeader from "./Profile/ProfileHeader";


const Profile = () => {
    const [token] = useContext(UserConetext);

    return (
        <>
        <ProfileHeader title={"Профиль"}/>
        {
            !(token) ? (<Auth />) : (<UserData />)
        }
        </>
    )
}

export default Profile
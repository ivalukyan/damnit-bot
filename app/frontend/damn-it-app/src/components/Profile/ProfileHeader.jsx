import React, { useContext } from "react";

import { UserConetext } from "../../context/UserContext";

const ProfileHeader = ({title}) => {
    const [token, setToken] = useContext(UserConetext);

    const handleLogout = () => {
        setToken(null);
    };

    return (
        <nav className="navbar" id="HeaderId">
            {token && (<a className="user-icon" href="/">
                <svg xmlns="http://www.w3.org/2000/svg" id="BackSvg" width="32" height="32" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
                </svg>
                </a>)}
            <h4 className="title-header" id="TitleHeader">{title}</h4>
            {token && (<button className="button is-danger" id="LogoutBut" onClick={handleLogout}>Выйти</button>)}
        </nav>
    );
};

export default ProfileHeader;
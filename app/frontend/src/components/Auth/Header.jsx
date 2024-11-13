import React, { useContext } from "react";

import { UserConetext } from "../../context/UserContext";

const Header = ({title}) => {
    const [token, setToken] = useContext(UserConetext);

    const handleLogout = () => {
        setToken(null);
    };

    return (
        <nav className="navbar" id="HeaderId">
            {token && (<a className="user-icon" href="/profile">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                </svg>
                </a>)}
            <h4 className="title-header" id="TitleHeader">{title}</h4>
            {token && (<button className="button is-danger" id="LogoutBut" onClick={handleLogout}>Выйти</button>)}
        </nav>
    );
};

export default Header;
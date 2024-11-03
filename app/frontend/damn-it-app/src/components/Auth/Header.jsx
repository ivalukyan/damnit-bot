import React, { useContext } from "react";

import { UserConetext } from "../../context/UserContext";

const Header = ({title}) => {
    const [token, setToken] = useContext(UserConetext);

    const handleLogout = () => {
        setToken(null);
    };

    return (
        <div className="has-text-centered m-6">
            <h1 className="title">{title}</h1>
            {token && (<button className="button" onClick={handleLogout}>Выйти</button>)}
        </div>
    );
};

export default Header;
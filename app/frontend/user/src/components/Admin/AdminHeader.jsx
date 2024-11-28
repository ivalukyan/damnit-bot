import React, {useContext, useEffect, useState} from "react";
import { UserConetext } from "../../context/UserContext";


const AdminHeader = () => {

    const [headerText, setHeaderText] = useState("")
    const [adminToken, setAdminToken] = useContext(UserConetext);

    const getHeaderText = async () => {
        const requestOptions = {
            method: "GET",
            headers: {"Content-Type": "application/json"}
        }

        const response = await fetch("/api", requestOptions);

        if (!response.ok){
            const data = await response.json();
            console.error(data);
        } else {
            const data = await response.json();
            //console.log(data);
            setHeaderText(data.message);
        }
    }

    const LogOut = () => {
        setAdminToken(null);
    }

    useEffect(() => {
            getHeaderText();
    }, []);

    return (
        <nav className="admin-header">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
            </svg>
            <p className="title-header">{headerText}</p>
            <button className="button is-danger" onClick={LogOut}>Выйти</button>
        </nav>
    )
}

export default AdminHeader
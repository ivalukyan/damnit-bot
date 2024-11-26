import React, {useContext, useEffect, useState} from "react";
import "../App.css"
import { UserConetext } from "../context/UserContext";
import AdminLogin from "./Admin/AdminLogin";
import AdminPanel from "./Admin/AdminPanel";
import AdminHeader from "./Admin/AdminHeader";


const Admin = () => {
    const [message, setMessage] = useState("")
    const [token] = useContext(UserConetext);

    const getWelcomeMessage = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            },
        };
        const response = await fetch("/api", requestOptions);
        const data = await response.json();

        if (!response.ok){
            console.log("something messed up");
        }else{
            setMessage(data.message);
        }
    };

    useEffect(() => {
        getWelcomeMessage();
    }, []);

    return (
        <>
        {
            token && (<AdminHeader />)
        }
        <div className="columns">
            <div className="column m-5 is-two-thirds">
                {
                    !token ? (
                        <div className="columns">
                            <AdminLogin />
                        </div>
                    ) : (
                        <AdminPanel />
                    )
                }
            </div>
            <div className="column"></div>
        </div>
        </>
    );
}

export default Admin;
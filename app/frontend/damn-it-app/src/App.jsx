import React, {useContext, useEffect, useState} from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Header from "./components/Header";
import { UserConetext, UserProvider } from "./context/UserContext";

const App = () => {
    const [message, setMessage] = useState("")
    const [token] = useContext(UserConetext);

    const getWelcomeMessage = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            },
        };
        const response = await fetch("/", requestOptions);
        const data = response.json();

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
        <Header title={message}/>
        <div className="columns">
            <div className="column"></div>
            <div className="column m-5 is-two-thirds">
                {
                    !token ? (
                        <div className="columns">
                            <Register /> <Login />
                        </div>
                    ) : (
                        <p>Is protect page</p>
                    )
                }
            </div>
            <div className="column"></div>
        </div>
        </>
    );
}

export default App;

import React, { createContext, useEffect, useState } from "react";


export const UserConetext = createContext()

export const UserProvider = (props) => {
    const [token, setToken] = useState(localStorage.getItem("awesomeLeadsToken"));

    useEffect(() => {
        const fetchUser = async () =>{
            const requestOptions = {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            };

            const response = await fetch("/user/me", requestOptions);

            if (!response.ok){
                setToken(null);
            }
            localStorage.setItem("awesomeLeadsToken", token);
        };
        fetchUser();
    }, [token]);

    return(
        <UserConetext.Provider value={[token, setToken]}>
            {props.children}
        </UserConetext.Provider>
    )
}
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

            const userResponse = await fetch("/user/me", requestOptions);

            const adminResponse = await fetch("/admin/me", requestOptions);

            if (!userResponse.ok && !adminResponse.ok){
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
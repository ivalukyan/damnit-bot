import React, { createContext, useEffect, useState } from "react";


export const AdminConetext = createContext()

export const AdminProvider = (props) => {
    const [token, setToken] = useState(localStorage.getItem("awesomeToken"));

    useEffect(() => {
        const fetchUser = async () =>{
            const requestOptions = {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            };

            const response = await fetch("/admin/me", requestOptions);

            if (!response.ok){
                setToken(null);
            }

            localStorage.setItem("awesomeToken", token);
        };
        fetchUser();
    }, [token]);

    return(
        <AdminConetext.Provider value={[token, setToken]}>
            {props.children}
        </AdminConetext.Provider>
    )
}
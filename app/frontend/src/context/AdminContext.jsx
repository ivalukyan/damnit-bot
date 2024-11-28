import React, { createContext, useState } from "react";


export const AdminConetext = createContext();


export const AdminProvider = (props) => {
    const [token, setToken] = useState(localStorage.getItem("awesomeLeadsToken"));

    
}
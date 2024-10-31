import React, { useState } from "react";

import { UserConetext } from "../context/UserContext";


const Register = () => {
    const [fullname, setFullname] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

}
import React, { useContext, useState } from "react";

import { UserConetext } from "../../context/UserContext";
import ErrorMessage from "../ErrorMessage";


const Register = () => {
    const [fullname, setFullname] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [, setToken] = useContext(UserConetext);

    const submitRegistration = async () => {
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"fullname": fullname, "phone": phone, "email": email})
        };

        const response = await fetch("/auth/sign_up", requestOptions);
        const data = await response.json();

        if (!response.ok){
            setErrorMessage("User already exist");
        } else{
            setToken(data.access_token);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        submitRegistration();
    }

    return (
        <div className="column">
            <form className="box" onSubmit={handleSubmit}>
                <h1 className="title has-text-centered">Регистрация</h1>
                <div className="field">
                    <label className="label">ФИО</label>
                    <div className="control">
                        <input 
                        type="text"
                        placeholder="Как вас зовут?"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        className="input"
                        required
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Номер телефона</label>
                    <div className="control">
                        <input 
                        type="text"
                        placeholder="+7 9ХХ ХХХ ХХ ХХ"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="input"
                        required
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">E-mail</label>
                    <div className="control">
                        <input 
                        type="text"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input"
                        required
                        />
                    </div>
                </div>
                <ErrorMessage message={errorMessage}/>
                <button className="button-submit" type="submit">
                    Зарегистрироваться
                </button>
            </form>
        </div>
    )
}

export default Register;
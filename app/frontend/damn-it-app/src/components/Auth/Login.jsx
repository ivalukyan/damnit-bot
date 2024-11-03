
import React, {useContext, useState} from  "react";

import ErrorMessage from "../ErrorMessage";
import { UserConetext } from "../../context/UserContext";


const Login = () =>{
    const [phone, setPhone] = useState("");
    const [, setToken] = useContext(UserConetext);
    const [errorMessage, setErrorMessage] = useState("");

    const submitLogin = async () => {

        const payload = new URLSearchParams({
            username: phone,
            password: "pass"
        });

        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: payload
        }

        const response = await fetch("/auth/token", requestOptions);
        const data = await response.json();

        if (!response.ok){
            setErrorMessage("Token invalid");
        } else {
            setToken(data.access_token);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        submitLogin();
    }

    return (
        <div className="column">
            <form className="box" onSubmit={handleSubmit}>
                <h1 className="title has-text-centered">Авторизация</h1>
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
                <ErrorMessage message={errorMessage}/>
                <button className="button-submit" type="submit">
                    Войти
                </button>
            </form>
        </div>
    )
};

export default Login;

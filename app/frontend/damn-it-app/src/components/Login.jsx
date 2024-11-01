import React, {useState, useContext} from  "react";

import ErrorMessage from "./ErrorMessage";
import { UserConetext } from "../context/UserContext";

const Login = () =>{
    const [phone, setPhone] = useState("");
    const [, setToken] = useState(UserConetext);
    const [errorMessage, setErrorMessage] = useState("");

    const submitLogin = async () => {
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: JSON.stringify(`grant_type=&username=${phone}&password=pass&scope=&client_id=&client_secret=`)
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
        <div className="colum">
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
                <button className="button is-primary" type="submit">
                    Войти
                </button>
            </form>
        </div>
    )
};

export default Login;
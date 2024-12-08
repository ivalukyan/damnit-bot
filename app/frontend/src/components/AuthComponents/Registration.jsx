import React, { useState } from "react";
import {useNavigate} from "react-router-dom";


const Registration = () => {
    const [fullname, setFullname] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [, setToken] = useState(localStorage.getItem("token"));
    const navigate = useNavigate();

    const submitRegistration = async () => {
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"fullname": fullname, "phone": phone, "email": email})
        };

        const response = await fetch("/api/auth/sign_up", requestOptions);
        const data = await response.json();

        if (!response.ok){
            setToken(null);
            throw new Error("Failed to Register");
        } else{
            localStorage.setItem("token", data.access_token);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        submitRegistration();
        navigate("/user/me");
    }

    return (
        <div className="column">
            <form className="box" onSubmit={handleSubmit}>
                <h1 className="title has-text-centered">Регистрация</h1>
                <div className="mb-4"></div>
                <div className="mb-3">
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
                <div className="mb-3">
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
                <div className="mb-3">
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
                <button className="button-submit" type="submit">
                    Зарегистрироваться
                </button>
            </form>
        </div>
    )
}

export default Registration;
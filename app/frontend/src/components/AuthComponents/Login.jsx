import React, {useState} from  "react";
import {useNavigate} from "react-router-dom";


const Login = () =>{
    const [phone, setPhone] = useState("");
    const [, setToken] = useState(localStorage.getItem("token"));
    const navigate = useNavigate();

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

        const response = await fetch("/api/auth/token", requestOptions);
        const data = await response.json();

        if (!response.ok){
            setToken(null);
            throw new Error("Failed to Login")
        } else {
            localStorage.setItem("token", data.access_token);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        submitLogin();
        navigate("/user/me");
    }

    return (
        <div className="column">
            <form className="box" onSubmit={handleSubmit}>
                <h1 className="title has-text-centered">Авторизация</h1>
                <div className="mb-4"></div>
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
                <button className="button-submit" type="submit">
                    Войти
                </button>
            </form>
        </div>
    )
};

export default Login;

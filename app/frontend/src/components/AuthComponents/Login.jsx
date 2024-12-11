import React, {useState} from "react";
import {useNavigate} from "react-router-dom";


const Login = () => {
    const [phone, setPhone] = useState("");
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [, setUserName] = useState(localStorage.getItem("fullname"));
    const [, setUserPhone] = useState(localStorage.getItem("phone"));
    const [, setUserEmail] = useState(localStorage.getItem("email"));
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

        console.log(data);

        if (!response.ok) {
            setToken(null);
            // Добавить уведомление о некорректности
        }

        localStorage.setItem("token", data.access_token);
    };

    const getUserData = async () =>{
        const request = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            const response = await fetch("/api/user/me", request);
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("fullname", data.fullname);
                localStorage.setItem("phone", data.phone);
                localStorage.setItem("email", data.email);
            } else {
                console.error("Failed to fetch user data");
                setUserPhone("");
                setUserEmail("");
                setUserName("");
                setToken(null);
            }
        } catch (error) {
            console.error("Error fetching user data", error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await submitLogin();
        await getUserData();
        navigate("/user/me")
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

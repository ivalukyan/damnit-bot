import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [phone, setPhone] = useState("");
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [notification, setNotification] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const validatePhone = (phone) => {
        const phoneRegex = /^\+7\s?9\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/;
        return phoneRegex.test(phone);
    };

    const submitLogin = async () => {
        if (!validatePhone(phone)) {
            setMessage("Введите корректный номер телефона");
            setNotification(true);
            return;
        }

        const payload = new URLSearchParams({
            username: phone,
            password: "pass" // Замените "pass" на реальный ввод пароля, если требуется
        });

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: payload,
        };

        try {
            const response = await fetch("/api/auth/token", requestOptions);

            if (!response.ok) {
                const ans = await response.json();
                setMessage("Ошибка авторизации: введите другой номер телофона");
                setNotification(true);
                setToken(null);
                return;
            }


            const data = await response.json();
            localStorage.setItem("token", data.access_token);
            setToken(data.access_token);

            const userRequestOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${data.access_token}`,
                },
            };


            const userResponse = await fetch("/api/user/me", userRequestOptions);

            if (userResponse.ok) {
                const userData = await userResponse.json();
                localStorage.setItem("fullname", userData.fullname);
                localStorage.setItem("phone", userData.phone);
                localStorage.setItem("email", userData.email);
                navigate("/user/me");
            } else {
                console.error("Failed to fetch user data");
                setMessage("Не удалось загрузить данные пользователя");
                setNotification(true);
                setToken(null);
            }
        } catch (error) {
            console.error("Error during login request", error);
            setMessage("Произошла ошибка. Попробуйте позже.");
            setNotification(true);
        }
    }


    const closeModal = () => {
        setNotification(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await submitLogin();
    };


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
            {notification && (
                <div className="notification is-danger">
                    <button className="delete" onClick={closeModal}></button>
                    {message}
                </div>
            )}
        </div>
    );
};

export default Login;

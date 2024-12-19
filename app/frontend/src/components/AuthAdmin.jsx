import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';

const AuthAdmin = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [, setToken] = useState(localStorage.getItem("token"));
    const [message, setMessage] = useState("");
    const [notification, setNotification] = useState(false);
    const navigate = useNavigate();

    const validatePhone = (phone) => {
        const phoneRegex = /^\+7\s?9\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/;
        return phoneRegex.test(phone);
    };

    const closeModal = () => {
        setNotification(false);
    };

    const generateToken = async () => {

        if (!validatePhone(phoneNumber)) {
            setMessage("Введите корректный номер телефона");
            setNotification(true);
            return;
        }

        const payload = new URLSearchParams({
            username: phoneNumber,
            password: "pass",
        });

        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: payload,
        };

        try {
            const response = await fetch("https://ivalukyan-backend-damnitbot-12c1.twc1.net/auth/token", requestOptions);

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

            const adminRequestOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${data.access_token}`,
                },
            };

            const adminResponse = await fetch("https://ivalukyan-backend-damnitbot-12c1.twc1.net/admin/me", adminRequestOptions);

            if (adminResponse.ok) {
                const userData = await adminResponse.json();
                localStorage.setItem("fullname", userData.fullname);
                localStorage.setItem("phone", userData.phone);
                localStorage.setItem("email", userData.email);
                navigate("/admin/me");
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


    const handleSubmit = async (e) => {
        e.preventDefault();
        await generateToken();
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
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="input"
                            required
                        />
                    </div>
                    <button className="button" type="submit" style={{width: "100%", margin: "10px 0"}}>
                        Войти
                    </button>
                </div>
            </form>
            {notification && (
                <div className="notification is-danger">
                    <button className="delete" onClick={closeModal}></button>
                    {message}
                </div>
            )}
        </div>
    )
        ;
}

export default AuthAdmin;
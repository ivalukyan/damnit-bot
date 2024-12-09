import {useState} from "react";
import {useNavigate} from 'react-router-dom';

const AuthAdmin = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [, setToken] = useState(localStorage.getItem("token"));
    const navigate = useNavigate();

    const generateToken = async () => {

        const payload = new URLSearchParams({
            username: phoneNumber,
            password: "pass",
        });

        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: payload,
        }

        const response = await fetch("/api/auth/token", requestOptions);

        if (!response.ok) {
            setToken(null);
        } else {
            const data = await response.json();
            localStorage.setItem("token", data.access_token);

        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        generateToken();
        navigate("/admin/me");
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
                    <button className="button" type="submit" style={{ width: "100%", margin: "10px 0"}}>
                        Войти
                    </button>
                </div>
            </form>
        </div>
    )
        ;
}

export default AuthAdmin;
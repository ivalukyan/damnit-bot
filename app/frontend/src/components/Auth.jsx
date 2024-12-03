import Login from "./AuthComponents/Login";
import Registration from "./AuthComponents/Registration";
import {useState} from "react";

const Auth = () => {
    const [showForm, setShowForm] = useState(true);

    const handleRegister = (e) => {
        e.preventDefault();
        document.getElementById("RegisterBut").style.backgroundColor = "#303131";
        document.getElementById("LoginBut").style.backgroundColor = "transparent";
        setShowForm(false);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        document.getElementById("LoginBut").style.backgroundColor = "#303131";
        document.getElementById("RegisterBut").style.backgroundColor = "transparent";
        setShowForm(true);
    }

    return (
        <>
            <div className="column"></div>
            <div className="buttons-move">
                <button type="button" className="button-move" onClick={handleLogin} id="LoginBut">
                    Войти
                </button>
                <button type="button" className="button-move" onClick={handleRegister} id="RegisterBut">
                    Зарегестрироваться
                </button>
            </div>
            {
                showForm ? (
                    <Login />
                ) : (
                    <Registration />
                )
            }
        </>
    );
}

export default Auth;
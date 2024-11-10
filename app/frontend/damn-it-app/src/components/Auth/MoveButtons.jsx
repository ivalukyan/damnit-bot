import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const MoveButtons = () => {
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
                <Register />
            )
        }
        </>
    );
};

export default MoveButtons;
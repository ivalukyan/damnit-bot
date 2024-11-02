import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const MoveButtons = () => {
    const [showForm, setShowForm] = useState(true);

    const handleRegister = (e) => {
        e.preventDefault();
        setShowForm(false);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setShowForm(true);
    }

    return (
        <>  
        <div className="buttons-move">
            <button type="button" className="button" onClick={handleLogin}>
                    Войти
            </button>
            <button type="button" className="button" onClick={handleRegister}>
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
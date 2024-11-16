import React, { useState } from "react";
import PrivatePerson from "./ApplicationForm/PrivatePerson";
import Company from "./ApplicationForm/Company";


const ApplicationForm = () => {
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
        <h1 className="title has-text-centered">Оформление заявки</h1>
        <div className="buttons-move">
            <button type="button" className="button" onClick={handleLogin} id="LoginBut">
                    Частное лицо
            </button>
            <button type="button" className="button" onClick={handleRegister} id="RegisterBut">
                    Компания
            </button>
        </div>
        {
            showForm ? (
                <PrivatePerson />
            ) : (
                <Company />
            )
        }
        </>
    );
}

export default ApplicationForm
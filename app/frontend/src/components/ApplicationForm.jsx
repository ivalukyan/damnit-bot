import { useState } from "react";
import Person from "./ApplicationFormComponents/Person";
import Company from "./ApplicationFormComponents/Company";



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
                <button type="button" className="button-move" onClick={handleLogin} id="LoginBut">
                    Частное лицо
                </button>
                <button type="button" className="button-move" onClick={handleRegister} id="RegisterBut">
                    Компания
                </button>
            </div>
            {
                showForm ? (
                    <Person />
                ) : (
                    <Company />
                )
            }
        </>
    );
}

export default ApplicationForm;
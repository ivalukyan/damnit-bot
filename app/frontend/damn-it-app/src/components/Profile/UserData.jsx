import React, { useState } from "react";

const UserData = () =>{

    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");

    return (
        <>
        <div className="column"></div>
        <div className="column">
            <div className="card">
                <div className="field">
                    <label className="label">ФИО</label>
                    <div className="control">
                        <input
                        className="input"
                        value={fullname || "Иван"}
                        onChange={(e) => setFullname(e.target.value)}
                        required
                        disabled
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">E-mail</label>
                    <div className="control">
                        <input
                        className="input"
                        value={email || "example@gmail.com"}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled
                        />
                    </div>
                </div>
                <div className="subscription">
                    <div>Подписка: </div>
                    <div id="sub-status">Активна</div>
                    <button className="button is-danger" id="sub-disable">Отменить</button>
                </div>
                <button className="button" id="UpdateButProfile">Изменить</button>
            </div>
        </div>
        </>
    )
}

export default UserData
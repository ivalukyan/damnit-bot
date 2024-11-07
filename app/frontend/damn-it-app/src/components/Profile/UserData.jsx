import React, { useContext, useState } from "react";
import { UserConetext } from "../../context/UserContext";

const UserData = () =>{
    const [token] = useContext(UserConetext);
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [getName, setGetName] = useState("");
    const [getEmail, setGetEmail] = useState("");


    const getUser = async () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        };

        const response = await fetch("/user/me", requestOptions);
        const data = await response.json();
        if (response.ok){
            console.log(data);
            setGetName(data.fullname);
            setGetEmail(data.email);
            setPhone(data.phone);
        }
    }

    const updateUser = async () => {
        const requestOptions = {
            method: "PUT",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({
                fullname: fullname,
                email: email,
                phone: phone
            })
        }

        const response = await fetch("/user/update", requestOptions);
        const data = await response.json();
        if (response.ok){
            alert("Данные обновлены")
            console.log(data)
        } else {
            console.log(data)
        }
    }

    const onClickUpdate = (e) => {
        e.preventDefault();

        document.getElementById('fullnameId').disabled = false;
        document.getElementById('emailId').disabled = false;
        const updBut = document.getElementById('UpdateButProfile')
        updBut.textContent = "Сохранить";
        updBut.className = "button is-success";
        updBut.onClick = onClickSave;
    }

    const onClickSave = (e) => {
        e.preventDefault()
        updateUser();
    }

    getUser();

    return (
        <>
        <div className="column"></div>
        <div className="column">
            <div className="card" id="PrifileDataId">
                <div className="field">
                    <label className="label">ФИО</label>
                    <div className="control">
                        <input
                        className="input"
                        id="fullnameId"
                        value={fullname}
                        placeholder={getName}
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
                        id="emailId"
                        value={email}
                        placeholder={getEmail}
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
                <button className="button" id="UpdateButProfile" onClick={onClickUpdate}>Изменить</button>
            </div>
        </div>
        </>
    )
}

export default UserData
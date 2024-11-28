import React, { useContext, useState } from "react";
import {UserConetext} from "../../context/UserContext";
import UserNews from "./UserNews";


const UserData = () => {
    // State declarations
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [token] = useContext(UserConetext);
    const [userName, setUserName] = useState("");
    const [userPhone, setUserPhone] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [isActive, setIsActive] = useState(true);
    const [isActiveNotification, setIsActiveNotification] = useState(false);


    const getUser = async () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            const response = await fetch("/user/me", requestOptions);
            if (response.ok) {
                const data = await response.json();
                setUserName(data.fullname);
                setUserPhone(data.phone);
                setUserEmail(data.email);
            } else {
                console.error("Failed to fetch user data");
            }
        } catch (error) {
            console.error("Error fetching user data", error);
        }
    };

    const removeNotification = () => {
        setIsActiveNotification(false);
    };


    const sendUpdateData = async () => {
        const requestOptions = {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                fullname: fullname || userName,
                email: email || userEmail,
                phone: userPhone,
            })
        };

        try {
            const response = await fetch("/user/update", requestOptions);
            if (response.ok) {
                const data = await response.json();
                setUserName(data.fullname);
                setUserEmail(data.email);
                setIsActive(true);
                setIsActiveNotification(true);
            } else {
                console.error("Failed to update user data");
            }
        } catch (error) {
            console.error("Error updating user data", error);
        }
    };


    const updateUser = () => {
        setIsActive(!isActive);
    };


    getUser();

    return (
        <>
            <div className="column"></div>
            {isActiveNotification && (
                <div className="notification is-success" id="NotificationDiv">
                    <button className="delete" onClick={removeNotification}></button>
                    <p>Профиль успешно обновлен</p>
                </div>
            )}
            <div className="column">
                <div className="card">
                    <div className="field">
                        <label className="label">ФИО</label>
                        <div className="control">
                            <input
                                id="fullnameInput"
                                type="text"
                                className="input"
                                placeholder={userName}
                                value={fullname}
                                onChange={(e) => setFullname(e.target.value)}
                                required
                                disabled={isActive}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">E-mail</label>
                        <div className="control">
                            <input
                                id="emailInput"
                                type="email"
                                className="input"
                                placeholder={userEmail}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={isActive}
                            />
                        </div>
                    </div>
                    <div className="subscription">
                        <div>Подписка:</div>
                        <div id="sub-status">Активна</div>
                        <button className="button is-danger" id="sub-disable">Отменить</button>
                    </div>
                    <button className="button" id="UpdateButProfile" onClick={isActive ? updateUser : sendUpdateData}>
                        {isActive ? "Изменить" : "Сохранить"}
                    </button>
                </div>
            </div>
            <div className="column">
                <UserNews/>
            </div>
        </>
    );
};

export default UserData;

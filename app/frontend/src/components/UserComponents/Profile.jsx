import {useState} from "react";
import { useNavigate } from "react-router-dom";
import UserNews from "./News";


const Profile = () => {
    // State declarations
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [userName, setUserName] = useState(localStorage.getItem("fullname"));
    const [userPhone, setUserPhone] = useState(localStorage.getItem("phone"));
    const [userEmail, setUserEmail] = useState(localStorage.getItem("email"));
    const [isActive, setIsActive] = useState(true);
    const [isActiveNotification, setIsActiveNotification] = useState(false);
    const navigate = useNavigate();


    const getUser = async () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            const response = await fetch("https://ivalukyan-backend-damnitbot-12c1.twc1.net/user/me", requestOptions);
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
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                fullname: fullname || userName,
                email: email || userEmail,
                phone: userPhone,
            })
        };

        try {
            const response = await fetch("https://ivalukyan-backend-damnitbot-12c1.twc1.net/user/update", requestOptions);
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

    const handleLogout = () => {
        setToken(null);
        navigate("/")
    }

    return (
        <>
            {
                token && (
                    <>
                        <nav className="navbar" id="HeaderId">
                            <a className="user-icon" href="/user/me">
                                <svg xmlns="http://www.w3.org/2000/svg" id="BackSvg" width="32" height="32"
                                     fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                                    <path fillRule="evenodd"
                                          d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
                                </svg>
                            </a>
                            <h4 className="title-header" id="TitleHeader">DamnIT</h4>
                            <button className="button is-danger" id="LogoutBut" onClick={handleLogout}>Выйти</button>
                        </nav>
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
                                <button className="button" id="UpdateButProfile"
                                        onClick={isActive ? updateUser : sendUpdateData}>
                                    {isActive ? "Изменить" : "Сохранить"}
                                </button>
                            </div>
                        </div>
                        <div className="column">
                            <UserNews />
                        </div>
                    </>
                )
            }
        </>
    );
};

export default Profile;

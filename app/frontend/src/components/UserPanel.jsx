import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";

const UserPanel = () => {
    const [news, setNews] = useState([]);
    const [isModalActive, setModalActive] = useState(false);
    const [selectedNews, setSelectedNews] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [userId, setUserId] = useState(localStorage.getItem("awesomeUserId"));
    const [notification, setNotification] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [userNews, setUserNews] = useState([]);
    const [saveMessage, setSaveMessage] = useState("")

    const navigate = useNavigate();

    const toggleModal = (newsItem = null) => {
        setModalActive(!isModalActive);
        setSelectedNews(newsItem);
    };

    const closeModal = () => {
        setNotification(false);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    // сonsole.log("user panel", token)

    useEffect(() => {
        const getUserNews = async () => {
            const requestOptions = {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({user_id: userId})
            };

            const response = await fetch("/api/user/news", requestOptions);

            if (!response.ok) {
                throw new Error("Failed loading user news");
            }
            const data = await response.json();
            setUserNews(data.news);
        }

        getUserNews();
    }, []);

    const handleSaveNews = async (news_id) => {

        if (userNews.length !== 0) {
            const isAlreadySaved = userNews.some((el) => el.id === news_id);

            if (isAlreadySaved) {
                setSaveMessage("Новость уже сохранена!");
                setNotification(true);
                return;
            }
        }


        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                news_id: news_id,
                user_id: userId,
            }),
        };

        try {

            const response = await fetch("/api/news/save", requestOptions);

            if (!response.ok) {
                console.error("Bad request");
            } else {
                const data = await response.json();
                setSaveMessage(data.msg);
                setNotification(true);
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };


    const getUser = async () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        };

        const response = await fetch("/api/user/me", requestOptions);

        if (!response.ok) {
            setToken(null);
            setUserId(null);
        } else {
            const data = await response.json();
            localStorage.setItem("awesomeUserId", data.id);
        }
    };

    const getNews = async () => {
        const requestOptions = {
            method: 'GET',
            headers: {"Content-Type": "application/json"},
        };

        try {
            const response = await fetch("/api/news/", requestOptions);
            if (!response.ok) throw new Error("Network response was not ok");
            const data = await response.json();
            setNews(data);
        } catch (error) {
            console.error("Failed to fetch news:", error);
        }
    };

    const handleLogout = () => {
        setToken(null);
    };

    useEffect(() => {
        getNews();
        getUser();
    }, []);

    useEffect(() => {
        if (!token) {
            navigate("/");
        }
    }, [token, navigate]);

    return (
        <>
            <nav className="admin-header">
                <a href='/user/profile' style={{color: "#fff"}}>
                    <svg style={{border: "2px solid #1d94f8"}} xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                         className="bi bi-person" viewBox="0 0 16 16">
                        <path
                            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                    </svg>
                </a>
                <p className="title-header">DamnIT</p>
                <button className="button is-danger" onClick={handleLogout}>Выйти</button>
            </nav>
            <div className="control-search" style={{margin: "25px 10px"}}>
                <input
                    type="text"
                    id="searchFieldId"
                    className="input"
                    placeholder="Поиск"
                    autoComplete="off"
                    required
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <div style={{margin: "10px 10px"}}>
                <a className="mini-card" href="/user/chat">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor"
                         className="bi bi-person-fill" viewBox="0 0 16 16">
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                    </svg>
                    <p className="mini-card-text">Чат</p>
                </a>
            </div>
            <div style={{margin: "10px 10px"}}>
                <a className="mini-card" href="/user/store">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor"
                         className="bi bi-shop-window" viewBox="0 0 16 16">
                        <path
                            d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.37 2.37 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0M1.5 8.5A.5.5 0 0 1 2 9v6h12V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5m2 .5a.5.5 0 0 1 .5.5V13h8V9.5a.5.5 0 0 1 1 0V13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5a.5.5 0 0 1 .5-.5"/>
                    </svg>
                    <p className="mini-card-text">Магазин заказов</p>
                </a>
            </div>
            {notification && (<div className="notification is-info">
                <button className="delete" onClick={closeModal}></button>
                {saveMessage}
            </div>)}
            <div className="column" id="main">
                {news
                    .filter((el) => el.title.toLowerCase().includes(searchTerm))
                    .map((el) => (
                        <div key={el.id} className="card">
                            <h4 className="title is-4">{el.title}</h4>
                            <div className="mb-5">{el.short_info}</div>
                            <button
                                type="button"
                                className="button is-primary"
                                onClick={() => toggleModal(el)}
                            >
                                Подробнее
                            </button>
                        </div>
                    ))}

                {isModalActive && selectedNews && (
                    <div className="modal-overlay" onClick={() => toggleModal()}>
                        <div
                            className="modal-content animated"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="modal-head">
                                <h2 className="modal-card-title">{selectedNews.title}</h2>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => toggleModal()}
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                {selectedNews.info}
                            </div>
                            <div className="modal-footer">
                                <button type="button" onClick={() => handleSaveNews(selectedNews.id)}
                                        className="button is-info" id="SaveNewsBtn">
                                    Сохранить
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default UserPanel;

import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const UserPanel = () => {
    const [news, setNews] = useState([]);
    const [isModalActive, setModalActive] = useState(false);
    const [selectedNews, setSelectedNews] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [userId, setUserId] = useState(localStorage.getItem("awesomeUserId"));
    const [notification, setNotification] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

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

    const handleSaveNews = async (news_id) => {
        const requestOptions = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                news_id: news_id,
                user_id: userId
            })
        };

        const response = await fetch("/news/save", requestOptions);
        if (!response.ok) {
            console.error("Bad request");
        } else {
            const data = await response.json();
            console.log(data.msg);
            setNotification(true);
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
            headers: { "Content-Type": "application/json" },
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
            {token ? (
                <>
                    <nav className="admin-header">
                        <a href='/user/profile' style={{ color: "#fff" }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                                className="bi bi-person" viewBox="0 0 16 16">
                                <path
                                    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                            </svg>
                        </a>
                        <p className="title-header">DamnIT</p>
                        <button className="button is-danger" onClick={handleLogout}>Выйти</button>
                    </nav>
                    <div className="control-search" style={{ margin: "25px 10px" }}>
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
                    <div style={{ margin: "10px 10px" }}>
                        <a className="mini-card" href="/user/chat">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor"
                                className="bi bi-person-fill" viewBox="0 0 16 16">
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                            </svg>
                            <p className="mini-card-text">Чат</p>
                        </a>
                    </div>
                    {notification && (<div className="notification is-info">
                        <button className="delete" onClick={closeModal}></button>
                        Статья сохранена.
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
            ) : null}
        </>
    );
};

export default UserPanel;

import React, {useState, useEffect, useContext} from 'react';
import {UserConetext} from "../context/UserContext";

const News = () => {
    const [news, setNews] = useState([]);
    const [isModalActive, setModalActive] = useState(false);
    const [selectedNews, setSelectedNews] = useState(null);
    const [token, setToken] = useContext(UserConetext);
    const [userId, setUserId] = useState(localStorage.getItem("awesomeUserId"));
    const [notification, setNotification] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const toggleModal = (newsItem = null) => {
        setModalActive(!isModalActive);
        setSelectedNews(newsItem);
    };

    const closeModal = () => {
        setNotification(false);
    }

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const handleSaveNews = async (news_id) => {

        const requestOptions = {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                news_id: news_id,
                user_id: userId
            })
        }

        const response = await fetch("/news/save", requestOptions);
        if (!response.ok) {
            console.error("Bad request");
        } else {
            const data = await response.json()
            console.log(data.msg);
            setNotification(true);
        }
    }

    const getUser = async () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        };

        const response = await fetch("/user/me", requestOptions);

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
            const response = await fetch("/news", requestOptions);
            if (!response.ok) throw new Error("Network response was not ok");
            const data = await response.json();
            setNews(data);
        } catch (error) {
            console.error("Failed to fetch news:", error);
        }
    };

    useEffect(() => {
        getNews();
        getUser();
    }, []);

    return (
        <>
            <div className="control-search">
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
    );
};

export default News;

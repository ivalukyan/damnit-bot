import React, { useState, useEffect } from 'react';

const News = () => {
    const [news, setNews] = useState([]);
    const [isModalActive, setModalActive] = useState(false);
    const [selectedNews, setSelectedNews] = useState(null);

    const toggleModal = (newsItem = null) => {
        setModalActive(!isModalActive);
        setSelectedNews(newsItem);
    };

    const getNews = async () => {
        const requestOptions = {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
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
    }, []);

    return (
        <div className="column" id="main">
            {news.map((el) => (
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
                            <button type="button" className="button is-info" id="SaveNewsBtn">
                                Сохранить
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default News;

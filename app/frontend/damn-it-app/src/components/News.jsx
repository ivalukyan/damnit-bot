import React, { useState } from 'react';

const News = () => {
    const [isModalActive, setModalActive] = useState(false);

    const toggleModal = () => {
        setModalActive(!isModalActive);
    };

    return (
        <div className="column">
            <div className="card">
                <h4 className="title is-4">Заголовок новости</h4>
                <div className="content">Краткое содержание статьи</div>
                <div className="news-buttons">
                    <button className="button is-info" onClick={toggleModal} id="NewsInfoBut">Подробнее</button>
                    <div className={`modal ${isModalActive ? 'is-active' : ''}`}>
                        <div className="modal-background" onClick={toggleModal}></div>
                        <div className="modal-card">
                            <header className="modal-card-head">
                                <p className="modal-card-title">Заголовок новости</p>
                            </header>
                            <section className="modal-card-body">
                                <p>Статья</p>
                            </section>
                            <footer className="modal-card-foot">
                                <button className="button is-primary" id="NewsSaveBut">Cохраниить статью</button>
                            </footer>
                        </div>
                        <button className="modal-close is-large" aria-label="close" onClick={toggleModal}></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default News;
import React, {useEffect, useState} from "react";

const UserStore = () => {

    const [cards, setCards] = useState([]);
    const [isModalActive, setModalActive] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const toggleModal = (cardItem = null) => {
        setModalActive(!isModalActive);
        setSelectedCard(cardItem);
    };

    useEffect(() => {
        const getCards = async () => {
            const requestOptions = {
                method: "GET",
                headers: {"Content-Type": "application/json"},
            };

            const response = await fetch("/api/user/store");

            if (!response.ok) {
                throw new Error("Failed loading user news");
            }
            const data = await response.json();
            setCards(data);
        }

        getCards();
    }, []);

    const handleCard = () => {
        // Сделать заказ
    }

    return (
        <>
            <nav className="navbar">
                <a className="navbar-brand" href="/user/me">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor"
                         className="bi bi-caret-left-fill" viewBox="0 0 16 16">
                        <path
                            d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
                    </svg>
                </a>
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
            <div className="column" id="main">
                {cards
                    .filter((el) => el.title.toLowerCase().includes(searchTerm))
                    .map((el) => (
                        <div key={el.id} className="card">
                            <h4 className="title is-4">{el.title}</h4>
                            <div className="mb-5" style={{
                                display: "flex",
                                padding: "3px",
                                boxShadow: "rgba(0, 0, 0, 0.4) 0 5px 15px 0",
                                borderRadius: "8px"
                            }}
                            >{el.short_info} руб.</div>
                            <button
                                type="button"
                                className="button is-primary"
                                onClick={() => toggleModal(el)}
                            >
                                Подробнее
                            </button>
                        </div>
                    ))}

                {isModalActive && selectedCard && (
                    <div className="modal-overlay" onClick={() => toggleModal()}>
                        <div
                            className="modal-content animated"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="modal-head">
                                <h2 className="modal-card-title">{selectedCard.title}</h2>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => toggleModal()}
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                {selectedCard.info}
                            </div>
                            <div className="modal-footer">
                                <button type="button" onClick={() => handleCard(selectedCard.id)}
                                        className="button is-info" id="SaveNewsBtn">
                                    Заказать услугу
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default UserStore;
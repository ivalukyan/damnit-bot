import React, {useEffect, useState} from 'react';


const Store = () => {
    const [header, setHeader] = useState("");
    const [isModalActive, setModalActive] = useState(false);
    const [store, setStore] = useState([]);
    const [selectStore, setSelectStore] = useState(null);


    const toggleModal = (newsItem = null) => {
        setModalActive(!isModalActive);
        setSelectStore(newsItem);
    };

    const getHeader = async () => {
        const requestOptions = {
            method: 'GET',
            headers: {"Content-Type": "application/json"}
        }

        const response = await fetch("/api", requestOptions);
        if (!response.ok){
            console.error("Request response was not ok");
        } else {
            const data = await response.json();
            setHeader(data.message);
        }
    }

    const getStoreInfo = async () => {
        const requestOptions = {
            method: "GET",
            headers: {"Content-Type": "application/json"}
        }

        try{
            const response = await fetch("/store/", requestOptions);
            if (!response.ok){
                console.error(response);
            } else {
                const data = await response.json();
                console.log(data)
                setStore(data);
            }
        } catch (e){
            console.error(e);
        }
    }

    useEffect(() => {
        getHeader();
        getStoreInfo();
    }, []);


    return (
        <>
            <div className="column"></div>
            <nav className="title has-text-centered">
                {header}
            </nav>
            <div className="column">
                {store.map((el) => (
                <div key={el.id} className="card">
                    <div className="card-header">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                            className="bi bi-robot" viewBox="0 0 16 16">
                            <path
                                d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5M3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.6 26.6 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.93.93 0 0 1-.765.935c-.845.147-2.34.346-4.235.346s-3.39-.2-4.235-.346A.93.93 0 0 1 3 9.219zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a25 25 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25 25 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135"/>
                            <path
                                d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2zM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5"/>
                        </svg>
                        <h4 className="title is-4">{el.title}</h4>
                    </div>
                    <div className="card-body">
                        <p>{el.short_info}</p>
                    </div>
                    <div className="card-buttons">
                        <button
                            type="button"
                            className="button"
                            onClick={() => toggleModal(el)}
                        >Подробнее</button>
                    </div>
                </div>
                ))}
            </div>
            {isModalActive && selectStore && (
                <div className="modal-overlay" onClick={() => toggleModal()}>
                    <div
                        className="modal-content animated"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="modal-head">
                            <h2 className="modal-card-title">{selectStore.title}</h2>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={() => toggleModal()}
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            {selectStore.info}
                        </div>
                        <div className="modal-footer">
                            <button type="button"
                                    className="button is-primary"
                                    id="SaveNewsBtn">
                                Сделать заказ
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Store;
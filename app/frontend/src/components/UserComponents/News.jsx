import {useState} from "react";
import {useEffect} from "react";

const UserNews = () => {
    const [news, setNews] = useState([]);
    const [userId] = useState(localStorage.getItem("awesomeUserId"));
    const [isModalActive, setModalActive] = useState(false);
    const [selectedNews, setSelectedNews] = useState(null);
    const [notification, setNotification] = useState(false);
    const [message, setMessage] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const closeModal = () => {
        setNotification(false);
        //window.location.reload();
    }

    const getUserNews = async () => {
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ user_id: userId })
        }

        const response = await fetch("/api/user/news", requestOptions);

        if (!response.ok){
            const data = await response.json();
            console.error(data);
        } else {
            const data = await response.json();
            setNews(data.news);
        }
    }

    const handleDelNews = async (news_id) => {
        if (!window.confirm("Вы действительно хотите удалить данную новость?")) return;


        if (!news_id) {
            setMessage("Статья уже удалена!");
            setNotification(true);
            return;
        }

        const requestOptions = {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ news_id, user_id: userId })
        }

        const response = await fetch("/api/user/news_del", requestOptions);
        if (!response.ok) {
            console.error("Bad request");
        } else {
            const data = await response.json();
            setMessage(data.msg);
            setNotification(true);
        }
    }

    const toggleModal = (newsItem = null) => {
        setModalActive(!isModalActive);
        setSelectedNews(newsItem);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    useEffect(() => {
        getUserNews();
    }, []);

    return (
        <>
            <p className="title has-text-centered is-4">Мои новости</p>
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
            {notification && (
                <div className="notification is-info" style={{margin: "20px 15px"}}>
                    <button className="delete" onClick={closeModal}></button>
                    {message}
                </div>
            )}
            <div className="column">
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
                                <button
                                    type="button"
                                    onClick={() => handleDelNews(selectedNews.id)}
                                    className="button is-danger"
                                    id="SaveNewsBtn"
                                >
                                    Удалить
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default UserNews;
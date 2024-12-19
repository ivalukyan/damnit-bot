import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const StoreTape = () => {
    const [store, setStore] = useState([]);
    const navigate = useNavigate();

    const getStoreInfo = async () => {
        const requestOptions = {
            method: "GET",
            headers: {"Content-Type": "application/json"}
        }

        try{
            const response = await fetch("https://ivalukyan-backend-damnitbot-12c1.twc1.net/store/", requestOptions);
            if (!response.ok){
                console.error(response);
            } else {
                const data = await response.json();
                setStore(data);
            }
        } catch (e){
            console.error(e);
        }
    };


    const AddStoreCard = (e) => {
        e.preventDefault();
        window.location.href = "/admin/store/add";
    }

    const UpdateStoreCard = (cardId) => {
        localStorage.setItem("card_id_update", cardId);
        navigate(`/admin/store/update`);
    }

    const DeleteStoreCard = async (cardId) => {
        if (!window.confirm("Вы действительно хотите удалить данную карту?")) return;

        const requestOptions = {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                card_id: cardId
            })
        };

        const response = await fetch("https://ivalukyan-backend-damnitbot-12c1.twc1.net/admin/store/delete", requestOptions);
        if (!response.ok){
            throw new Error("Failed delete card");
        } else {
            const data = await response.json();
            console.log(data);
            window.location.reload();
        }
    }

    const handleNotification = () => {
        navigate("/admin/store/notification")
    }

    useEffect(() => {
        getStoreInfo();
    }, []);

    return (
        <>
            <nav className="navbar">
                <a className="navbar-brand" href="/admin/me">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor"
                         className="bi bi-caret-left-fill" viewBox="0 0 16 16">
                        <path
                            d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
                    </svg>
                </a>
            </nav>
            <div style={{margin: "20px 13px"}}>
                <button
                    className="button"
                    style={{
                        width: "100%",
                        background: "#1ed760",
                        color: "#000",
                        border: "none",
                        outline: "none"
                    }}
                    onClick={AddStoreCard}
                    type="button"
                >Добавить
                </button>
            </div>
            <div style={{margin: "20px 13px"}}>
                <button
                    className="button"
                    style={{
                        width: "100%",
                        border: "none",
                        outline: "none",
                        color: "#000",
                        backgroundColor: "#1d94f8",
                        borderRadius: "6px"
                    }}
                    onClick={handleNotification}
                    type="button"
                >
                    Уведомления
                </button>
            </div>
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
                            <p>{el.short_info} руб.</p>
                        </div>
                        <button className="button is-primary" onClick={() => UpdateStoreCard(el.id)}>Изменить</button>
                        <button
                            className="button is-danger"
                            style={{width: "100%", margin: "10px 0"}}
                            onClick={() => DeleteStoreCard(el.id)}
                        >Удалить
                        </button>
                    </div>
                ))}
            </div>
        </>
    )
};

export default StoreTape;
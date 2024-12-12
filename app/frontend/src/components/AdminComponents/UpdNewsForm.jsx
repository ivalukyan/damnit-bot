import React, { useEffect, useState } from "react";

const UpdateNewsForm = () => {
    const [newsId, setNewsId] = useState(localStorage.getItem("news_id_update"));
    const [title, setTitle] = useState("");
    const [shortInfo, setShortInfo] = useState("");
    const [info, setInfo] = useState("");
    const [newTitle, setNewTitle] = useState("");
    const [newShortInfo, setNewShortInfo] = useState("");
    const [newInfo, setNewInfo] = useState("");
    const [error, setError] = useState(null);


    useEffect(() => {
        const getCardData = async () => {
            try {
                const response = await fetch("/api/admin/news/get_by_id", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ news_id: newsId }),
                });

                if (!response.ok) {
                    throw new Error("Не удалось получить данные.");
                }

                const data = await response.json();
                setTitle(data.title);
                setShortInfo(data.short_info);
                setInfo(data.info);
            } catch (err) {
                console.error(err);
                setError(err.message);
            }
        };

        getCardData();
    }, [newsId]);

    const sendNewsForm = async () => {
        try {
            const response = await fetch("/api/admin/news/update", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    news_id: newsId,
                    title: newTitle || title,
                    short_info: newShortInfo || shortInfo,
                    info: newInfo || info,
                }),
            });

            if (!response.ok) {
                throw new Error("Не удалось обновить новость.");
            }

            const data = await response.json();
            console.log(data);
            window.location.href = "/admin/news";
        } catch (err) {
            console.error(err);
            setError(err.message);
        }
    };

    return (
        <>
            <nav className="navbar">
                <a className="navbar-brand" href="/admin/news">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        fill="currentColor"
                        className="bi bi-caret-left-fill"
                        viewBox="0 0 16 16"
                    >
                        <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                    </svg>
                </a>
            </nav>
            <div className="column">
                <h1 className="title has-text-centered">Обновить новость</h1>
                {error && <div className="notification is-danger">{error}</div>}
                <div className="mb-3">
                    <label className="label">Название новости</label>
                    <div className="control">
                        <input
                            type="text"
                            placeholder={title}
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            className="input"
                            required
                        />
                    </div>
                </div>
                <div className="mb-3">
                    <label className="label">Новость (краткое описание)</label>
                    <div className="control">
                        <input
                            type="text"
                            placeholder={shortInfo}
                            value={newShortInfo}
                            onChange={(e) => setNewShortInfo(e.target.value)}
                            className="input"
                            required
                        />
                    </div>
                </div>
                <div className="mb-3">
                    <label className="label">Подробное описание новости</label>
                    <div className="control">
                        <textarea
                            className="textarea-input"
                            rows="3"
                            placeholder={info}
                            value={newInfo}
                            onChange={(e) => setNewInfo(e.target.value)}
                        ></textarea>
                    </div>
                </div>
                <button
                    className="button-submit"
                    type="submit"
                    style={{ background: "#1ed760" }}
                    onClick={sendNewsForm}
                >
                    Обновить
                </button>
            </div>
        </>
    );
};

export default UpdateNewsForm;

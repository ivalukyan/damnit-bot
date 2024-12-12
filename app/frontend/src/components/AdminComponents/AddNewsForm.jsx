import React, {useState} from "react";

const AddNewsForm = () => {

    const [title, setTitle] = useState("");
    const [shortInfo, setShortInfo] = useState("");
    const [info, setInfo] = useState("");

    const sendNewsForm = async () => {
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                title: title,
                short_info: shortInfo,
                info: info
            })
        }

        const response = await fetch("/api/admin/news/add", requestOptions);
        if (!response.ok) {
            throw new Error("Failed send data in store form");
        }

        console.log(await response.json());
        window.location.href = "/admin/news";
    }

    return (
        <>
            <nav className="navbar">
                <a className="navbar-brand" href="/admin/news">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor"
                         className="bi bi-caret-left-fill" viewBox="0 0 16 16">
                        <path
                            d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
                    </svg>
                </a>
            </nav>
            <div className="column">
                <h1 className="title has-text-centered">Создать новость</h1>
                <div className="mb-3">
                    <label className="label">Название новости</label>
                    <div className="control">
                        <input
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="input"
                            required
                        />
                    </div>
                </div>
                <div className="mb-3">
                    <label className="label">Новость в сокращенная версия</label>
                    <div className="control">
                        <input
                            type="text"
                            placeholder="Short Info"
                            value={shortInfo}
                            onChange={(e) => setShortInfo(e.target.value)}
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
                            placeholder="Info"
                            rows="3"
                            value={info}
                            onChange={(e) => setInfo(e.target.value)}
                        ></textarea>
                    </div>
                </div>
                <button
                    className="button-submit"
                    type="submit"
                    style={{background: "#1ed760"}}
                    onClick={sendNewsForm}
                >
                    Создать
                </button>
            </div>
        </>
    )
}

export default AddNewsForm;
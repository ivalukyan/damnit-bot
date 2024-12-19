import React, {useState} from "react";

const AddStoreForm = () => {

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [info, setInfo] = useState("");

    const sendStoreForm = async () => {
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                title: title,
                short_info: price,
                info: info
            })
        }

        const response = await fetch("https://ivalukyan-backend-damnitbot-12c1.twc1.net/admin/store/add", requestOptions);
        if (!response.ok){
            throw new Error("Failed send data in store form");
        }

        console.log(await response.json());
        window.location.href = "/admin/store";
    }

    return (
        <>
            <nav className="navbar">
                <a className="navbar-brand" href="/admin/store">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor"
                         className="bi bi-caret-left-fill" viewBox="0 0 16 16">
                        <path
                            d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
                    </svg>
                </a>
            </nav>
            <div className="column">
                <h1 className="title has-text-centered">Создать услугу</h1>
                <div className="mb-3">
                    <label className="label">Название услуги</label>
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
                    <label className="label">Стоимость услуги</label>
                    <div className="control">
                        <input
                            type="text"
                            placeholder="Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="input"
                            required
                        />
                    </div>
                </div>
                <div className="mb-3">
                    <label className="label">Подробное описание услуги</label>
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
                    onClick={sendStoreForm}
                >
                    Создать
                </button>
            </div>
        </>
    )
}

export default AddStoreForm;
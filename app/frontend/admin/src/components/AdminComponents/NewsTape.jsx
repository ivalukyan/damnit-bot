import {useEffect, useState} from "react";

const NewsTape = () => {
    const [token] = useState(localStorage.getItem("token"));
    const [search, setSearch] = useState("");
    const [news, setNews] = useState([]);

    const NewsList = async () => {
        const requestOptions = {
            method: "GET",
            headers: {"Content-Type": "application/json"}
        }

        const response = await fetch("/news");
        if (!response.ok) {
            throw new Error("Getting news failed");
        } else {
            const data = await response.json();
            setNews(data);
        }
    }

    const handleSearch = (e) => {
        setSearch(e.target.value.toLowerCase());
    }

    useEffect(() => {
        NewsList();
    })

    return (
        <>
            {token && (
                <>
                    <nav className="navbar">
                        <a className="navbar-brand" href="/admin">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor"
                                 className="bi bi-caret-left-fill" viewBox="0 0 16 16">
                                <path
                                    d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
                            </svg>
                        </a>
                    </nav>
                    <div className="column">
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                placeholder="Поиск"
                                value={search}
                                onChange={handleSearch}
                            />
                        </div>
                        <div className="column">
                            {news
                                .filter((el) => el.title.toLowerCase().includes(search.toLowerCase()))
                                .map((el) => (
                                    <div key={el.id} className="card">
                                        <h4 className="title is-4">{el.title}</h4>
                                        <p>Краткая информация: {el.short_info}</p>
                                        <p>Инфо: {el.info}</p>
                                        <button className="button is-primary" id="UserUpdateButton">Изменить</button>
                                        <button className="button is-danger" id="UserDeleteButton">Удалить</button>
                                    </div>
                                ))}
                        </div>
                    </div>
                </>
            )}
        </>
    )
};

export default NewsTape;
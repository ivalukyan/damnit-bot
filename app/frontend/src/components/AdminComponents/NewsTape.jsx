import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NewsTape = () => {
    const [token] = useState(localStorage.getItem("token"));
    const [search, setSearch] = useState("");
    const [news, setNews] = useState([]);
    const [error, setError] = useState(null); // Add error state for better UX
    const navigate = useNavigate();

    // Fetch news list from API
    const fetchNewsList = async () => {
        if (!token) return; // Prevent API call if token is missing

        try {
            const response = await fetch("https://ivalukyan-backend-damnitbot-12c1.twc1.net/news/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // Add token here
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch news");
            }

            const data = await response.json();
            setNews(data);
        } catch (error) {
            setError("Unable to load news. Please check your connection or try again later.");
            console.error("Error fetching news:", error.message);
        }
    };

    // Handle updating news
    const handleUpdateNews = (newsId) => {
        localStorage.setItem("news_id_update", newsId);
        navigate("/admin/news/update");
    };

    // Handle deleting news
    const handleDeleteNews = async (newsId) => {
        if (!window.confirm("Вы действительно хотите удалить данную новость?")) return;

        try {
            const response = await fetch("https://ivalukyan-backend-damnitbot-12c1.twc1.net/admin/news/delete", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // Add token here
                },
                body: JSON.stringify({ news_id: newsId }),
            });

            if (!response.ok) {
                throw new Error("Failed to delete news");
            }

            alert("Новость удалена");
            setNews((prevNews) => prevNews.filter((el) => el.id !== newsId)); // Update state immutably
        } catch (error) {
            setError("Failed to delete news. Please try again.");
            console.error("Error deleting news:", error.message);
        }
    };

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearch(e.target.value.toLowerCase());
    };

    // Redirect to Add News page
    const redirectToAddNews = () => {
        navigate("/admin/news/add");
    };

    useEffect(() => {
        fetchNewsList();
    }, []); // Runs only once on component mount

    if (!token) {
        return <p>Please log in to view news.</p>;
    }

    return (
        <>
            <nav className="navbar">
                <a className="navbar-brand" href="/admin/me">
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
            <div style={{ margin: "0 11px" }}>
                <div style={{ margin: "20px 13px" }}>
                    <button
                        className="button"
                        style={{
                            width: "100%",
                            background: "#1ed760",
                            color: "#000",
                            border: "none",
                        }}
                        onClick={redirectToAddNews}
                    >
                        Добавить
                    </button>
                </div>
            </div>

            <div className="column">
                {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error */}
                <div style={{ margin: "0 10px" }}>
                    <div className="control">
                        <input
                            type="text"
                            className="input"
                            placeholder="Поиск"
                            value={search}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>
                <div className="column">
                    {news
                        .filter((el) => el.title.toLowerCase().includes(search))
                        .map((el) => (
                            <div key={el.id} className="card">
                                <h4 className="title is-4">{el.title}</h4>
                                <p
                                    style={{
                                        boxShadow: "rgba(0, 0, 0, 0.6) 0 5px 15px 0",
                                        borderRadius: "8px",
                                        padding: "5px",
                                    }}
                                >
                                    {el.short_info}
                                </p>
                                <p
                                    style={{
                                        boxShadow: "rgba(0, 0, 0, 0.6) 0 5px 15px 0",
                                        borderRadius: "8px",
                                        padding: "5px",
                                        margin: "15px 0",
                                    }}
                                >
                                    {el.info}
                                </p>
                                <button
                                    className="button is-primary"
                                    onClick={() => handleUpdateNews(el.id)}
                                >
                                    Изменить
                                </button>
                                <button
                                    className="button is-danger"
                                    style={{ margin: "10px 0", width: "100%" }}
                                    onClick={() => handleDeleteNews(el.id)}
                                >
                                    Удалить
                                </button>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
};

export default NewsTape;

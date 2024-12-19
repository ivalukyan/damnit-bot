import React, { useEffect, useState, useCallback } from "react";

const AddUsersForm = () => {
    const [token] = useState(localStorage.getItem("token"));
    const [search, setSearch] = useState("");
    const [newUsers, setNewUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getNewUsers = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("https://ivalukyan-backend-damnitbot-12c1.twc1.net/admin/notifications", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                throw new Error("Failed loading notifications");
            }

            const data = await response.json();
            setNewUsers(data);
        } catch (err) {
            console.error(err);
            setError("Ошибка загрузки данных пользователей.");
        } finally {
            setLoading(false);
        }
    }, []);

    const handleSearch = (e) => {
        setSearch(e.target.value.toLowerCase());
    };

    const approveUser = useCallback(async (list, not_id) => {
        try {
            const response = await fetch("https://ivalukyan-backend-damnitbot-12c1.twc1.net/admin/notifications/approve", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    user_id: not_id,
                    fullname: list[0],
                    phone: list[2],
                    email: list[1],
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to approve user");
            }

            // Remove approved user from the list
            setNewUsers((prevUsers) =>
                prevUsers.filter((user) => user.data[2] !== list[2])
            );
        } catch (err) {
            console.error(err);
            setError("Ошибка подтверждения пользователя.");
        }
    }, []);

    const abortUser = useCallback(async (not_id) => {
        try {
            const response = await fetch("https://ivalukyan-backend-damnitbot-12c1.twc1.net/admin/notifications/rejection", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    user_id: not_id,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to reject user");
            }

            setNewUsers((prevUsers) => prevUsers.filter((user) => user.id !== not_id));
        } catch (err) {
            console.error(err);
            setError("Ошибка отклонения пользователя.");
        }
    }, []);

    useEffect(() => {
        getNewUsers();
    }, [getNewUsers]);

    if (!token) {
        return <p>Токен не найден. Пожалуйста, выполните вход.</p>;
    }

    return (
        <>
            <nav className="navbar">
                <a className="navbar-brand" href="/admin/list_users">
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
                <div className="control">
                    <input
                        type="text"
                        className="input"
                        placeholder="Поиск"
                        value={search}
                        onChange={handleSearch}
                    />
                </div>

                {loading && <p>Загрузка данных...</p>}
                {error && <p className="error">{error}</p>}

                <div className="column">
                    {newUsers
                        .filter((el) => el.data[0].toLowerCase().includes(search))
                        .map((el, index) => (
                            <div key={index} className="card">
                                <h4 className="title is-4">{el.data[0]}</h4>
                                <p>Телефон: {el.data[2]}</p>
                                <p>E-mail: {el.data[1]}</p>
                                <button
                                    className="button is-primary"
                                    id="UserUpdateButton"
                                    onClick={() => approveUser(el.data, el.id)}
                                >
                                    Подтвердить
                                </button>
                                <button
                                    className="button is-danger"
                                    id="UserDeleteButton"
                                    onClick={() => abortUser(el.id)}
                                >
                                    Отказать
                                </button>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
};

export default AddUsersForm;

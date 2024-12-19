import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UsersTape = () => {
    const [token] = useState(localStorage.getItem("token"));
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const UsersList = async () => {
        if (!token) {
            setError("Токен отсутствует. Пожалуйста, выполните вход.");
            setLoading(false);
            return;
        }

        try {
            const requestOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await fetch("https://ivalukyan-backend-damnitbot-12c1.twc1.net/admin/list_users", requestOptions);
            if (!response.ok) {
                throw new Error("Не удалось загрузить список пользователей");
            }

            const data = await response.json();
            setUsers(data);
        } catch (err) {
            setError(err.message || "Ошибка сети. Попробуйте снова.");
        } finally {
            setLoading(false);
        }
    };

    const redirectToAddUser = () => {
        navigate("/admin/list_users/add");
    };

    const DeleteUser = async (userId) => {
        if (!window.confirm("Вы действительно хотите удалить данного пользователя?")) return;

        try {
            const requestOptions = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ user_id: userId }),
            };

            const response = await fetch("https://ivalukyan-backend-damnitbot-12c1.twc1.net/admin/user/delete", requestOptions);
            if (!response.ok) {
                throw new Error("Не удалось удалить пользователя");
            }

            alert("Пользователь успешно удален");
            setUsers(users.filter((user) => user.id !== userId));
        } catch (err) {
            alert(err.message || "Ошибка удаления пользователя.");
        }
    };

    const UpdateUser = (userId) => {
        localStorage.setItem("user_id_update", userId);
        navigate(`/admin/list_users/update`);
    };

    const handleSearch = (e) => {
        setSearch(e.target.value.toLowerCase());
    };

    useEffect(() => {
        if (token) {
            UsersList();
        } else {
            navigate("/login");
        }
    }, [token, navigate]);

    if (loading) {
        return <div className="loader">Загрузка...</div>;
    }

    if (error) {
        return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
    }

    return (
        <>
            {token && (
                <>
                    <nav className="navbar">
                        <a
                            className="navbar-brand"
                            href="/admin/me"
                            aria-label="Вернуться к профилю"
                        >
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
                                onClick={redirectToAddUser}
                                aria-label="Добавить нового пользователя"
                            >
                                Добавить
                            </button>
                        </div>
                    </div>
                    <div className="column">
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                placeholder="Поиск"
                                value={search}
                                onChange={handleSearch}
                                aria-label="Поиск пользователей"
                            />
                        </div>
                        <div className="column">
                            {users.length === 0 ? (
                                <p>Пользователи не найдены.</p>
                            ) : (
                                users
                                    .filter((el) =>
                                        el.fullname.toLowerCase().includes(search)
                                    )
                                    .map((el) => (
                                        <div key={el.id} className="card">
                                            <h4 className="title is-4">{el.fullname}</h4>
                                            <p>Телефон: {el.phone}</p>
                                            <p>E-mail: {el.email}</p>
                                            <button
                                                className="button is-primary"
                                                id="UserUpdateButton"
                                                onClick={() => UpdateUser(el.id)}
                                                aria-label={`Изменить пользователя ${el.fullname}`}
                                            >
                                                Изменить
                                            </button>
                                            <button
                                                className="button is-danger"
                                                id="UserDeleteButton"
                                                onClick={() => DeleteUser(el.id)}
                                                aria-label={`Удалить пользователя ${el.fullname}`}
                                            >
                                                Удалить
                                            </button>
                                        </div>
                                    ))
                            )}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default UsersTape;

import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const UsersTape = () => {
    const [token] = useState(localStorage.getItem("token"));
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);
    const navigate = useNavigate()

    const UsersList = async () => {
        const requestOptions = {
            method: 'GET',
            headers: {"Content-Type": "application/json"}
        };

        const response = await fetch("/admin/list_users", requestOptions);
        if (!response.ok) {
            throw new Error("Failed to fetch list users");
        } else {
            const data = await response.json();
            setUsers(data);
        }
    }

    const DeleteUser = async (userId) => {
        if (!window.confirm("Вы действительно хотите удалить данного пользователя?")) return;

        const requestOptions = {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                user_id: userId
            })
        }

        const response = await fetch("/admin/user/delete", requestOptions);
        if (!response.ok){
            throw new Error("Failed delete user");
        } else {
            alert("Пользователь удален");
        }
    }

    const UpdateUser = (userId) => {
        navigate(`/admin/user/update/${userId}`);
    }

    const handleSearch = (e) => {
        setSearch(e.target.value.toLowerCase());
    }

    useEffect(() => {
        UsersList();
    })

    return (
        <>
            {
                token && (
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
                                {users
                                    .filter((el) => el.fullname.toLowerCase().includes(search))
                                    .map((el) => (
                                        <div key={el.id} className="card">
                                            <h4 className="title is-4">{el.fullname}</h4>
                                            <p>Телефон: {el.phone}</p>
                                            <p>E-mail: {el.email}</p>
                                            <button
                                                className="button is-primary"
                                                id="UserUpdateButton"
                                                onClick={() => DeleteUser(el.id)}
                                            >Изменить</button>
                                            <button
                                                className="button is-danger"
                                                id="UserDeleteButton"
                                                onClick={() => UpdateUser(el.id)}
                                            >Удалить</button>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default UsersTape;
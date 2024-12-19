import React, {useEffect, useState} from "react";

const UpdateUserForm = () => {
    const [cardId, setCardId] = useState(localStorage.getItem("user_id_update"))
    const [fullname, setFullname] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [newFullname, setNewFullname] = useState("");
    const [newPhone, setNewPhone] = useState("");
    const [newEmail, setNewEmail] = useState("");

    useEffect(() => {

        const getCardData = async () => {
            const requestOptions = {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    user_id: cardId
                })
            }

            const response = await fetch("https://ivalukyan-backend-damnitbot-12c1.twc1.net/admin/user/get_by_id", requestOptions);
            if (!response.ok) {
                throw new Error("Failed get data card");
            }

            const data = await response.json();
            console.log(data);

            setFullname(data.fullname);
            setPhone(data.phone);
            setEmail(data.email);

        }

        getCardData();
    }, [cardId]);

    const sendUserForm = async () => {
        const requestOptions = {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                user_id: cardId,
                fullname: newFullname || fullname,
                phone: newPhone || phone,
                email: newEmail || email
            })
        }

        const response = await fetch("https://ivalukyan-backend-damnitbot-12c1.twc1.net/admin/user/update", requestOptions);

        if (!response.ok) {
            console.error("Failed data send");
        }

        window.location.href = "/admin/list_users"
    }

    return (
        <>
            <nav className="navbar">
                <a className="navbar-brand" href="/admin/list_users">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor"
                         className="bi bi-caret-left-fill" viewBox="0 0 16 16">
                        <path
                            d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
                    </svg>
                </a>
            </nav>
            <div className="column">
                <h1 className="title has-text-centered">Редактировать пользователя</h1>
                <div className="mb-3">
                    <label className="label">ФИО</label>
                    <div className="control">
                        <input
                            type="text"
                            placeholder={fullname}
                            value={newFullname}
                            onChange={(e) => setNewFullname(e.target.value)}
                            className="input"
                            required
                        />
                    </div>
                </div>
                <div className="mb-3">
                    <label className="label">Номер телефона</label>
                    <div className="control">
                        <input
                            type="text"
                            placeholder={phone}
                            value={newPhone}
                            onChange={(e) => setNewPhone(e.target.value)}
                            className="input"
                            required
                        />
                    </div>
                </div>
                <div className="mb-3">
                    <label className="label">E-mail</label>
                    <div className="control">
                        <input
                            className="input"
                            placeholder={email}
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                        />
                    </div>
                </div>
                <button
                    className="button-submit"
                    type="submit"
                    style={{background: "#1ed760"}}
                    onClick={sendUserForm}
                >
                    Сохранить
                </button>
            </div>
        </>
    )
}

export default UpdateUserForm;
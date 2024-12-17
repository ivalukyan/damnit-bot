import {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom";

const ChatsTape = () => {
    const [chats, setChats] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const getChats = async () => {
            const requestOptions = {
                method: "GET",
                headers: {"Content-Type": "application/json"}
            }

            const response = await fetch("/api/admin/chats", requestOptions);
            if (!response.ok) {
                throw new Error("Failed loading chats");
            } else {
                const data = await response.json();
                console.log(data);
                setChats(data);
            }
        }

        getChats();
    }, []);

    const handleButton = (userId) => {
        localStorage.setItem("aweUserId", userId);
        navigate("/admin/chat");
    }

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
            {chats.map((el) => (
                <div key={el.id} style={{margin: "15px 10px"}}>
                    <button className="mini-card" style={{width: "100%"}} onClick={() => handleButton(el.chat_id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor"
                             className="bi bi-person-fill" viewBox="0 0 16 16">
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                        </svg>
                        <p className="mini-card-text">{el.fullname}</p>
                    </button>
                </div>
            ))}
        </>
    )
};

export default ChatsTape;
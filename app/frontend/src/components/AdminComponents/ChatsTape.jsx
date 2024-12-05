import {useState} from "react"

const ChatsTape = () => {
    const [chats, setChats] = useState([]);

    const getChats = async () => {
        const requestOptions = {
            method: "GET",
            headers: {"Content-Type": "application/json"}
        }

        const response = await fetch("/admin/chats", requestOptions);
        if (!response.ok){
            throw new Error("Failed loading chats");
        } else {
            const data = await response.json();
            console.log(data);
        }
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
        </>
    )
};

export default ChatsTape;
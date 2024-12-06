import {useRef, useState} from "react";

const UserChat = () => {

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const chatMainRef = useRef(null);
    const [userId, setUserId] = useState(localStorage.getItem("awesomeUserId"));
    const socket = new WebSocket(`ws://localhost:3000/chat/${userId}`);

    socket.onopen = () => {console.log("Соединение установлено")}

    socket.onmessage = (message) => {
        const incomingMessage = JSON.parse(message.data);
        addMessage(incomingMessage.content, incomingMessage.role);
    }

    socket.onclose = () => {console.log("Соеднение закрыто")}

    const addMessage = (text, role_id) => {
        let messages = document.getElementById('messages').querySelector('ul');
        let mes = document.createElement('li');

        mes.className = role_id === userId ? 'sent': 'receive';

        let contentSpan = document.createElement('span');
        contentSpan.textContent = text;

        let date = new Date();
        let h = date.getHours();
        let m = date.getMinutes();

        h = h < 10 ? '0' + h : h;
        m = m < 10 ? '0' + m : m;

        // Создание блока сообщений

        let timeSpan = document.createElement('span');
        timeSpan.className = 'time';
        timeSpan.textContent = `${h}:${m}`;

        let contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.appendChild(contentSpan);
        contentDiv.appendChild(timeSpan);

        mes.appendChild(contentDiv);
        messages.appendChild(mes);

        messages.scrollTop = messages.scrollHeight;
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (message.trim()) {
                sendMessage(message.trim());
            }
        }
    };

    const sendMessage = (newMessage) => {
        setMessages([...messages, newMessage]);
        setMessage("");
        setTimeout(() => {
            if (chatMainRef.current) {
                chatMainRef.current.scrollTop = chatMainRef.current.scrollHeight;
            }
        }, 0);
    };

    return (
        <>
            <nav className="navbar">
                <a className="navbar-brand" href="/user/me">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor"
                         className="bi bi-caret-left-fill" viewBox="0 0 16 16">
                        <path
                            d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
                    </svg>
                </a>
            </nav>
            <div className="chat-container" ref={chatMainRef}>
                <div className="chat-body">
                    {messages
                        .map((msg, index) => (
                            <div key={index} className="chat-message">
                                <p>{msg}</p>
                            </div>
                        ))}
                </div>
                <div className="chat-line">
                    <div className="line"></div>
                </div>
                <div className="chat-input">
                    <textarea
                        id="messageText"
                        className="input"
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                    ></textarea>
                    <button
                        className="button-chat"
                        type="submit"
                        onClick={() => sendMessage(message.trim())}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            fill="currentColor"
                            className="bi bi-arrow-right-circle-fill"
                            viewBox="0 0 16 16"
                        >
                            <path
                                d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </>
    );
};

export default UserChat;
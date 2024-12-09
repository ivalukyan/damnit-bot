import { useRef, useState, useEffect } from "react";

const UserChat = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [socketStatus, setSocketStatus] = useState("Connecting...");
    const [selectedChat] = useState("user");
    const [userId] = useState(() => localStorage.getItem("awesomeUserId"));
    const [fullname] = useState(localStorage.getItem("fullname"));
    const socketRef = useRef(null);

    useEffect(() => {
        const socket = new WebSocket(`ws://localhost:8000/user/chat/${userId}`);
        socketRef.current = socket;

        socket.onopen = () => setSocketStatus("Connected");
        socket.onclose = () => setSocketStatus("Disconnected");
        socket.onerror = () => setSocketStatus("Error");

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            addMessage(data.content, data.role);
        };

        return () => {
            socket.close();
        };
    }, [userId]);

    useEffect(() => {
        const storyMessages = async () => {
            try {
                    const requestOptions = {
                    method: "GET",
                    headers: {"Content-Type" : "application/json"}
                }

                const response = await fetch(`/api/user/messages/${userId}`, requestOptions);

                if (!response.ok){
                    throw new Error("Failed get user story messages");
                }

                const story = await response.json();
                //console.log(story);
                setMessages(story);
            } catch (e) {
                console.error("Error in loading story massages", e);
            }

        }

        storyMessages();

    }, [userId]);


    const addMessage = (text, role_id) => {
        setMessages((prevMessages) => [...prevMessages, { content: text, role: role_id }]);
    };

    useEffect(() => {
        const chatBody = document.querySelector('.chat-body');
        if (chatBody) chatBody.scrollTop = chatBody.scrollHeight;
    }, [messages]);

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (message.trim()) {
                sendMessage(message.trim());
            }
        }
    };

    const sendMessage = async (newMessage) => {
        if (!newMessage.trim()) return;

        try {
            const payload = {
                chat_id: userId,
                username: fullname,
                recipient_id: selectedChat,
                content: newMessage.trim(),
                role: "user",
            };

            // Send via REST API
            // await fetch("/api/user/messages", {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify(payload),
            // });

            // Send via WebSocket
            socketRef.current.send(JSON.stringify(payload));

            //addMessage(newMessage.trim(), "user");
        } catch (error) {
            console.error("Error sending message:", error);
        } finally {
            setMessage("");
        }
    };

    return (
        <>
            <nav className="navbar">
                <a className="navbar-brand" href="/user/me">
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
                <div className="socket-status">{socketStatus}</div>
            </nav>
            <div className="chat-container">
                <div className="chat-body">
                    {messages.map((msg, index) => (
                        <div key={index} className={`chat-message ${msg.role === "user" ? "sent" : "receive"}`}>
                            <p>{msg.content}</p>
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
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type your message..."
                    ></textarea>
                    <button className="button-chat" type="submit" onClick={() => sendMessage(message.trim())}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            fill="currentColor"
                            className="bi bi-arrow-right-circle-fill"
                            viewBox="0 0 16 16"
                        >
                            <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                        </svg>
                    </button>
                </div>
            </div>
        </>
    );
};

export default UserChat;

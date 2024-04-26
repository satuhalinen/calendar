import { useEffect, useState, useRef } from "react";
import Messages from "./Messages";
import Input from "./Input";
import "./chatBot.css";

export default function ChatBot({ showInitially, handleClose }) {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([{ role: "assistant", content: "Hello I'm Ben! How can I help you today?" }]);
    const [showChatBot, setShowChatBot] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const chatContainerRef = useRef(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowChatBot(true);
        }, 5000);
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleCloseClick = () => {
        setShowChatBot(false);
        handleClose();
    };

    const handleSubmit = async () => {
        const prompt = {
            role: "user",
            content: input,
        };

        setMessages([...messages, prompt]);
        setIsTyping(true);

        await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${OPENAPI_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [...messages, prompt],
            }),
        })
            .then((data) => data.json())
            .then((data) => {
                console.log(data);
                const res = data.choices[0].message.content;
                setMessages((messages) => [
                    ...messages,
                    {
                        role: "assistant",
                        content: res,
                    },
                ]);
                setInput("");
                setIsTyping(false);
            });
    };

    const clear = () => {
        setMessages([]);
    };

    const handleInputSubmit = (e) => {
        e.preventDefault();
        handleSubmit();
    };

    if (!showChatBot && showInitially) {
        return (
            <div className="chatBotClosed" onClick={() => setShowChatBot(true)}>
                Open Chat
            </div>
        );
    }

    return (
        <div className="chatBot">
            <div className="chatBotCol">
                <div className="buttonColumn">
                    <button className="closeChatButton" onClick={handleCloseClick}>
                        Close chat
                    </button>
                    <button className="clearChatButton" onClick={clear}>
                        Clear messages
                    </button>
                </div>
                <h3 className="chatBotTitle">Chat Messages</h3>
                <div className="chatBotContent" ref={chatContainerRef}>
                    {messages.map((el, i) => {
                        return <Messages key={i} role={el.role} content={el.content} />;
                    })}
                </div>
                <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onSubmit={handleInputSubmit}
                />
            </div>
        </div>
    );
}

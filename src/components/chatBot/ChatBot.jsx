import { useEffect, useState, useRef } from "react";
import Messages from "./Messages";
import "./chatBot.css";
import knowledgeBase from "./knowledgeBase";

export default function ChatBot({ showInitially, handleClose }) {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([
        { role: "assistant", content: "Hello I'm Ben! How can I help you today?" },
    ]);
    const [showChatBot, setShowChatBot] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const chatContainerRef = useRef(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowChatBot(true);
        }, 100000);
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop =
                chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleCloseClick = () => {
        setShowChatBot(false);
        handleClose();
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleInputSubmit(e);
        }
    };

    const handleSubmit = async () => {
        const prompt = {
            role: "user",
            content: input,
        };

        // Add the user's prompt to the messages array
        setMessages((prevMessages) => [...prevMessages, prompt]);

        setIsTyping(true);

        // Check if the input query matches any predefined query in the knowledge base
        const matchedResponse = knowledgeBase.find((item) => {
            // Check if the input contains certain keywords or phrases
            const keywords = item.keywords || [];
            return (
                item.role === "user" &&
                keywords.some((keyword) =>
                    input.toLowerCase().includes(keyword.toLowerCase())
                )
            );
        });

        // If a predefined response is found in the knowledge base, find the assistant's response
        if (matchedResponse) {
            // Find the index of the matched user response
            const index = knowledgeBase.indexOf(matchedResponse);
            // Get the next item in the knowledge base array
            const assistantResponse = knowledgeBase[index + 1];

            // Add the assistant's response to the messages
            if (assistantResponse) {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { role: "assistant", content: assistantResponse.content },
                ]);
            } else {
                // If there's no assistant response available, show a default message
                setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        role: "assistant",
                        content: "I'm sorry, I couldn't find a suitable response.",
                    },
                ]);
            }
            setInput("");
            setIsTyping(false);
        } else {
            // If no predefined response is found, send the query to the OpenAI API for a response
            await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [...messages, prompt],
                }),
            })
                .then((data) => data.json())
                .then((data) => {
                    const res = data.choices[0].message.content;
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        { role: "assistant", content: res },
                    ]);
                    setInput("");
                    setIsTyping(false);
                })
                .catch((error) => {
                    console.error("Error fetching response from ChatGPT:", error);
                    setIsTyping(false);
                });
        }
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
            <div
                className="chatBotClosed"
                aria-hidden="true"
                onClick={() => setShowChatBot(true)}
            >
                Chat
            </div>
        );
    }

    return (
        <div tabIndex="0" className="chatBot">
            <div className="chatBotCol">
                <div className="buttonColumn">
                    <button className="closeChatButton" onClick={handleCloseClick}>
                        Close chat
                    </button>
                    <button className="clearChatButton" onClick={clear}>
                        Clear
                    </button>
                </div>
                <h3 tabIndex="0" className="chatBotTitle">
                    Chat Messages
                </h3>
                <div tabIndex="0" className="chatBotContent" ref={chatContainerRef}>
                    {messages.map((el, i) => {
                        return <Messages key={i} role={el.role} content={el.content} />;
                    })}
                    {isTyping && (
                        <div className="chatBotTyping">
                            <div className="typingDot"></div>
                            <div className="typingDot"></div>
                            <div className="typingDot"></div>
                        </div>
                    )}
                </div>
                <form className="chatInputWrapper" onSubmit={handleInputSubmit}>
                    <input
                        className="chatInputText"
                        placeholder="Enter your message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button className="chatInputButton" type="submit">
                        Go
                    </button>
                </form>
            </div>
        </div>
    );
}
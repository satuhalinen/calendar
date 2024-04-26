import avatar from "../../assets/avatar.png";
import chatBot from "../../assets/chatBotBen.png";
import "./chatBot.css"

export default function Message({ role, content }) {
    return (
        <div className="messageWrapper">
            <div>
                <img
                    src={role === "assistant" ? chatBot : avatar}
                    className="botAvatar"
                    alt="profile avatar"
                />
            </div>
            <div>
                <p>{content}</p>
            </div>
        </div>
    );
}
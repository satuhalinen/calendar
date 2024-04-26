import "./chatBot.css";

export default function Input({ value, onChange, onSubmit }) {
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            onSubmit();
        }
    };

    return (
        <form className="chatInputWrapper" onSubmit={(e) => e.preventDefault()}>
            <input
                className="chatInputText"
                placeholder="Your prompt here..."
                value={value}
                onChange={onChange}
                onKeyDown={handleKeyDown}
            />
            <button className="chatInputButton" onClick={onSubmit}>
                Go
            </button>
        </form>
    );
}

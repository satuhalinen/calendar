import avatar from "../../assets/avatar.png";
import chatBot from "../../assets/chatBotBen.png";
import { auth } from "../../auth/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { fetchProfileImage } from "../../store/actions/actions";
import { selectProfileImageUrl } from "../../store/profileImageSlice";
import "./chatBot.css"
import { useDispatch, useSelector } from "react-redux";

export default function Message({ role, content }) {
    const [user] = useAuthState(auth);
    const dispatch = useDispatch();
    const profileImageUrl = useSelector(selectProfileImageUrl);

    useEffect(() => {
        if (user && user.uid) {
            dispatch(fetchProfileImage(user.uid));
        }
    }, [user, dispatch]);

    return (
        <div className="messageWrapper">
            <div>
                {role === "assistant" ? (
                    <img src={chatBot} className="botAvatar" alt="profile avatar" />
                ) : (
                    profileImageUrl ? (
                        <img src={profileImageUrl} className="botAvatar" alt="profile avatar" />
                    ) : (
                        <img src={avatar} className="botAvatar" alt="profile avatar" />
                    )
                )}
            </div>
            <div>
                <p>{content}</p>
            </div>
        </div>
    );
}

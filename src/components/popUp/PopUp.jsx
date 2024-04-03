import { useState, useEffect } from 'react';
import '../PopUp/popUp.css';

const PopUp = ({ showInitially, handleClose }) => {
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowPopup(true);
        }, 5000);
        return () => clearTimeout(timeout);
    }, []);

    const handleCloseClick = () => {
        setShowPopup(false);
        handleClose();
    };

    if (!showPopup && showInitially) {
        return (
            <div className='popUpClosed' onClick={() => setShowPopup(true)}>
                Contact
            </div>
        );
    }

    return (
        <div className='popUpOpen'>
            <div className="popUpContent">
                <h2 className='popUpTitle'>Contact us!</h2>
                <p>Please find our contact information here</p>
                <button className="popUpButton" onClick={handleCloseClick}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default PopUp;
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Sender = () => {
    const [message, setMessage] = useState('');

    const handleSend = () => {
        window.TSM_Store = { Sender: { message, timestamp: Date.now() } }; // Cập nhật dữ liệu vào window object
        console.log("Data sent to window object TSM_Store", window.TSM_Store);

        // Thông báo tất cả các component khác
        if (window.TSM_Notify) {
            window.TSM_Notify.forEach(callback => callback());
        }
    };

    return (
        <div className='container-component'>
            <h2>Sender Component</h2>
            <input
                type="text"
                placeholder='Type something...'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={handleSend}>Send Data to Window</button>
        </div>
    );
};

export default Sender;
ReactDOM.render(<Sender />, document.getElementById('sender'));

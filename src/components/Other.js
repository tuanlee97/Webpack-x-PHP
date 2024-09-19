import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const Other = () => {
    const [senderData, setSenderData] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const updateData = () => {
            if (window.TSM_Store && window.TSM_Store.Sender) {
                setSenderData(window.TSM_Store.Sender.message);
            }
        };

        // Cập nhật dữ liệu ngay khi có thay đổi
        updateData();

        // Đăng ký hàm thông báo
        window.TSM_Notify = window.TSM_Notify || [];
        window.TSM_Notify.push(updateData);

        // Cleanup khi component unmount
        return () => {
            window.TSM_Notify = window.TSM_Notify.filter(cb => cb !== updateData);
        };
    }, []);

    const handleSend = () => {
        window.TSM_Store = { Other: { message, timestamp: Date.now() } }; // Cập nhật dữ liệu vào window object
        console.log("Data sent to window object TSM_Store", window.TSM_Store);

        // Thông báo tất cả các component khác
        if (window.TSM_Notify) {
            window.TSM_Notify.forEach(callback => callback());
        }
    };

    return (
        <div className='container-component'>
            <h2>Other Component</h2>
            <input
                type="text"
                placeholder='Type something...'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button class="sync-btn" onClick={() => setMessage(senderData)}>Sync Data Sender</button>
            <button onClick={handleSend}>{`Send Data to Window -> Receiver`}</button>
            <p>Data from Sender: {senderData}</p>
        </div>
    );
};

export default Other;
ReactDOM.render(<Other />, document.getElementById('other'));

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const Receiver = () => {
    const [dataReceived, setDataReceived] = useState('');

    useEffect(() => {
        const updateData = () => {
            let latestData = '';
            let latestTimestamp = 0;

            if (window.TSM_Store) {
                // Kiểm tra Sender
                if (window.TSM_Store.Sender && window.TSM_Store.Sender.timestamp > latestTimestamp) {
                    latestTimestamp = window.TSM_Store.Sender.timestamp;
                    latestData = window.TSM_Store.Sender.message;
                }

                // Kiểm tra Other
                if (window.TSM_Store.Other && window.TSM_Store.Other.timestamp > latestTimestamp) {
                    latestTimestamp = window.TSM_Store.Other.timestamp;
                    latestData = window.TSM_Store.Other.message;
                }
            }

            // Cập nhật trạng thái với dữ liệu mới nhất
            setDataReceived(latestData);
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

    return (
        <div className='container-component'>
            <h2>Receiver Component</h2>
            <p>Data Received: {dataReceived}</p>
        </div>
    );
};

export default Receiver;
ReactDOM.render(<Receiver />, document.getElementById('receiver'));

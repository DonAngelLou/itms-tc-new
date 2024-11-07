import React, { useState, useEffect } from 'react';
import { useWebSocket } from '@/hooks/useWebSocket';

export default function RealTimeNotification() {
    const [notifications, setNotifications] = useState<string[]>([]);

    useWebSocket((data) => {
        setNotifications((prev) => [...prev, data.message]);
    });

    return (
        <div>
            <h2>Real-Time Notifications</h2>
            <ul>
                {notifications.map((message, index) => (
                    <li key={index}>{message}</li>
                ))}
            </ul>
        </div>
    );
}

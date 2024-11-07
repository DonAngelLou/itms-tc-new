import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Notification {
    id: number;
    message: string;
    created_at: string;
    seen: boolean;
}

export default function NotificationList() {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            const response = await axios.get('/api/notifications');
            setNotifications(response.data);
        };
        fetchNotifications();
    }, []);

    const markAsSeen = async () => {
        const unseenIds = notifications.filter(n => !n.seen).map(n => n.id);
        await axios.patch('/api/notifications/mark-seen', { notification_ids: unseenIds });
        setNotifications(prev => prev.map(n => ({ ...n, seen: true })));
    };

    return (
        <div>
            <h2>Notifications</h2>
            <ul>
                {notifications.map(n => (
                    <li key={n.id} style={{ fontWeight: n.seen ? 'normal' : 'bold' }}>
                        {n.message} - {new Date(n.created_at).toLocaleString()}
                    </li>
                ))}
            </ul>
            <button onClick={markAsSeen}>Mark All as Seen</button>
        </div>
    );
}

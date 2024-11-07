import { useEffect } from 'react';

export const useWebSocket = (onMessage: (data: any) => void) => {
    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8000/ws/notifications/');

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            onMessage(data);
        };

        return () => {
            ws.close();
        };
    }, [onMessage]);
};

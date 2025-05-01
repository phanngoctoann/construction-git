import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './darkmode.css'; // nếu bạn đặt trong thư mục styles

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

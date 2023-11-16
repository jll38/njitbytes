import React from 'react';
import ReactDOM from 'react-dom';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Register the service worker first
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);

      // Initialize Firebase after the service worker is registered
      const app = initializeApp(firebaseConfig);
      const analytics = getAnalytics(app);
      const messaging = getMessaging(app);

      // Get messaging token
      getToken(messaging)
        .then((token) => {
          console.log('FCM Token:', token);
          // Send this token to your server for later use
        })
        .catch((error) => {
          console.error('Unable to get messaging token.', error);
        });

      // Handle incoming messages
      onMessage(messaging, (payload) => {
        console.log('Message received:', payload);
        // Display a notification
        const notificationTitle = payload.notification.title;
        const notificationOptions = {
          body: payload.notification.body,
        };

        window.registration.showNotification(notificationTitle, notificationOptions);
      });
    })
    .catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
}

const root = document.getElementById('root');
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();

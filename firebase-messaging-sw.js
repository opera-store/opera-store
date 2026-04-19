// ===== OPERA STORE — Firebase Messaging Service Worker =====
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCUi3kogTKbON6HyKNXmIrgtyAVoI9h0t0",
  authDomain: "opera-store-7e04d.firebaseapp.com",
  projectId: "opera-store-7e04d",
  storageBucket: "opera-store-7e04d.firebasestorage.app",
  messagingSenderId: "515326654060",
  appId: "1:515326654060:web:16d1eb1b533595483b0a49"
});

const messaging = firebase.messaging();

// استقبال الإشعار لما التطبيق مغلق (background)
messaging.onBackgroundMessage((payload) => {
  const { title, body, icon } = payload.notification || {};
  const notificationTitle = title || 'OPERA STORE';
  const notificationOptions = {
    body: body || '',
    icon: icon || '/icon-192.png',
    badge: '/icon-192.png',
    dir: 'rtl',
    lang: 'ar',
    tag: 'opera-store-notification',
    renotify: true,
    data: payload.data || {}
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// لما يضغط على الإشعار يفتح البوابة
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data?.url || '/customer.html';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes('customer') && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});

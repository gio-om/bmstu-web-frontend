if('serviceWorker' in navigator) {window.addEventListener('load', () => {navigator.serviceWorker.register('/bmstu-web-frontend/sw.js', { scope: '/bmstu-web-frontend/' })})}
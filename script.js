const shareButton = document.getElementById('shareButton');
const currentLocation = document.getElementById('current-location');
const errorMessage = document.getElementById('errorMessage');
let isTracking = false;

shareButton.addEventListener('click', () => {
    if (!isTracking) {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    currentLocation.textContent = `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`; // ✅ Fixed missing backtick
                    errorMessage.style.display = 'none';
                    shareButton.textContent = 'Stop Sharing';
                    shareButton.classList.remove('share-button');
                    shareButton.classList.add('stop-button');
                    isTracking = true;
                },
                (error) => {
                    errorMessage.style.display = 'block';
                }
            );
        } else {
            errorMessage.textContent = 'Geolocation is not supported by your browser';
            errorMessage.style.display = 'block';
        }
    } else {
        currentLocation.textContent = 'Waiting for location...';
        shareButton.textContent = 'Share Location';
        shareButton.classList.remove('stop-button');
        shareButton.classList.add('share-button');
        isTracking = false;
    }
});

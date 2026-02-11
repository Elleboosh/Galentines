let selectedEnvelope = 1;
let photos = [];
let map;

function selectEnvelope(num) {
    selectedEnvelope = num;
    document.getElementById('envelope-img').src = `envelope${num}.png`;
    document.getElementById('envelope').classList.remove('hidden');
}

function lockEnvelope() {
    const seal = document.getElementById('seal-select').value;
    alert('Envelope sealed with ' + seal + '! Now open it.');
}

function openEnvelope() {
    document.getElementById('card-content').classList.remove('hidden');
}

function generatePoem() {
    const poems = [
        "In royal halls of love so true, My heart beats only for you. With crowns of gold and roses pink, Our love's the finest royal link.",
        "Beneath the stars of velvet night, Your smile ignites my heart's delight. In palaces of dreams we roam, Forever yours, my love, my home.",
        "With whispers soft as falling snow, Our secrets in the moonlight glow. A kingdom built on tender care, My dearest, you're beyond compare."
    ];
    document.getElementById('poem-display').innerText = poems[Math.floor(Math.random() * poems.length)];
}

document.getElementById('photo-upload').addEventListener('change', function(e) {
    photos = Array.from(e.target.files);
    displayPhotos();
});

function displayPhotos() {
    const display = document.getElementById('photo-display');
    display.innerHTML = '';
    const borderColor = document.getElementById('border-select').value === 'border1' ? '#FFB6C1' : document.getElementById('border-select').value === 'border2' ? '#FFD700' : '#DDA0DD';
    photos.forEach(photo => {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(photo);
        img.style.border = `5px solid ${borderColor}`;
        display.appendChild(img);
    });
}

function toggleMusic() {
    const audio = document.getElementById('piano-audio');
    if (audio.paused) {
        audio.play();
        document.getElementById('music-toggle').innerText = 'Pause Music';
    } else {
        audio.pause();
        document.getElementById('music-toggle').innerText = 'Play Soft Piano';
    }
}

function updateCountdown() {
    const now = new Date();
    const valentine = new Date(now.getFullYear(), 1, 14);
    if (now > valentine) valentine.setFullYear(now.getFullYear() + 1);
    const diff = valentine - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    document.getElementById('timer').innerText = days + ' days, ' + hours + ' hours';
}
setInterval(updateCountdown, 1000);

document.addEventListener('DOMContentLoaded', function() {
    map = L.map('map-container').setView([40.7128, -74.0060], 10); // Default to NYC; change as needed
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    map.on('click', function(e) {
        L.marker([e.latlng.lat, e.latlng.lng]).addTo(map).bindPopup('A cherished memory!').openPopup();
    });
});
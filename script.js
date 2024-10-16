const carousel = document.querySelector('.carousel');
const carouselContainer = document.querySelector('.carousel-container');
const cards = [
    { title: 'Comparação', image: '/a/362a42a6-5f3d-4249-8423-aceee90b20f5' },
    { title: 'Herói', image: '/a/565d694c-491c-4b7c-85b1-fd12c38a4d88' },
    { title: 'Autenticidade', image: '/a/45aaa44a-100a-4cdf-a08f-58a9ab69589e' },
    { title: 'Se perca', image: '/a/cd06ddc8-5d75-477b-96ce-3b2eeb125cbc' }
];

let angle = 0;
let dragging = false;
let startX;
let startAngle;
let zoom = 1;
let autoRotateInterval;

function createCards() {
    cards.forEach((cardData, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img class="card-image" src="${cardData.image}" alt="${cardData.title}" width="160" height="200">
            <div class="card-content">
                <h2 class="card-title">${cardData.title}</h2>
            </div>
        `;
        const rotation = index * (360 / cards.length);
        card.style.transform = `rotateY(${rotation}deg) translateZ(250px)`;
        carousel.appendChild(card);
    });
}

function rotateCarousel() {
    carousel.style.transform = `rotateY(${angle}deg)`;
}

function handleMouseDown(e) {
    dragging = true;
    startX = e.clientX;
    startAngle = angle;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
}

function handleMouseMove(e) {
    if (dragging) {
        const dx = e.clientX - startX;
        angle = startAngle + dx * 0.5;
        rotateCarousel();
    }
}

function handleMouseUp() {
    dragging = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
}

function handleWheel(e) {
    e.preventDefault();
    const delta = e.deltaY * -0.001;
    zoom = Math.min(Math.max(zoom + delta, 0.5), 2);
    updateZoom();
}

function updateZoom() {
    carouselContainer.style.transform = `scale(${zoom})`;
}

function showCardInfo(card) {
    const infoPanel = document.querySelector('.info-panel');
    const overlay = document.querySelector('.overlay');
    const infoImage = document.querySelector('.info-image');
    const infoTitle = document.querySelector('.info-title');

    infoImage.src = card.querySelector('.card-image').src;
    infoImage.alt = card.querySelector('.card-image').alt;
    infoTitle.textContent = card.querySelector('.card-title').textContent;

    carouselContainer.style.transform = 'scale(0.5)';
    overlay.style.display = 'block';
    infoPanel.style.display = 'block';

    clearInterval(autoRotateInterval);
}

function closeCardInfo() {
    const infoPanel = document.querySelector('.info-panel');
    const overlay = document.querySelector('.overlay');

    carouselContainer.style.transform = `scale(${zoom})`;
    overlay.style.display = 'none';
    infoPanel.style.display = 'none';

    startAutoRotate();
}

function startAutoRotate() {
    autoRotateInterval = setInterval(() => {
        if (!dragging) {
            angle += 0.5;
            rotateCarousel();
        }
    }, 50);
}

function createStars() {
    const starContainer = document.querySelector('.star-container');
    const starsCount = 50;
    for (let i = 0; i < starsCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}vw`;
        star.style.animationDuration = `${Math.random() * 10 + 10}s`;
        star.style.animationDelay = `${Math.random() * 10}s`;
        starContainer.appendChild(star);
    }
}

createCards();
rotateCarousel();
startAutoRotate();
createStars();

carousel.addEventListener('mousedown', handleMouseDown);
document.addEventListener('wheel', handleWheel, { passive: false });

document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => showCardInfo(card));
});

document.querySelector('.close-button').addEventListener('click', closeCardInfo);
document.querySelector('.overlay').addEventListener('click', closeCardInfo);

let currentSlide = 0;
const slides = document.querySelectorAll('.phase');
const dots = document.querySelectorAll('.slider-dot');
const slider = document.getElementById('slider');
const totalSlides = slides.length;

function updateSlider() {
    // Atualiza a posição do slider
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Atualiza os dots de navegação
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function moveSlide(direction) {
    // Move para o slide anterior/próximo
    currentSlide += direction;
    
    // Verifica os limites (volta para o primeiro/último slide)
    if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    } else if (currentSlide >= totalSlides) {
        currentSlide = 0;
    }
    
    updateSlider();
}

function goToSlide(slideIndex) {
    // Vai diretamente para um slide específico
    if (slideIndex >= 0 && slideIndex < totalSlides) {
        currentSlide = slideIndex;
        updateSlider();
    }
}

// Navegação por teclado (apenas setas esquerda/direita)
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        moveSlide(-1); // Seta esquerda - slide anterior
    } else if (e.key === 'ArrowRight') {
        moveSlide(1); // Seta direita - próximo slide
    }
});

// Opcional: Navegação por touch (para dispositivos móveis)
let touchStartX = 0;
let touchEndX = 0;

const sliderContainer = document.querySelector('.slider-container');
if (sliderContainer) {
    sliderContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});

    sliderContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});
}

function handleSwipe() {
    const difference = touchStartX - touchEndX;
    if (difference > 50) { // Swipe para a esquerda
        moveSlide(1);
    } else if (difference < -50) { // Swipe para a direita
        moveSlide(-1);
    }
}

// Inicializa o slider
updateSlider();

// Opcional: Auto-avanço (descomente se quiser)
/*
let slideInterval;
function startAutoSlide() {
    slideInterval = setInterval(() => {
        moveSlide(1);
    }, 5000); // Muda de slide a cada 5 segundos
}

// Pausa quando o mouse está sobre o slider
sliderContainer.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

// Retoma quando o mouse sai do slider
sliderContainer.addEventListener('mouseleave', () => {
    startAutoSlide();
});

// Inicia o auto-avanço
startAutoSlide();
*/
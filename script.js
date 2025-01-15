document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const cards = Array.from(document.querySelectorAll('.card'));
    let currentIndex = 0;
    let startY;
    let endY;
    const threshold = 50;
    let isAnimating = false;

    function updateCards() {
        cards.forEach((card, index) => {
            card.className = 'card';
            
            if (index === currentIndex) {
                card.classList.add('active');
            } else if (index === (currentIndex - 1 + cards.length) % cards.length) {
                card.classList.add('prev');
            } else if (index === (currentIndex + 1) % cards.length) {
                card.classList.add('next');
            } else {
                card.classList.add('hidden');
            }
        });
    }

    function navigate(direction) {
        if (isAnimating) return;
        isAnimating = true;
        
        currentIndex = (currentIndex + direction + cards.length) % cards.length;
        updateCards();
        
        setTimeout(() => {
            isAnimating = false;
        }, 500); 
    }

    function handleTouchStart(e) {
        if (isAnimating) return;
        startY = e.touches[0].clientY;
    }

    function handleTouchMove(e) {
        if (!startY || isAnimating) return;
        e.preventDefault();
        endY = e.touches[0].clientY;
    }

    function handleTouchEnd() {
        if (!startY || !endY || isAnimating) return;
        
        const diffY = startY - endY;
        if (Math.abs(diffY) > threshold) {
            if (diffY > 0) {
                navigate(1);
            } else {
                navigate(-1);
            }
        }
        
        startY = null;
        endY = null;
    }

    function handleMouseDown(e) {
        if (isAnimating) return;
        startY = e.clientY;
        e.preventDefault();
    }

    function handleMouseMove(e) {
        if (!startY || isAnimating) return;
        endY = e.clientY;
        e.preventDefault();
    }

    function handleMouseUp() {
        if (!startY || !endY || isAnimating) return;
        
        const diffY = startY - endY;
        if (Math.abs(diffY) > threshold) {
            if (diffY > 0) {
                navigate(1);
            } else {
                navigate(-1);
            }
        }
        
        startY = null;
        endY = null;
    }

    // Initialize cards
    updateCards();

    // Event listeners
    carousel.addEventListener('touchstart', handleTouchStart, { passive: false });
    carousel.addEventListener('touchmove', handleTouchMove, { passive: false });
    carousel.addEventListener('touchend', handleTouchEnd);

    carousel.addEventListener('mousedown', handleMouseDown);
    carousel.addEventListener('mousemove', handleMouseMove);
    carousel.addEventListener('mouseup', handleMouseUp);
    carousel.addEventListener('mouseleave', handleMouseUp);
});


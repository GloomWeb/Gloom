// 1. WOW EFEKT - Postupné objevování prvků při scrollování dolů
const reveals = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 100; // Kdy se má prvek začít objevovat

    reveals.forEach(reveal => {
        const elementTop = reveal.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
// Vyvolání hned po načtení pro vrchní prvky
revealOnScroll();


// 2. PARALLAX RAKETA A SKLENĚNÉ KOULE
const rocket = document.getElementById('scroll-rocket');
const spheres = document.querySelectorAll('.glass-sphere');

window.addEventListener('scroll', () => {
    let scrollY = window.scrollY;
    let maxScroll = document.body.scrollHeight - window.innerHeight;
    
    // Výpočet od 0 do 1 podle toho, jak hluboko je uživatel odscrollovaný
    let scrollPercent = scrollY / maxScroll;

    // A. Raketa vyletí nahoru a mírně se natáčí a zvětšuje
    // translate: z -100px (dole) vyletí do cca -120vh (nad obrazovku)
    if(rocket) {
        rocket.style.transform = `
            translateY(-${scrollY * 1.5}px) 
            rotate(${45 + scrollPercent * 40}deg) 
            scale(${1 + scrollPercent * 1.5})
        `;
    }

    // B. Parallax pohyb pro skleněné 3D koule na pozadí
    spheres.forEach(sphere => {
        let speed = parseFloat(sphere.getAttribute('data-speed'));
        sphere.style.transform = `translateY(${scrollY * speed}px)`;
    });
});


// 3. INTERAKTIVNÍ 3D TILT EFEKT PRO KARTY (zůstalo, protože je to "mega")
const cards = document.querySelectorAll('.tilt-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const cardRect = card.getBoundingClientRect();
        
        // Výpočet pozice myši uvnitř karty (-0.5 až 0.5)
        const x = (e.clientX - cardRect.left) / cardRect.width - 0.5;
        const y = (e.clientY - cardRect.top) / cardRect.height - 0.5;
        
        // Menší rotace pro modernější/jemnější pocit
        const maxRotate = 15; 
        
        card.style.transform = `perspective(1000px) rotateX(${-y * maxRotate}deg) rotateY(${x * maxRotate}deg) translateY(-5px)`;
    });
    
    // Resetování pozice, když myš kartu opustí
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
    });
});
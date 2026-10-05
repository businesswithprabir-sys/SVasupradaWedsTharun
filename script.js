document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. LUXURY INTRO & AUDIO LOGIC
    // ==========================================
    const introScreen = document.getElementById("intro-screen");
    const enterBtn = document.getElementById("enter-btn");
    const mainContent = document.getElementById("main-content");
    const bgMusic = document.getElementById("bg-music");
    const musicBtn = document.getElementById("music-btn");
    const lightBurst = document.getElementById("light-burst");
    let isPlaying = false;

    enterBtn.addEventListener("click", () => {
        // Flash effect
        lightBurst.style.opacity = "1";
        
        // Attempt Audio Play
        bgMusic.play().then(() => {
            isPlaying = true;
            musicBtn.classList.remove("hidden");
        }).catch(err => {
            console.log("Audio autoplay prevented by browser.");
            musicBtn.classList.remove("hidden");
            musicBtn.querySelector("i").classList.replace("fa-music", "fa-volume-mute");
        });

        // Reveal Main Site
        setTimeout(() => {
            introScreen.style.display = "none";
            mainContent.classList.remove("hidden");
            
            setTimeout(() => {
                lightBurst.style.opacity = "0";
                triggerReveal(); // Fire scroll animations
                startGoldParticles(); // Start background particles
            }, 300);
            
        }, 800); 
    });

    // Music Toggle
    musicBtn.addEventListener("click", () => {
        const icon = musicBtn.querySelector("i");
        if (isPlaying) {
            bgMusic.pause();
            icon.classList.replace("fa-music", "fa-volume-mute");
        } else {
            bgMusic.play();
            icon.classList.replace("fa-volume-mute", "fa-music");
        }
        isPlaying = !isPlaying;
    });

    // ==========================================
    // 2. WEDDING COUNTDOWN TIMER (FIXED DATE)
    // ==========================================
    const weddingDate = new Date("Oct 29, 2026 08:05:00").getTime();

    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance < 0) {
            clearInterval(timer);
            document.getElementById("countdown").innerHTML = "<h2 class='playfair gold-foil' style='font-size:2.5rem;'>Elegance Has Arrived!</h2>";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = days.toString().padStart(2, '0');
        document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
        document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');
    }, 1000);

    // ==========================================
    // 3. SCROLL REVEAL & NAVBAR STYLING
    // ==========================================
    function triggerReveal() {
        const reveals = document.querySelectorAll(".reveal");
        const windowHeight = window.innerHeight;
        
        reveals.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) {
                el.classList.add("active");
            }
        });
    }

    const progressBar = document.getElementById("scroll-progress");
    const navbar = document.getElementById("navbar");

    window.addEventListener("scroll", () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        
        if(progressBar) progressBar.style.width = (winScroll / height) * 100 + "%";

        if (winScroll > 50) {
            navbar.style.background = "rgba(10, 10, 10, 0.95)";
        } else {
            navbar.style.background = "rgba(5, 5, 5, 0.85)";
        }

        triggerReveal();
    });

    // ==========================================
    // 4. MOBILE MENU
    // ==========================================
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if(hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // ==========================================
    // 5. LIGHTBOX MODAL FOR GALLERY
    // ==========================================
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");

    window.openLightbox = function(element) {
        const img = element.querySelector('img');
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
    }

    window.closeLightbox = function() {
        lightbox.classList.remove('active');
    }

    if(lightbox) {
        lightbox.addEventListener('click', (e) => {
            if(e.target !== lightboxImg) {
                closeLightbox();
            }
        });
    }

    // ==========================================
    // 6. FLOATING GOLD PARTICLES GENERATOR
    // ==========================================
    function startGoldParticles() {
        const container = document.getElementById('particles-container');
        if(!container) return;
        const limit = window.innerWidth > 768 ? 60 : 30; // Amount of particles

        setInterval(() => {
            if(container.childElementCount > limit) return;

            const particle = document.createElement("div");
            particle.classList.add("gold-particle");
            
            particle.style.left = Math.random() * 100 + "vw";
            const duration = Math.random() * 10 + 10; // 10s to 20s
            particle.style.animationDuration = duration + "s";
            
            const size = Math.random() * 4 + 2; 
            particle.style.width = size + "px";
            particle.style.height = size + "px";

            container.appendChild(particle);

            setTimeout(() => { particle.remove(); }, duration * 1000);
            
        }, 400); 
    }

});
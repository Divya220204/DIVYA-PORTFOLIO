// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
    
    // Custom Inverted Cursor Logic
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');
    
    // Check for fine pointer (desktops)
    if (window.matchMedia("(pointer: fine)").matches) {
        document.addEventListener('mousemove', (e) => {
            // Direct follow for dot
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
            
            // GSAP quick setter for smoother ring follow
            gsap.to(cursorRing, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: "power2.out"
            });
        });

        // Add hover states
        const interactiveEls = document.querySelectorAll('a, button, .project-item, .exp-row');
        interactiveEls.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
        });
    }

    // Hero Animations
    const tlHero = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.5 } });
    
    tlHero.to(".image-reveal", { height: 0, duration: 1.2 })
          .fromTo(".hero-image", { scale: 1.2 }, { scale: 1, duration: 1.5 }, "-=1.2")
          .fromTo(".title-top", { x: "-20vw", opacity: 0 }, { x: "-5vw", opacity: 1 }, "-=1.2")
          .fromTo(".title-bottom", { x: "20vw", opacity: 0 }, { x: "5vw", opacity: 1 }, "-=1.4")
          .fromTo(".hero-desc, .hero-label, .scroll-indicator", { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1 }, "-=1");

    // Parallax Images
    gsap.utils.toArray('.parallax-img').forEach(img => {
        gsap.to(img, {
            yPercent: 20,
            ease: "none",
            scrollTrigger: {
                trigger: img.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });

    // Typography Parallax (Hero Titles)
    gsap.to('.title-top', {
        x: "-15vw",
        scrollTrigger: {
            trigger: '.hero',
            start: "top top",
            end: "bottom top",
            scrub: 1
        }
    });
    
    gsap.to('.title-bottom', {
        x: "15vw",
        scrollTrigger: {
            trigger: '.hero',
            start: "top top",
            end: "bottom top",
            scrub: 1
        }
    });

    // Fade Up Elements
    gsap.utils.toArray('.fade-up').forEach(element => {
        gsap.to(element, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Massive Text Parallax (About Section)
    gsap.to('.huge-text', {
        y: 100,
        ease: "none",
        scrollTrigger: {
            trigger: '.about',
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });

    // Project Info Parallax
    gsap.utils.toArray('.project-info').forEach(info => {
        gsap.fromTo(info, { y: 50 }, {
            y: -50,
            ease: "none",
            scrollTrigger: {
                trigger: info.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }
        });
    });

    // Hover Image Reveal for Experience
    const hoverImages = document.querySelectorAll('.hover-image');
    document.addEventListener('mousemove', (e) => {
        hoverImages.forEach(img => {
            // Slight parallax on mouse move for the floating image
            const x = (e.clientX / window.innerWidth - 0.5) * 40;
            const y = (e.clientY / window.innerHeight - 0.5) * 40;
            
            gsap.to(img, {
                x: x, 
                y: y,
                duration: 1,
                ease: "power2.out"
            });
        });
    });

    // Remove loading state once JS kicks in
    document.body.classList.remove('loading');
});

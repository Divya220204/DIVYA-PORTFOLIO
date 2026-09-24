/* =====================
   SCRAPBOOK / BULLET JOURNAL JS
   Floating & Scattering GSAP Animations
====================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Icons
    lucide.createIcons();

    // 2. Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // 3. Custom Soft Cursor
    const cursorDot = document.querySelector('.cursor-dot');
    document.addEventListener('mousemove', (e) => {
        if(cursorDot) {
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
        }
    });

    // Handle cursor hover states for all links and buttons
    const interactiveElements = document.querySelectorAll('a, button');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if(cursorDot) {
                cursorDot.style.transform = 'translate(-50%, -50%) scale(2)';
                cursorDot.style.backgroundColor = 'var(--color-sage)';
            }
        });
        el.addEventListener('mouseleave', () => {
            if(cursorDot) {
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorDot.style.backgroundColor = 'var(--color-blush)';
            }
        });
    });

    // 4. Hero Animations (Scattering into place)
    const tlHero = gsap.timeline();
    
    tlHero.from('.hero-left > *', {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out'
    })
    .from('.p-1', {
        x: -50,
        y: 50,
        rotation: -15,
        opacity: 0,
        duration: 1,
        ease: 'back.out(1.5)'
    }, "-=0.6")
    .from('.p-2', {
        x: 50,
        y: 50,
        rotation: 15,
        opacity: 0,
        duration: 1,
        ease: 'back.out(1.5)'
    }, "-=0.8")
    .from('.n-hero', {
        scale: 0.8,
        y: -30,
        rotation: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(1.5)'
    }, "-=0.6")
    .from('.f-1', {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        ease: 'back.out(2)'
    }, "-=0.4");

    // Add continuous floating animations for liveliness
    tlHero.add(() => {
        gsap.to('.p-1', { y: "+=15", rotation: "-=2", yoyo: true, repeat: -1, duration: 3, ease: 'sine.inOut' });
        gsap.to('.p-2', { y: "-=15", rotation: "+=2", yoyo: true, repeat: -1, duration: 2.5, ease: 'sine.inOut' });
        gsap.to('.n-hero', { y: "+=10", rotation: "+=3", yoyo: true, repeat: -1, duration: 3.5, ease: 'sine.inOut' });
    });

    // 5. Scroll Animations for Projects (Collage building)
    gsap.utils.toArray('.project-collage').forEach(project => {
        const polaroid = project.querySelector('.p-project');
        const swatches = project.querySelector('.color-swatches');
        const largeNote = project.querySelector('.large-note');
        const sideNote = project.querySelector('.small-note');
        
        const isReverse = project.classList.contains('reverse');
        
        gsap.from(polaroid, {
            scrollTrigger: {
                trigger: project,
                start: "top 75%",
            },
            x: isReverse ? 50 : -50,
            y: 50,
            rotation: isReverse ? 10 : -10,
            opacity: 0,
            duration: 1.2,
            ease: 'back.out(1.2)'
        });
        
        gsap.from(swatches, {
            scrollTrigger: {
                trigger: project,
                start: "top 75%",
            },
            scale: 0,
            opacity: 0,
            duration: 0.8,
            delay: 0.3,
            ease: 'back.out(2)'
        });
        
        gsap.from(largeNote, {
            scrollTrigger: {
                trigger: project,
                start: "top 65%",
            },
            y: 40,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
        
        if (sideNote) {
            gsap.from(sideNote, {
                scrollTrigger: {
                    trigger: project,
                    start: "top 50%",
                },
                scale: 0.8,
                rotation: isReverse ? -15 : 15,
                opacity: 0,
                duration: 0.8,
                delay: 0.5,
                ease: 'back.out(1.5)'
            });
        }
    });

    // 6. Scroll Animations for About Section
    const aboutTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.about-section',
            start: "top 70%"
        }
    });

    aboutTl.from('.p-about-1', {
        x: -50,
        y: 30,
        rotation: -10,
        opacity: 0,
        duration: 1,
        ease: 'back.out(1.5)'
    })
    .from('.n-about-1', {
        x: 30,
        y: -30,
        rotation: 15,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(1.5)'
    }, "-=0.6")
    .from('.xl-note', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    }, "-=0.4")
    .from('.doodle-sparkle', {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        ease: 'back.out(2)'
    }, "-=0.2");
});

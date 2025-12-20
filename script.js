document.addEventListener('DOMContentLoaded', () => {



    // --- Scroll Reveal (Sections) ---
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    sections.forEach(sec => {
        // Only fade sections if not pinned/complex
        if (!sec.classList.contains('work-section-pinned') && !sec.classList.contains('process-section')) {
            sec.style.opacity = '0';
            sec.style.transform = 'translateY(40px)';
            sec.style.transition = 'all 1s cubic-bezier(0.165, 0.84, 0.44, 1)';
            sectionObserver.observe(sec);
        }
    });

    // --- Roadmap Step Activator ---
    const stepObserverOptions = {
        root: null,
        rootMargin: '-40% 0px -40% 0px', // Activate when in middle 20% of screen
        threshold: 0
    };

    const stepObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, stepObserverOptions);

    const steps = document.querySelectorAll('.roadmap-step');
    steps.forEach(step => stepObserver.observe(step));

    // --- Case Study Modal Logic ---
    const modal = document.getElementById('case-study-modal');
    const modalContent = document.querySelector('.modal-content'); // Get container
    const closeBtn = document.querySelector('.close-modal');
    const caseStudyLinks = document.querySelectorAll('.view-case-study');

    if (modal && modalContent && closeBtn) {
        // Open Modal
        caseStudyLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const srcString = link.getAttribute('data-src');

                if (srcString) {
                    // Clear existing content (except close button if it was inside, but it's not)
                    modalContent.innerHTML = '';

                    const sources = srcString.split(',');

                    sources.forEach(src => {
                        const img = document.createElement('img');
                        img.src = src.trim();
                        img.alt = "Case Study Part";
                        modalContent.appendChild(img);
                    });

                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        // Close Logic
        function closeModal() {
            modal.style.display = 'none';
            modalContent.innerHTML = ''; // Clear images
            document.body.style.overflow = 'auto';
        }

        closeBtn.addEventListener('click', closeModal);

        // Close if clicking outside image
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                closeModal();
            }
        });
    }
});

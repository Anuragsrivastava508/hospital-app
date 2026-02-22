// JavaScript for Doctor Search Website

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const searchInput = document.getElementById('search');
    const specialtySelect = document.getElementById('specialty');
    const distanceSelect = document.getElementById('distance');
    const insuranceSelect = document.getElementById('insurance');
    const applyFiltersBtn = document.getElementById('applyFilters');
    const clearFiltersBtn = document.getElementById('clearFilters');
    const noResultsDiv = document.getElementById('noResults');
    const resetSearchBtn = document.getElementById('resetSearch');
    const doctorCards = document.querySelectorAll('.doctor-card');
    const bookBtns = document.querySelectorAll('.book-btn');
    const modal = document.getElementById('bookingModal');
    const closeModalBtn = document.getElementById('closeModal');
    const bookingForm = document.getElementById('bookingForm');

    // Filter doctors function
    function filterDoctors() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedSpecialty = specialtySelect.value.toLowerCase();
        const selectedDistance = parseInt(distanceSelect.value) || Infinity;
        const selectedInsurance = insuranceSelect.value.toLowerCase();

        let visibleCount = 0;

        doctorCards.forEach(card => {
            const name = card.querySelector('h3').textContent.toLowerCase();
            const specialty = card.querySelector('p').textContent.toLowerCase();
            const locationText = card.querySelector('.text-sm.text-gray-600').textContent;
            const distance = parseFloat(locationText.match(/(\d+\.\d+) miles/)?.[1]) || 0;

            let show = true;

            // Search filter
            if (searchTerm && !name.includes(searchTerm) && !specialty.includes(searchTerm) && !locationText.toLowerCase().includes(searchTerm)) {
                show = false;
            }

            // Specialty filter
            if (selectedSpecialty && !specialty.includes(selectedSpecialty)) {
                show = false;
            }

            // Distance filter
            if (distance > selectedDistance) {
                show = false;
            }

            // Insurance filter (simplified - in real app, check doctor's accepted insurance)
            if (selectedInsurance) {
                // This is a placeholder - in real implementation, check doctor's data
                show = show; // Keep as is
            }

            card.style.display = show ? 'block' : 'none';
            if (show) visibleCount++;
        });

        // Show/hide no results message
        if (visibleCount === 0) {
            noResultsDiv.classList.remove('hidden');
        } else {
            noResultsDiv.classList.add('hidden');
        }
    }

    // Clear filters function
    function clearFilters() {
        searchInput.value = '';
        specialtySelect.value = '';
        distanceSelect.value = '5';
        insuranceSelect.value = '';
        filterDoctors();
    }

    // Event listeners
    applyFiltersBtn.addEventListener('click', filterDoctors);
    clearFiltersBtn.addEventListener('click', clearFilters);
    resetSearchBtn.addEventListener('click', clearFilters);
    searchInput.addEventListener('input', filterDoctors);
    specialtySelect.addEventListener('change', filterDoctors);
    distanceSelect.addEventListener('change', filterDoctors);
    insuranceSelect.addEventListener('change', filterDoctors);

    // Booking modal
    bookBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const doctorName = this.closest('.doctor-card').querySelector('h3').textContent;
            document.getElementById('modalTitle').textContent = `Book Appointment with ${doctorName}`;
            modal.classList.remove('hidden');
        });
    });

    closeModalBtn.addEventListener('click', function() {
        modal.classList.add('hidden');
    });

    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });

    // Handle booking form submission
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Appointment booked successfully! We will contact you soon.');
        modal.classList.add('hidden');
        bookingForm.reset();
    });

    // Mobile menu toggle
    const menuOpenBtn = document.getElementById('menu-open-button');
    const menuCloseBtn = document.getElementById('menu-close-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuOpenBtn && menuCloseBtn && mobileMenu) {
        menuOpenBtn.addEventListener('click', function() {
            mobileMenu.classList.remove('hidden');
        });

        menuCloseBtn.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
        });
    }

    // Smooth scrolling for nav links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
            // Close mobile menu if open
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });
    });

    // Add some animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);

    doctorCards.forEach(card => {
        observer.observe(card);
    // Stats counter animation
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('[data-target]');
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const increment = target / 100;
                    let current = 0;
                    
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.innerText = Math.ceil(current);
                            setTimeout(updateCounter, 20);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCounter();
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.bg-cyan-600');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Newsletter form submission
    const newsletterForm = document.querySelector('.bg-gray-100 form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for subscribing! You will receive our latest updates.');
            this.reset();
        });
    }

    // Contact form submission
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }

    // Back to top button
    const backToTopBtn = document.getElementById('backToTop');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.remove('opacity-0', 'invisible');
        } else {
            backToTopBtn.classList.add('opacity-0', 'invisible');
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

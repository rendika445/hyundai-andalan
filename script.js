// Premium Car Sales Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form handling
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            
            // Basic validation
            if (!firstName || !lastName || !email || !message) {
                showAlert('Mohon isi semua field yang diperlukan.', 'danger');
                return;
            }
            
            if (!isValidEmail(email)) {
                showAlert('Mohon masukkan alamat email yang valid.', 'danger');
                return;
            }
            
            // Simulate form submission
            showAlert('Terima kasih atas pesan Anda! Kami akan segera menghubungi Anda.', 'success');
            this.reset();
        });
    }

    // Credit Simulation Form
    const creditSimulationForm = document.getElementById('creditSimulation');
    if (creditSimulationForm) {
        // Tidak perlu event listener input untuk dp karena sekarang select
        creditSimulationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Get all field values
            const nama = document.getElementById('nama').value;
            const nohp = document.getElementById('nohp').value;
            const kota = document.getElementById('kota').value;
            const mobiltipe = document.getElementById('mobiltipe').value;
            const tenor = document.getElementById('tenor').value;
            const dp = document.getElementById('dp').value;
            const rencana = document.getElementById('rencana').value;

            // Validate required fields (should already be handled by HTML5, but double check)
            if (!nama || !nohp || !kota || !mobiltipe || !tenor || !dp || !rencana) {
                showAlert('Mohon isi semua field yang diperlukan.', 'danger');
                return;
            }

            // Compose WhatsApp message
            const waNumber = '6281992657639';
            const message =
                `Halo Ahmad Riffai Zarkasih, saya ingin mengetahui lebih lanjut tentang mobil Hyundai, mohon dibantu.\n\n` +
                `*Simulasi Kredit Hyundai*\n` +
                `Nama: ${nama}\n` +
                `No HP: ${nohp}\n` +
                `Kota: ${kota}\n` +
                `Mobil & Tipe: ${mobiltipe}\n` +
                `Tenor: ${tenor} Tahun\n` +
                `Budget DP: ${dp}\n` +
                `Rencana Pembelian: ${rencana}`;

            const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
            window.open(waUrl, '_blank');
        });
    }

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Alert function
    function showAlert(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        alertDiv.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(alertDiv);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 5000);
    }

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loading');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .vehicle-card, .promotion-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('bg-white');
            navbar.classList.remove('bg-transparent');
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.classList.remove('bg-white');
            navbar.classList.add('bg-transparent');
            navbar.style.boxShadow = 'none';
        }
    });

    // Mobile Fullscreen Navbar
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const body = document.body;

    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            if (isExpanded) {
                // Closing navbar
                body.classList.remove('navbar-open');
                setTimeout(() => {
                    navbarCollapse.classList.remove('show');
                }, 300);
            } else {
                // Opening navbar
                body.classList.add('navbar-open');
                navbarCollapse.classList.add('show');
            }
        });

        // Close navbar when clicking on nav links
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                body.classList.remove('navbar-open');
                setTimeout(() => {
                    navbarCollapse.classList.remove('show');
                    navbarToggler.classList.add('collapsed');
                    navbarToggler.setAttribute('aria-expanded', 'false');
                }, 300);
            });
        });

        // Close navbar when clicking outside
        document.addEventListener('click', function(e) {
            if (!navbar.contains(e.target) && navbarCollapse.classList.contains('show')) {
                body.classList.remove('navbar-open');
                setTimeout(() => {
                    navbarCollapse.classList.remove('show');
                    navbarToggler.classList.add('collapsed');
                    navbarToggler.setAttribute('aria-expanded', 'false');
                }, 300);
            }
        });

        // Close navbar on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navbarCollapse.classList.contains('show')) {
                body.classList.remove('navbar-open');
                setTimeout(() => {
                    navbarCollapse.classList.remove('show');
                    navbarToggler.classList.add('collapsed');
                    navbarToggler.setAttribute('aria-expanded', 'false');
                }, 300);
            }
        });
    }

    // Vehicle modal enhancements
    const vehicleModals = document.querySelectorAll('[id^="vehicleModal"]');
    vehicleModals.forEach(modal => {
        modal.addEventListener('show.bs.modal', function() {
            const modalBody = this.querySelector('.modal-body');
            modalBody.style.opacity = '0';
            modalBody.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                modalBody.style.transition = 'all 0.3s ease';
                modalBody.style.opacity = '1';
                modalBody.style.transform = 'translateY(0)';
            }, 100);
        });
    });

    // Test drive button functionality
    const testDriveButtons = document.querySelectorAll('.btn-primary');
    testDriveButtons.forEach(button => {
        if (button.textContent.includes('Test Drive')) {
            button.addEventListener('click', function() {
                showAlert('Test drive request submitted! We will contact you to schedule your appointment.', 'success');
            });
        }
    });



    // Price formatting
    const priceElements = document.querySelectorAll('.text-primary.fw-bold');
    priceElements.forEach(element => {
        if (element.textContent.includes('$')) {
            const price = element.textContent.replace('$', '').replace(',', '');
            const formattedPrice = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
            }).format(price);
            element.textContent = formattedPrice;
        }
    });

    // Carousel auto-play with pause on hover
    const heroCarousel = document.getElementById('heroCarousel');
    if (heroCarousel) {
        const carousel = new bootstrap.Carousel(heroCarousel, {
            interval: 5000,
            pause: 'hover'
        });
    }

    // Add loading animation to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '0';
            this.style.transition = 'opacity 0.3s ease';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 100);
        });
    });

    // Counter animation for statistics (if needed)
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }

    // Add click tracking for analytics (placeholder)
    function trackEvent(eventName, data = {}) {
        console.log('Event tracked:', eventName, data);
        // Here you would typically send data to Google Analytics or similar
    }

    // Track button clicks
    const trackableButtons = document.querySelectorAll('.btn');
    trackableButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            const buttonType = this.classList.contains('btn-primary') ? 'primary' : 'secondary';
            trackEvent('button_click', {
                text: buttonText,
                type: buttonType,
                section: this.closest('section')?.id || 'unknown'
            });
        });
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Escape key to close modals
        if (e.key === 'Escape') {
            const openModals = document.querySelectorAll('.modal.show');
            openModals.forEach(modal => {
                const modalInstance = bootstrap.Modal.getInstance(modal);
                if (modalInstance) {
                    modalInstance.hide();
                }
            });
        }
    });

    // Add touch support for mobile
    let touchStartY = 0;
    let touchEndY = 0;

    document.addEventListener('touchstart', function(e) {
        touchStartY = e.changedTouches[0].screenY;
    });

    document.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartY - touchEndY;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe up - could be used for navigation
                console.log('Swipe up detected');
            } else {
                // Swipe down - could be used for navigation
                console.log('Swipe down detected');
            }
        }
    }

    // Performance optimization: Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Add a "Back to Top" button
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTopButton.className = 'btn btn-primary position-fixed';
    backToTopButton.style.cssText = 'bottom: 20px; right: 20px; z-index: 1000; border-radius: 50%; width: 50px; height: 50px; display: none;';
    backToTopButton.setAttribute('aria-label', 'Back to top');
    
    document.body.appendChild(backToTopButton);

    // Show/hide back to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    // Back to top functionality
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Show Produk dropdown on hover/focus
    const produkDropdown = document.getElementById('produkDropdown');
    if (produkDropdown) {
        const dropdownMenu = produkDropdown.nextElementSibling;
        // Show on mouseenter
        produkDropdown.addEventListener('mouseenter', function() {
            produkDropdown.classList.add('show');
            dropdownMenu.classList.add('show');
        });
        // Hide on mouseleave
        produkDropdown.parentElement.addEventListener('mouseleave', function() {
            produkDropdown.classList.remove('show');
            dropdownMenu.classList.remove('show');
        });
        // Show on focus
        produkDropdown.addEventListener('focus', function() {
            produkDropdown.classList.add('show');
            dropdownMenu.classList.add('show');
        });
        // Hide on blur
        produkDropdown.addEventListener('blur', function() {
            produkDropdown.classList.remove('show');
            dropdownMenu.classList.remove('show');
        });
    }

    // Initialize the page
    console.log('Premium Car Sales website loaded successfully!');
}); 

function formatRupiah(angka, prefix) {
    let number_string = angka.replace(/[^\d]/g, ''),
        split = number_string.split(','),
        sisa = split[0].length % 3,
        rupiah = split[0].substr(0, sisa),
        ribuan = split[0].substr(sisa).match(/\d{3}/g);
    if (ribuan) {
        let separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }
    rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
    return prefix === undefined ? rupiah : (rupiah ? prefix + rupiah : '');
} 
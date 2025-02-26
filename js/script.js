document.addEventListener('DOMContentLoaded', function() {
    // Welcome Voice Functionality - Improved for Classical Stories
    function initWelcomeVoice() {
        // Create personalized welcome message for Pavan Kumar's photography site
        const welcomeMessage = "Welcome to Classical Stories, Pavan Kumar's wedding photography portfolio. We capture your precious moments forever.";
        
        // Function to play welcome message with improved voice quality
        function playWelcomeMessage() {
            // Using the Web Speech API
            const speech = new SpeechSynthesisUtterance();
            speech.text = welcomeMessage;
            speech.volume = 0.9; // Slightly louder
            speech.rate = 0.85;  // Slightly slower for better clarity
            speech.pitch = 1.1;  // Slightly higher pitch for female voice
            
            // Get available voices and select a female voice
            let voices = window.speechSynthesis.getVoices();
            let femaleVoice = null;
            
            // Function to find and set a good female voice
            function setFemaleVoice() {
                voices = window.speechSynthesis.getVoices();
                
                // First try to find specific high-quality female voices
                for (let i = 0; i < voices.length; i++) {
                    // Look for known high-quality female voices
                    if (voices[i].name.includes("female") || 
                        voices[i].name.includes("Samantha") || 
                        voices[i].name.includes("Moira") ||
                        voices[i].name.includes("Kathy") ||
                        voices[i].name.includes("Victoria") ||
                        voices[i].name.includes("Veena") ||
                        voices[i].name.includes("Tessa") ||
                        (voices[i].name.includes("Google") && voices[i].name.includes("Female")) ||
                        (voices[i].name.includes("Microsoft") && 
                         (voices[i].name.includes("Zira") || 
                          voices[i].name.includes("Aria") || 
                          voices[i].name.includes("Sonia")))) {
                        femaleVoice = voices[i];
                        break;
                    }
                }
                
                // If no specific female voice found, try to find any female voice
                if (!femaleVoice) {
                    for (let i = 0; i < voices.length; i++) {
                        if (voices[i].name.includes("f") || voices[i].name.includes("F")) {
                            femaleVoice = voices[i];
                            break;
                        }
                    }
                }
                
                // If a female voice is found, use it
                if (femaleVoice) {
                    speech.voice = femaleVoice;
                }
                
                // Play the welcome message automatically
                window.speechSynthesis.speak(speech);
            }
            
            // Check if voices are already loaded
            if (voices.length > 0) {
                setFemaleVoice();
            } else {
                // Wait for voices to be loaded
                window.speechSynthesis.onvoiceschanged = setFemaleVoice;
            }
        }
        
        // Add a toggle button for the welcome voice
        const voiceToggle = document.createElement('button');
        voiceToggle.id = 'voice-toggle';
        voiceToggle.innerHTML = '🔊';
        voiceToggle.title = 'Toggle Welcome Voice';
        voiceToggle.style.position = 'fixed';
        voiceToggle.style.bottom = '20px';
        voiceToggle.style.right = '20px';
        voiceToggle.style.zIndex = '1000';
        voiceToggle.style.background = '#b88e3e'; // Gold color to match wedding photography theme
        voiceToggle.style.color = 'white';
        voiceToggle.style.border = 'none';
        voiceToggle.style.borderRadius = '50%';
        voiceToggle.style.width = '40px';
        voiceToggle.style.height = '40px';
        voiceToggle.style.cursor = 'pointer';
        voiceToggle.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        voiceToggle.style.display = 'flex';
        voiceToggle.style.alignItems = 'center';
        voiceToggle.style.justifyContent = 'center';
        
        document.body.appendChild(voiceToggle);
        
        // Add credit text
        const creditText = document.createElement('div');
        creditText.innerText = 'Website by Roopesh K';
        creditText.style.position = 'fixed';
        creditText.style.bottom = '5px';
        creditText.style.right = '70px';
        creditText.style.fontSize = '10px';
        creditText.style.color = '#888';
        document.body.appendChild(creditText);
        
        // Toggle voice on/off
        voiceToggle.addEventListener('click', function() {
            if (localStorage.getItem('voiceDisabled') === 'true') {
                localStorage.setItem('voiceDisabled', 'false');
                voiceToggle.innerHTML = '🔊';
                voiceToggle.style.background = '#b88e3e';
                // Play welcome message when toggled on
                playWelcomeMessage();
            } else {
                localStorage.setItem('voiceDisabled', 'true');
                voiceToggle.innerHTML = '🔇';
                voiceToggle.style.background = '#888';
                // Stop any currently playing speech
                window.speechSynthesis.cancel();
            }
        });
        
        // Check if voice is disabled (using localStorage for persistence)
        if (localStorage.getItem('voiceDisabled') === 'true') {
            // Update toggle button to show disabled state
            voiceToggle.innerHTML = '🔇';
            voiceToggle.style.background = '#888';
        } else {
            // Play welcome message automatically - with slight delay to ensure all resources are loaded
            setTimeout(playWelcomeMessage, 1000);
        }
    }
    
    // Initialize welcome voice immediately
    initWelcomeVoice();
    
    // Menu Toggle Functionality
    const menuIcon = document.getElementById('menu-icon');
    const menuDropdown = document.getElementById('menu-dropdown');
    const menuOverlay = document.getElementById('menu-overlay');
    if (menuIcon && menuDropdown && menuOverlay) {
        menuIcon.addEventListener('click', function() {
            menuDropdown.style.display = menuDropdown.style.display === 'block' ? 'none' : 'block';
            menuOverlay.style.display = menuOverlay.style.display === 'block' ? 'none' : 'block';
        });
        menuOverlay.addEventListener('click', function() {
            menuDropdown.style.display = 'none';
            menuOverlay.style.display = 'none';
        });
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = menuDropdown.contains(event.target);
            const isClickOnMenuIcon = menuIcon.contains(event.target);

            if (!isClickInsideMenu && !isClickOnMenuIcon && menuDropdown.style.display === 'block') {
                menuDropdown.style.display = 'none';
                menuOverlay.style.display = 'none';
            }
        });
    }
    
    // Hero Slider Functionality
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroDots = document.querySelectorAll('.slider-dots .dot');
    const prevSlide = document.querySelector('.prev-slide');
    const nextSlide = document.querySelector('.next-slide');
    let currentSlide = 0;
    let slideInterval;
    function showSlide(index) {
        heroSlides.forEach(slide => slide.classList.remove('active'));
        heroDots.forEach(dot => dot.classList.remove('active'));

        heroSlides[index].classList.add('active');
        heroDots[index].classList.add('active');
        currentSlide = index;
    }
    function nextSlideShow() {
        currentSlide = (currentSlide + 1) % heroSlides.length;
        showSlide(currentSlide);
    }
    function prevSlideShow() {
        currentSlide = (currentSlide - 1 + heroSlides.length) % heroSlides.length;
        showSlide(currentSlide);
    }
    function startSlideShow() {
        slideInterval = setInterval(nextSlideShow, 5000);
    }
    function stopSlideShow() {
        clearInterval(slideInterval);
    }
    if (heroSlides.length > 0 && heroDots.length > 0) {
        heroDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                stopSlideShow();
                showSlide(index);
                startSlideShow();
            });
        });
        if (prevSlide && nextSlide) {
            prevSlide.addEventListener('click', () => {
                stopSlideShow();
                prevSlideShow();
                startSlideShow();
            });

            nextSlide.addEventListener('click', () => {
                stopSlideShow();
                nextSlideShow();
                startSlideShow();
            });
        }
        startSlideShow();
    }

    // Testimonial Slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
    let currentTestimonial = 0;
    let testimonialInterval;

    function showTestimonial(index) {
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        testimonialDots.forEach(dot => dot.classList.remove('active'));

        testimonialSlides[index].classList.add('active');
        testimonialDots[index].classList.add('active');
        currentTestimonial = index;
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length;
        showTestimonial(currentTestimonial);
    }

    function startTestimonialRotation() {
        testimonialInterval = setInterval(nextTestimonial, 6000);
    }

    if (testimonialSlides.length > 0 && testimonialDots.length > 0) {
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                clearInterval(testimonialInterval);
                showTestimonial(index);
                startTestimonialRotation();
            });
        });
        startTestimonialRotation();
    }

    // Form Validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            let valid = true;
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            const phoneInput = document.getElementById('phone');

            // Reset error states
            const formInputs = contactForm.querySelectorAll('.form-input');
            formInputs.forEach(input => {
                input.classList.remove('error');
                const errorMsg = input.parentElement.querySelector('.error-message');
                if (errorMsg) {
                    errorMsg.remove();
                }
            });

            // Validate name
            if (!nameInput.value.trim()) {
                displayError(nameInput, 'Please enter your name');
                valid = false;
            }

            // Validate email
            if (!emailInput.value.trim()) {
                displayError(emailInput, 'Please enter your email');
                valid = false;
            } else if (!isValidEmail(emailInput.value)) {
                displayError(emailInput, 'Please enter a valid email');
                valid = false;
            }

            // Validate phone (optional)
            if (phoneInput && phoneInput.value.trim() && !isValidPhone(phoneInput.value)) {
                displayError(phoneInput, 'Please enter a valid phone number');
                valid = false;
            }

            // Validate message
            if (!messageInput.value.trim()) {
                displayError(messageInput, 'Please enter your message');
                valid = false;
            }

            if (valid) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Thank you for your message! We will get back to you soon.';

                contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);

                // Also speak the success message with the improved female voice
                if (localStorage.getItem('voiceDisabled') !== 'true') {
                    const speech = new SpeechSynthesisUtterance('Thank you for your message. Pavan Kumar will get back to you soon.');
                    speech.volume = 0.9;
                    speech.rate = 0.85;
                    speech.pitch = 1.1;
                    
                    // Try to use the same female voice
                    const voices = window.speechSynthesis.getVoices();
                    for (let i = 0; i < voices.length; i++) {
                        if (voices[i].name.includes("female") || 
                            voices[i].name.includes("Samantha") || 
                            voices[i].name.includes("Victoria")) {
                            speech.voice = voices[i];
                            break;
                        }
                    }
                    
                    window.speechSynthesis.speak(speech);
                }

                // Reset form
                contactForm.reset();

                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }
        });
    }

    function displayError(input, message) {
        input.classList.add('error');
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        input.parentElement.appendChild(errorMessage);
    }

    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function isValidPhone(phone) {
        const re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
        return re.test(String(phone));
    }

    // Gallery/Portfolio Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item, .portfolio-item');

    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Update active filter button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                // **Corrected line for BOTH Gallery and Portfolio pages: Use 'data-filter'**
                const filter = this.getAttribute('data-filter');

                // Filter items
                galleryItems.forEach(item => {
                    if (filter === 'all') {
                        item.style.display = 'block';
                    } else if (item.classList.contains(filter)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Image Lightbox
    const galleryImages = document.querySelectorAll('.gallery-item img, .portfolio-item img');

    if (galleryImages.length > 0) {
        galleryImages.forEach(image => {
            image.addEventListener('click', function() {
                // Create lightbox
                const lightbox = document.createElement('div');
                lightbox.className = 'lightbox';

                const lightboxContent = document.createElement('div');
                lightboxContent.className = 'lightbox-content';

                const lightboxImg = document.createElement('img');
                lightboxImg.src = this.src;

                const closeBtn = document.createElement('span');
                closeBtn.className = 'close-lightbox';
                closeBtn.innerHTML = '&times;';

                // Append elements
                lightboxContent.appendChild(lightboxImg);
                lightboxContent.appendChild(closeBtn);
                lightbox.appendChild(lightboxContent);
                document.body.appendChild(lightbox);

                // Disable body scrolling
                document.body.style.overflow = 'hidden';

                // Voice description for the image if voice is enabled
                if (localStorage.getItem('voiceDisabled') !== 'true') {
                    // Use alt text or a generic description
                    const description = this.alt || "Take a look at this beautiful wedding photograph by Pavan Kumar";
                    const speech = new SpeechSynthesisUtterance(description);
                    speech.volume = 0.7; // Softer volume for image descriptions
                    speech.rate = 0.85;
                    speech.pitch = 1.1;
                    
                    // Try to use the same female voice
                    const voices = window.speechSynthesis.getVoices();
                    for (let i = 0; i < voices.length; i++) {
                        if (voices[i].name.includes("female") || 
                            voices[i].name.includes("Samantha") || 
                            voices[i].name.includes("Victoria")) {
                            speech.voice = voices[i];
                            break;
                        }
                    }
                    
                    window.speechSynthesis.speak(speech);
                }

                // Close lightbox
                closeBtn.addEventListener('click', function() {
                    document.body.removeChild(lightbox);
                    document.body.style.overflow = '';
                    // Cancel any speech when closing
                    window.speechSynthesis.cancel();
                });

                lightbox.addEventListener('click', function(e) {
                    if (e.target === lightbox) {
                        document.body.removeChild(lightbox);
                        document.body.style.overflow = '';
                        // Cancel any speech when closing
                        window.speechSynthesis.cancel();
                    }
                });
            });
        });
    }

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animation on scroll
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in');

    function checkScroll() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    }

    if (animatedElements.length > 0) {
        window.addEventListener('scroll', checkScroll);
        // Initial check
        checkScroll();
    }
});
// mountmerchant-js.js - Main JavaScript file for the website

// Wait for the DOM to fully load before executing JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });
    }
    
    // Product card functionality - Add hover effects
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
        });
        
        // Add click functionality for "Learn More" buttons
        const learnMoreBtn = card.querySelector('.btn');
        if (learnMoreBtn) {
            learnMoreBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const productName = card.querySelector('h3').textContent;
                showProductDetails(productName);
            });
        }
    });
    
    // Function to display product details (simulated for now)
    function showProductDetails(productName) {
        alert(`You selected ${productName}. Detailed information coming soon!`);
        // In a real implementation, this could:
        // 1. Open a modal with product details
        // 2. Navigate to a product-specific page
        // 3. Load details via AJAX from a server
    }
    
    // Services section functionality
    const serviceBoxes = document.querySelectorAll('.service-box');
    
    serviceBoxes.forEach(box => {
        box.addEventListener('click', function() {
            const serviceName = this.querySelector('h3').textContent;
            showServiceDetails(serviceName);
        });
    });
    
    function showServiceDetails(serviceName) {
        alert(`You selected ${serviceName} service. Contact us for more information!`);
    }
    
    // Sectors slider functionality
    const sectorSlides = document.querySelectorAll('.sector-slide');
    let currentSlide = 0;
    
    // Automatic slider functionality
    function nextSlide() {
        sectorSlides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % sectorSlides.length;
        sectorSlides[currentSlide].classList.add('active');
    }
    
    // Initialize first slide as active
    sectorSlides[0].classList.add('active');
    
    // Set up automatic slider - change slide every 4 seconds
    setInterval(nextSlide, 4000);
    
    // Setup contact form submission
    const contactButton = document.querySelector('.cta-section .btn');
    
    if (contactButton) {
        contactButton.addEventListener('click', function(e) {
            e.preventDefault();
            showContactForm();
        });
    }
    
    // Function to display a contact form modal
    function showContactForm() {
        // Create modal element
        const modal = document.createElement('div');
        modal.className = 'contact-modal';
        
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-btn">&times;</span>
                <h2>Contact Our Team</h2>
                <form id="contact-form">
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" id="name" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="company">Company</label>
                        <input type="text" id="company" name="company">
                    </div>
                    <div class="form-group">
                        <label for="message">Message</label>
                        <textarea id="message" name="message" rows="4" required></textarea>
                    </div>
                    <button type="submit" class="btn">Submit</button>
                </form>
            </div>
        `;
        
        // Add modal to the DOM
        document.body.appendChild(modal);
        
        // Show modal with animation
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
        
        // Add close functionality
        const closeBtn = modal.querySelector('.close-btn');
        closeBtn.addEventListener('click', function() {
            modal.classList.remove('active');
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        });
        
        // Form submission handler
        const form = document.getElementById('contact-form');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                company: document.getElementById('company').value,
                message: document.getElementById('message').value
            };
            
            submitContactForm(formData);
        });
    }
    
    // Function to handle form submission
    function submitContactForm(formData) {
        // Here you would typically send data to a server
        // For now, we'll just simulate a successful submission
        alert(`Thank you, ${formData.name}! Your message has been received. We will contact you shortly.`);
        
        // Close the modal after submission
        const modal = document.querySelector('.contact-modal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        }
        
        // In a real implementation, you would use fetch or XMLHttpRequest:
        /*
        fetch('your-server-endpoint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // Handle success
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle error
        });
        */
    }
    
    // Setup newsletter subscription in footer
    const footerLinks = document.querySelectorAll('.footer-col a');
    
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const pageName = this.textContent;
            if (pageName === 'Contact Us') {
                e.preventDefault();
                showContactForm();
            } else {
                e.preventDefault();
                alert(`You clicked on ${pageName}. This page is coming soon!`);
            }
        });
    });
    
    // Add smooth scrolling for in-page navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // NEW CODE FOR WHY CHOOSE US SECTION
    // Feature box animation and interaction
    const featureBoxes = document.querySelectorAll('.feature-box');
    
    // Add animation to feature boxes on scroll
    const animateFeatures = () => {
        featureBoxes.forEach(box => {
            const boxPosition = box.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (boxPosition < screenPosition) {
                box.classList.add('show');
            }
        });
    };
    
    // Add interaction to feature boxes
    featureBoxes.forEach(box => {
        box.addEventListener('mouseenter', function() {
            this.querySelector('.feature-icon').style.transform = 'scale(1.1)';
        });
        
        box.addEventListener('mouseleave', function() {
            this.querySelector('.feature-icon').style.transform = 'scale(1)';
        });
        
        box.addEventListener('click', function() {
            const featureTitle = this.querySelector('.feature-title').textContent;
            showFeatureDetails(featureTitle);
        });
    });
    
    // Function to show feature details (modal or alert)
    function showFeatureDetails(featureTitle) {
        alert(`Learn more about our ${featureTitle} advantage!`);
        // In a production environment, this could open a modal with more detailed information
    }
    
    // Run animation on page load and scroll
    window.addEventListener('scroll', animateFeatures);
    animateFeatures(); // Run once on page load
});
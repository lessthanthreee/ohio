document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });

    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });

    // PC Card hover effects
    const pcCards = document.querySelectorAll('.pc-card');
    pcCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = 'var(--hover-shadow)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--card-shadow)';
        });
    });

    // Contact form submission handler
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = this.querySelector('input[type="text"]').value.trim();
            const email = this.querySelector('input[type="email"]').value.trim();
            const message = this.querySelector('textarea').value.trim();

            if (!name || !email || !message) {
                showNotification('Please fill out all fields', 'error');
                return;
            }

            // Email validation regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }

            // Simulate form submission
            showNotification('Thank you for your message! We will get back to you soon.', 'success');
            this.reset();
        });
    }

    // PC Card Inquiry Buttons
    const inquiryButtons = document.querySelectorAll('.inquire-btn');
    inquiryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const pcCard = this.closest('.pc-card');
            const pcName = pcCard.querySelector('h3').textContent;
            const pcSpecs = pcCard.querySelector('p').textContent;
            const pcPrice = pcCard.querySelector('.price').textContent;

            // Create and show modal
            showInquiryModal(pcName, pcSpecs, pcPrice);
        });
    });

    // Notification system
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
            notification.style.opacity = '1';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            notification.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Inquiry Modal
    function showInquiryModal(pcName, pcSpecs, pcPrice) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h3>Inquire About ${pcName}</h3>
                <p><strong>Specifications:</strong> ${pcSpecs}</p>
                <p><strong>Price:</strong> ${pcPrice}</p>
                <form class="inquiry-form">
                    <input type="text" placeholder="Your Name" required>
                    <input type="email" placeholder="Your Email" required>
                    <input type="tel" placeholder="Your Phone (optional)">
                    <textarea placeholder="Additional Questions or Comments" required></textarea>
                    <button type="submit" class="submit-btn">Send Inquiry</button>
                </form>
            </div>
        `;

        document.body.appendChild(modal);

        // Animate modal in
        setTimeout(() => {
            modal.style.opacity = '1';
            modal.querySelector('.modal-content').style.transform = 'translateY(0)';
        }, 10);

        // Close modal functionality
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', () => closeModal(modal));

        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal(modal);
        });

        // Handle form submission
        const inquiryForm = modal.querySelector('.inquiry-form');
        inquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('Thank you for your inquiry! We will contact you shortly.', 'success');
            closeModal(modal);
        });
    }

    function closeModal(modal) {
        modal.style.opacity = '0';
        modal.querySelector('.modal-content').style.transform = 'translateY(-20px)';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }

    // Add custom cursor effect for interactive elements
    const buttons = document.querySelectorAll('button, .cta-button, nav a');
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            button.style.setProperty('--x', `${x}px`);
            button.style.setProperty('--y', `${y}px`);
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Menu toggle with animation
    const menuToggle = document.getElementById('menuToggle');
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        this.style.transform = this.classList.contains('active') ? 'rotate(90deg)' : 'rotate(0deg)';
    });

    // Enhanced view details with ripple effect
    const viewDetailsButtons = document.querySelectorAll('.view-details-btn');
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const jobCard = this.closest('.job-card');
            const jobTitle = jobCard.querySelector('h2').textContent;
            
            // Ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
            
            // Job card shake animation
            jobCard.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => jobCard.style.animation = '', 500);
            
            // Redirect to job details page with job ID
            const jobCards = document.querySelectorAll('.job-card');
            const jobId = Array.from(jobCards).indexOf(jobCard) + 1;
            window.location.href = `job-details.html?id=${jobId}`;
        });
    });

    // Staggered animation on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.job-card').forEach(card => {
        card.style.animationPlayState = 'paused';
        observer.observe(card);
    });
});

// Add CSS for ripple effect and shake animation
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255,255,255,0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    .menu-toggle {
        transition: transform 0.3s ease;
    }
`;
document.head.appendChild(style);
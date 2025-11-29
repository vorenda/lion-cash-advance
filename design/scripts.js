// ========================================
// INITIALIZATION - Orchestrated page load
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  initRevealAnimations();
  initStickyHeader();
  initMobileMenu();
  initFAQAccordions();
  initFormValidation();
  initSmoothScroll();
  initPhoneTracking();
});

// ========================================
// REVEAL ANIMATIONS - Staggered on scroll
// ========================================
function initRevealAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
}

// ========================================
// STICKY HEADER - With smooth transition
// ========================================
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add scrolled class for styling
    header.classList.toggle('scrolled', currentScroll > 50);

    // Hide on scroll down, show on scroll up
    if (currentScroll > lastScroll && currentScroll > 100) {
      header.classList.add('header-hidden');
    } else {
      header.classList.remove('header-hidden');
    }
    lastScroll = currentScroll;
  }, { passive: true });
}

// ========================================
// MOBILE MENU - Animated toggle
// ========================================
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const menu = document.querySelector('.mobile-menu');
  const body = document.body;

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.classList.toggle('active');
    body.classList.toggle('menu-open', isOpen);

    // Animate menu items staggered
    if (isOpen) {
      menu.querySelectorAll('.menu-item').forEach((item, i) => {
        item.style.animationDelay = `${0.1 + i * 0.05}s`;
      });
    }
  });

  // Close menu when clicking on a menu item
  menu.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.classList.remove('active');
      body.classList.remove('menu-open');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !toggle.contains(e.target) && menu.classList.contains('open')) {
      menu.classList.remove('open');
      toggle.classList.remove('active');
      body.classList.remove('menu-open');
    }
  });
}

// ========================================
// FAQ ACCORDION - Smooth expand/collapse
// ========================================
function initFAQAccordions() {
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      const answer = item.querySelector('.faq-answer');
      const isOpen = item.classList.contains('open');

      // Close all other items
      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        if (openItem !== item) {
          openItem.classList.remove('open');
          openItem.querySelector('.faq-answer').style.maxHeight = '0';
        }
      });

      // Toggle current item
      item.classList.toggle('open', !isOpen);
      answer.style.maxHeight = isOpen ? '0' : `${answer.scrollHeight}px`;
    });
  });
}

// ========================================
// FORM VALIDATION - With micro-interactions
// ========================================
function initFormValidation() {
  const form = document.getElementById('applicationForm');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // Basic validation
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        isValid = false;
        field.style.borderColor = '#e74c3c';

        setTimeout(() => {
          field.style.borderColor = '';
        }, 2000);
      }
    });

    if (!isValid) {
      // Shake animation for error
      submitBtn.style.animation = 'shake 0.5s';
      setTimeout(() => {
        submitBtn.style.animation = '';
      }, 500);
      return;
    }

    // Add loading state
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');

    try {
      // Simulate form submission (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Success state
      submitBtn.classList.remove('loading');
      submitBtn.classList.add('success');
      submitBtn.innerHTML = '✓ Application Submitted!';

      // Show success message
      const successMessage = document.createElement('div');
      successMessage.className = 'success-message';
      successMessage.innerHTML = `
        <div style="padding: 1.5rem; background: #10734a; color: white; border-radius: 8px; margin-top: 1rem; text-align: center;">
          <h4 style="color: white; margin-bottom: 0.5rem;">Application Received!</h4>
          <p style="margin: 0;">We'll review your application and contact you within 24 hours.</p>
        </div>
      `;
      form.insertAdjacentElement('afterend', successMessage);

      // Reset form after delay
      setTimeout(() => {
        form.reset();
        submitBtn.disabled = false;
        submitBtn.classList.remove('success');
        submitBtn.innerHTML = originalText;
        successMessage.remove();
      }, 5000);

    } catch (error) {
      // Error state
      submitBtn.disabled = false;
      submitBtn.classList.remove('loading');
      submitBtn.innerHTML = '✗ Error - Try Again';

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
      }, 3000);

      console.error('Form submission error:', error);
    }
  });

  // Real-time validation
  form.querySelectorAll('input, select').forEach(field => {
    field.addEventListener('blur', () => {
      if (field.hasAttribute('required') && !field.value.trim()) {
        field.style.borderColor = '#e74c3c';
      } else {
        field.style.borderColor = '';
      }
    });

    field.addEventListener('input', () => {
      if (field.style.borderColor === 'rgb(231, 76, 60)') {
        field.style.borderColor = '';
      }
    });
  });

  // Phone number formatting
  const phoneInput = form.querySelector('#phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 10) value = value.slice(0, 10);

      if (value.length >= 6) {
        value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`;
      } else if (value.length >= 3) {
        value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
      }

      e.target.value = value;
    });
  }
}

// ========================================
// SMOOTH SCROLL - With offset for header
// ========================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');

      // Skip if it's just "#"
      if (href === '#') {
        e.preventDefault();
        return;
      }

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Close mobile menu if open
        const mobileMenu = document.querySelector('.mobile-menu');
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        if (mobileMenu && mobileMenu.classList.contains('open')) {
          mobileMenu.classList.remove('open');
          menuToggle.classList.remove('active');
          document.body.classList.remove('menu-open');
        }
      }
    });
  });
}

// ========================================
// PHONE TRACKING - Click-to-call analytics
// ========================================
function initPhoneTracking() {
  document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', () => {
      const phoneNumber = link.getAttribute('href').replace('tel:', '');
      const location = link.dataset.location || 'unknown';

      // Track with analytics (GA4, etc.)
      if (typeof gtag !== 'undefined') {
        gtag('event', 'phone_click', {
          phone_number: phoneNumber,
          location: location
        });
      }

      // Console log for debugging
      console.log(`Phone click tracked: ${phoneNumber} from ${location}`);

      // You can also send to your own analytics endpoint
      // fetch('/api/track-phone-click', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ phone: phoneNumber, location })
      // });
    });
  });
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Add shake animation for errors
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
  }

  .success-message {
    animation: slideDown 0.3s ease-out;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);

// Prevent body scroll when mobile menu is open
const preventScroll = () => {
  const menuOpen = document.body.classList.contains('menu-open');
  if (menuOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
};

// Watch for menu-open class changes
const bodyObserver = new MutationObserver(preventScroll);
bodyObserver.observe(document.body, {
  attributes: true,
  attributeFilter: ['class']
});

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

// Lazy load images (if you add images later)
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ========================================
// ACCESSIBILITY ENHANCEMENTS
// ========================================

// Keyboard navigation for FAQ
document.addEventListener('keydown', (e) => {
  const activeElement = document.activeElement;

  if (activeElement.classList.contains('faq-question')) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      activeElement.click();
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextQuestion = activeElement.parentElement.nextElementSibling?.querySelector('.faq-question');
      if (nextQuestion) nextQuestion.focus();
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevQuestion = activeElement.parentElement.previousElementSibling?.querySelector('.faq-question');
      if (prevQuestion) prevQuestion.focus();
    }
  }
});

// Skip to main content link (for accessibility)
const skipLink = document.createElement('a');
skipLink.href = '#services';
skipLink.textContent = 'Skip to main content';
skipLink.className = 'skip-link';
skipLink.style.cssText = `
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--color-primary);
  color: white;
  padding: 8px;
  text-decoration: none;
  z-index: 100;
`;
skipLink.addEventListener('focus', () => {
  skipLink.style.top = '0';
});
skipLink.addEventListener('blur', () => {
  skipLink.style.top = '-40px';
});
document.body.insertBefore(skipLink, document.body.firstChild);

// ========================================
// CONSOLE MESSAGE
// ========================================
console.log(
  '%c🦁 Lion Cash Advance',
  'color: #0d5c3d; font-size: 24px; font-weight: bold;'
);
console.log(
  '%cDesign System: Forest Finance\nTypography: Newsreader + DM Sans\nColors: Forest Green + Warm Gold',
  'color: #666; font-size: 12px;'
);

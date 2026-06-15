/* =============================================
   INTENT MARKETING — script.js
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

    // ── AOS (carregado de forma não-bloqueante; ignora se falhar) ──
    if (window.AOS) {
        AOS.init({
            duration: 650,
            easing: 'ease-out-cubic',
            once: true,
            offset: 80,
        });
    }

    // ── NAVBAR SCROLL ────────────────────────────
    const navbar = document.getElementById('navbar');
    const onScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // ── HAMBURGER MENU ───────────────────────────
    const hamburger = document.getElementById('hamburger');
    const navMenu   = document.getElementById('navMenu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        navMenu.classList.toggle('open');
        document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
    });

    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            navMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // ── SMOOTH SCROLL ────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
            window.scrollTo({ top: target.offsetTop - navH, behavior: 'smooth' });
        });
    });

    // ── ACTIVE NAV LINK ──────────────────────────
    const sections = document.querySelectorAll('section[id]');
    const navLinks  = document.querySelectorAll('.nav-link');

    const observerNav = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
                });
            }
        });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(s => observerNav.observe(s));

    // ── COUNTER ANIMATION ────────────────────────
    const animateCounter = (el, decimal = false) => {
        const target   = +el.dataset.target;
        const duration = 1800;
        const start    = performance.now();
        const easeOut  = t => 1 - Math.pow(1 - t, 3);

        const tick = (now) => {
            const elapsed  = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const value    = easeOut(progress) * target;
            el.textContent = decimal
                ? (value / 10).toFixed(1).replace('.', ',')
                : Math.floor(value);
            if (progress < 1) requestAnimationFrame(tick);
            else el.textContent = decimal
                ? (target / 10).toFixed(1).replace('.', ',')
                : target;
        };
        requestAnimationFrame(tick);
    };

    const counters = document.querySelectorAll('.hero-counter, .counter');
    const counterObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target, false);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => counterObserver.observe(c));

    const decCounters = document.querySelectorAll('.hero-counter-dec');
    const decObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target, true);
                decObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    decCounters.forEach(c => decObserver.observe(c));

    // ── METRIC BARS ──────────────────────────────
    const barObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.metric-fill').forEach(fill => {
                    fill.classList.add('animated');
                });
                barObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.results-metrics').forEach(el => barObserver.observe(el));

    // ── PORTFOLIO FILTER ─────────────────────────
    const filterBtns   = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            portfolioCards.forEach(card => {
                const match = filter === 'all' || card.dataset.category === filter;
                if (match) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeInUp 0.4s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // ── CONTACT FORM MULTI-STEP ──────────────────
    const form       = document.getElementById('contactForm');
    const submitBtn  = document.getElementById('submitBtn');
    const successMsg = document.getElementById('formSuccess');
    const steps      = form.querySelectorAll('.form-step-container');
    const stepBubbles = form.querySelectorAll('.progress-step');
    const progressFill = document.getElementById('progressFill');
    let currentStep = 1;

    // Handle Card Selection
    form.querySelectorAll('.choice-card').forEach(card => {
        card.addEventListener('click', () => {
            // Find sibling choice-cards in the same step container
            const container = card.closest('.form-step-container');
            container.querySelectorAll('.choice-card').forEach(c => c.classList.remove('selected'));
            
            card.classList.add('selected');
            
            // Save value to hidden input
            const value = card.dataset.value;
            if (container.dataset.step === '1') {
                document.getElementById('selectedChallenge').value = value;
            } else if (container.dataset.step === '2') {
                document.getElementById('selectedBudget').value = value;
            }
        });
    });

    const updateStepsUI = () => {
        // Toggle step containers visibility
        steps.forEach(step => {
            const stepNum = parseInt(step.dataset.step);
            step.classList.toggle('active', stepNum === currentStep);
        });

        // Update progress indicators
        stepBubbles.forEach(bubble => {
            const bubbleNum = parseInt(bubble.dataset.step);
            bubble.classList.toggle('active', bubbleNum <= currentStep);
        });

        // Update progress bar fill
        const progressPercent = ((currentStep) / 3) * 100;
        progressFill.style.width = `${progressPercent}%`;
    };

    // Navigation buttons listeners
    form.querySelectorAll('.next-step').forEach(btn => {
        btn.addEventListener('click', () => {
            if (validateCurrentStep()) {
                currentStep++;
                updateStepsUI();
            } else {
                shakeForm();
            }
        });
    });

    form.querySelectorAll('.prev-step').forEach(btn => {
        btn.addEventListener('click', () => {
            currentStep--;
            updateStepsUI();
        });
    });

    const validateCurrentStep = () => {
        if (currentStep === 1) {
            return !!document.getElementById('selectedChallenge').value;
        } else if (currentStep === 2) {
            return !!document.getElementById('selectedBudget').value;
        }
        return true;
    };

    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', () => {
            let v = phoneInput.value.replace(/\D/g, '').slice(0, 11);
            if (v.length > 6) v = `(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7)}`;
            else if (v.length > 2) v = `(${v.slice(0,2)}) ${v.slice(2)}`;
            else if (v.length > 0) v = `(${v}`;
            phoneInput.value = v;
        });
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name    = document.getElementById('name').value.trim();
        const email   = document.getElementById('email').value.trim();
        const phone   = document.getElementById('phone').value.trim();

        if (!name || !email || !phone) {
            shakeForm();
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            document.getElementById('email').focus();
            return;
        }

        submitBtn.disabled = true;
        submitBtn.querySelector('span').textContent = 'Enviando...';

        await new Promise(r => setTimeout(r, 1200));

        // Reset form steps
        form.querySelectorAll('input, select, textarea').forEach(el => el.value = '');
        form.querySelectorAll('.choice-card').forEach(c => c.classList.remove('selected'));
        
        // Hide steps visual container
        steps.forEach(step => step.style.display = 'none');
        form.querySelector('.form-progress').style.display = 'none';
        
        successMsg.classList.add('visible');
        submitBtn.style.display = 'none';
        form.querySelector('.form-note').style.display = 'none';
    });

    function shakeForm() {
        form.style.animation = 'shake 0.4s ease';
        setTimeout(() => form.style.animation = '', 400);
    }

    // ── CURSOR GLOW (desktop only) ───────────────
    if (window.matchMedia('(pointer: fine)').matches) {
        const glow = document.createElement('div');
        glow.style.cssText = `
            position: fixed; pointer-events: none; z-index: 9999;
            width: 300px; height: 300px; border-radius: 50%;
            background: radial-gradient(circle, rgba(193,68,14,0.06) 0%, transparent 70%);
            transform: translate(-50%, -50%);
            transition: left 0.12s ease, top 0.12s ease;
            will-change: left, top;
        `;
        document.body.appendChild(glow);

        document.addEventListener('mousemove', ({ clientX, clientY }) => {
            glow.style.left = clientX + 'px';
            glow.style.top  = clientY + 'px';
        }, { passive: true });
    }

    // ── SERVICE CARD TILT (subtle) ───────────────
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width  - 0.5;
            const y = (e.clientY - rect.top)  / rect.height - 0.5;
            card.style.transform = `translateY(-4px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // ── ROI CALCULATOR ────────────────────────────
    const investmentRange = document.getElementById('investmentRange');
    const roasRange       = document.getElementById('roasRange');
    const investValue     = document.getElementById('investValue');
    const roasValue       = document.getElementById('roasValue');
    const revenueResult   = document.getElementById('revenueResult');
    const profitResult    = document.getElementById('profitResult');

    const updateCalculator = () => {
        const investment = parseFloat(investmentRange.value);
        const roas       = parseFloat(roasRange.value);
        
        const revenue = investment * roas;
        const profit  = revenue - investment;

        investValue.textContent = investment.toLocaleString('pt-BR');
        roasValue.textContent = roas.toFixed(1).replace('.', ',');
        revenueResult.textContent = Math.round(revenue).toLocaleString('pt-BR');
        profitResult.textContent = Math.round(profit).toLocaleString('pt-BR');
    };

    if (investmentRange && roasRange) {
        investmentRange.addEventListener('input', updateCalculator);
        roasRange.addEventListener('input', updateCalculator);
        updateCalculator();
    }

});

/* ── GLOBAL KEYFRAMES ─────────────────────────── */
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(16px); }
        to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20%       { transform: translateX(-8px); }
        40%       { transform: translateX(8px); }
        60%       { transform: translateX(-5px); }
        80%       { transform: translateX(5px); }
    }
    .nav-link.active { color: white !important; }
`;
document.head.appendChild(style);

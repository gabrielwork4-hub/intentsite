/* =============================================
   INTENT MARKETING — blog-script.js
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

    // ── NAVBAR SCROLL ────────────────────────────
    const navbar = document.getElementById('navbar');
    if (navbar) {
        const onScroll = () => {
            navbar.classList.toggle('scrolled', window.scrollY > 20);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    // ── HAMBURGER MENU ───────────────────────────
    const hamburger = document.getElementById('hamburger');
    const navMenu   = document.getElementById('navMenu');

    if (hamburger && navMenu) {
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
    }

    // ── READING PROGRESS INDICATOR ────────────────
    const progressBar = document.getElementById('readingProgress');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        }, { passive: true });
    }

    // ── CATEGORY FILTER & SEARCH (Blog Home) ──────
    const filterButtons = document.querySelectorAll('.blog-filter-btn');
    const blogCards    = document.querySelectorAll('.post-card');
    const searchInput  = document.getElementById('blogSearch');

    let activeCategory = 'all';
    let searchQuery    = '';

    const filterPosts = () => {
        blogCards.forEach(card => {
            const category = card.dataset.category;
            const title    = card.querySelector('h3').textContent.toLowerCase();
            const excerpt  = card.querySelector('.post-excerpt').textContent.toLowerCase();

            const matchesCategory = activeCategory === 'all' || category === activeCategory;
            const matchesSearch   = title.includes(searchQuery) || excerpt.includes(searchQuery);

            if (matchesCategory && matchesSearch) {
                card.classList.remove('hidden');
                card.style.display = 'flex';
            } else {
                card.classList.add('hidden');
                card.style.display = 'none';
            }
        });
    };

    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                activeCategory = btn.dataset.category;
                filterPosts();
            });
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase().trim();
            filterPosts();
        });
    }
});

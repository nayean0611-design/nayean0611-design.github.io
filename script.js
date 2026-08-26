/* ══════════════════════════════════════════════════════════════
   포트폴리오 웹사이트 템플릿  —  script.js
   ══════════════════════════════════════════════════════════════
   기능 4가지
     ① 모바일 메뉴 열고 닫기
     ② 스크롤 위치에 따라 현재 메뉴 강조
     ③ 스크롤하면 섹션이 부드럽게 나타나기
     ④ 맨 위로 버튼 · 푸터 연도 자동 표시
   ══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {

    /* ── ① 모바일 메뉴 ─────────────────────────── */
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');

    if (toggle && nav) {
        toggle.addEventListener('click', function () {
            const opened = nav.classList.toggle('open');
            toggle.classList.toggle('open', opened);
            toggle.setAttribute('aria-expanded', String(opened));
        });

        // 메뉴 항목을 누르면 자동으로 닫기
        nav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                nav.classList.remove('open');
                toggle.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    /* ── ② 현재 보고 있는 섹션 메뉴 강조 ───────── */
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.nav a');

    if (sections.length && navLinks.length) {
        const spy = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) return;
                    const id = entry.target.id;
                    navLinks.forEach(function (link) {
                        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
                    });
                });
            },
            // 화면 중앙 부근에 들어온 섹션을 '현재 섹션'으로 판단
            { rootMargin: '-45% 0px -50% 0px' }
        );
        sections.forEach(function (section) { spy.observe(section); });
    }

    /* ── ③ 스크롤 등장 효과 ────────────────────── */
    const revealTargets = document.querySelectorAll('.reveal');

    if (revealTargets.length) {
        const revealer = new IntersectionObserver(
            function (entries, observer) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // 한 번만 실행
                });
            },
            { threshold: 0.12 }
        );
        revealTargets.forEach(function (el) { revealer.observe(el); });
    }

    /* ── ④-1 맨 위로 버튼 ──────────────────────── */
    const toTop = document.querySelector('.to-top');

    if (toTop) {
        window.addEventListener('scroll', function () {
            toTop.classList.toggle('show', window.scrollY > 400);
        });
        toTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ── ④-2 푸터 연도 자동 표시 ───────────────── */
    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();

});
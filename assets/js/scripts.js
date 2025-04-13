document.addEventListener("DOMContentLoaded", () => {
  // Gestion du logo pour recharger la frame homefr.html
  const logo = document.getElementById('logo-frame');
  const frame = document.getElementById('content-frame');

  if (logo) {
    logo.addEventListener('click', async (e) => {
      e.preventDefault(); // Empêche la redirection par défaut
      const url = logo.getAttribute('data-src');
      if (!url) return;

      // Animation de disparition
      frame.style.transition = 'opacity 0.8s ease';
      frame.style.opacity = 0;

      setTimeout(async () => {
        frame.innerHTML = '<div class="loader">Chargement...</div>';
        try {
          const res = await fetch(url, { cache: 'no-store' });
          const html = await res.text();
          frame.innerHTML = html;
          frame.style.opacity = 1;
          window.scrollTo({ top: frame.offsetTop - 80, behavior: 'smooth' });  // Scroll vers le haut de la frame
        } catch {
          frame.innerHTML = '<p class="text-center text-red-500">Contenu introuvable.</p>';
          frame.style.opacity = 1;
        }
      }, 800);
    });
  }

  // Code pour gérer le menu burger mobile
  const mobileToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      mobileMenu.classList.toggle('transition-all'); // Transition fluide
    });

    document.querySelectorAll('#mobile-menu a').forEach(link => {
      link.addEventListener('click', async (e) => {
        e.preventDefault(); // Empêcher la redirection par défaut
        const url = link.getAttribute('href');
        frame.classList.remove('loaded');
        frame.innerHTML = '<div class="loader">Chargement...</div>';

        try {
          const res = await fetch(url);  // Charger la page dans la frame
          const html = await res.text();
          setTimeout(() => {
            frame.innerHTML = html;
            frame.classList.add('loaded');
            window.scrollTo({ top: frame.offsetTop - 80, behavior: 'smooth' });
          }, 300);

        } catch {
          frame.innerHTML = '<p class="text-center text-red-500">Contenu introuvable.</p>';
        }
      });
    });
  }

  // Code pour gérer les autres liens du menu
  const menuLinks = document.querySelectorAll('header a[href$=".html"]');

  const emojiMap = {
    'Studio': '📸',
    'Brand': '💼',
    'Partenariat': '🤝',
    'Contact': '✉️'
  };

  menuLinks.forEach(link => {
    const span = link.querySelector('.link-text');
    const original = span.textContent;

    link.addEventListener('mouseover', () => {
      span.textContent = emojiMap[original] || original;
    });

    link.addEventListener('mouseout', () => {
      span.textContent = original;
    });

    link.addEventListener('click', async (e) => {
      e.preventDefault(); // Empêcher la redirection par défaut
      const url = link.getAttribute('href');
      frame.classList.remove('loaded');
      frame.innerHTML = '<div class="loader">Chargement...</div>';

      try {
        const res = await fetch(url);  // Charger la page dans la frame
        const html = await res.text();
        setTimeout(() => {
          frame.innerHTML = html;
          frame.classList.add('loaded');
          window.scrollTo({ top: frame.offsetTop - 80, behavior: 'smooth' });
        }, 300);

      } catch {
        frame.innerHTML = '<p class="text-center text-red-500">Contenu introuvable.</p>';
      }
    });
  });
});
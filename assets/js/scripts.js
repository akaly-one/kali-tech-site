// Assure-toi que le DOM est chargé avant d'ajouter des événements
document.addEventListener("DOMContentLoaded", () => {
    // Gestion du logo pour recharger la frame homefr.html
    const logo = document.getElementById('logo-frame');
    const frame = document.getElementById('content-frame');
  
    if (logo) {
      logo.addEventListener('click', async (e) => {
        e.preventDefault();
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
          } catch {
            frame.innerHTML = '<p class="text-center text-red-500">Contenu introuvable.</p>';
            frame.style.opacity = 1;
          }
        }, 800);
      });
    }
  
    // Code pour gérer le menu burger
    const mobileToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
  
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  
    document.querySelectorAll('#mobile-menu a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  });
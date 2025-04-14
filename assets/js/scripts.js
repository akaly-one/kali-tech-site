document.addEventListener("DOMContentLoaded", () => {
  const frame = document.getElementById('content-frame');
  const menuLinks = document.querySelectorAll('header a[href$=".html"]');
  const logo = document.getElementById('logo-frame');

  // Fonction pour appliquer l'effet aura au logo de manière constante
  const applyAuraEffect = () => {
    logo.style.transition = 'all 0.5s ease-in-out';
    logo.style.animation = 'logoAura 2s infinite alternate';
  };

  // Appliquer l'effet aura immédiatement au chargement de la page
  if (logo) {
    applyAuraEffect();
  }

  // Fonction pour charger une page dans la frame
  const loadPageInFrame = async (url) => {
    frame.classList.remove('loaded');
    frame.innerHTML = '<div class="loader">Chargement...</div>';
    
    try {
      const res = await fetch(url);
      const html = await res.text();
      setTimeout(() => {
        frame.innerHTML = html;
        frame.classList.add('loaded');
        window.scrollTo({ top: frame.offsetTop - 80, behavior: 'smooth' });
      }, 300);
    } catch {
      frame.innerHTML = '<p class="text-center text-red-500">Contenu introuvable.</p>';
    }
  };

  // Ajout d'événement pour chaque lien du menu
  menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault(); // Empêche la redirection par défaut
      const url = link.getAttribute('href');
      loadPageInFrame(url); // Charge la page dans la frame
    });
  });

  // Gestion du logo
  if (logo) {
    logo.addEventListener('click', async (e) => {
      e.preventDefault();
      const url = 'Frames/hfr.html'; // Lien vers la page d'accueil
      loadPageInFrame(url); // Charge la page d'accueil dans la frame
    });
  }

  // Menu mobile : gestion de l'affichage du menu
  const mobileToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      mobileMenu.classList.toggle('transition-all'); // Transition fluide
    });

    document.querySelectorAll('#mobile-menu a').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault(); // Empêcher la redirection par défaut
        const url = link.getAttribute('href');
        loadPageInFrame(url); // Charger la page dans la frame
        mobileMenu.classList.add('hidden'); // Fermer le menu mobile après clic
      });
    });
  }
});

// Animation d'aura simplifiée sur le logo
const style = document.createElement('style');
style.innerHTML = `
  @keyframes logoAura {
    0% {
      text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
    }
    50% {
      text-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
    }
    100% {
      text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
    }
  }
`;

document.head.appendChild(style);
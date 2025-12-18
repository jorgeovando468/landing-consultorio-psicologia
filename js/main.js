// Configuración editable del sitio
const SITE_CONFIG = {
  businessName: "Equilibrio Interior",
  professionalName: "Lic. Alicia Villasanti Torres",
  license: "Reg. Prof. 11.502",
  tagline: "Un espacio seguro, confidencial y humano.",
  primaryColor: "#97C3C3",
  address: '<a href="https://maps.app.goo.gl/uoW9rjbRDkwwLZLv9" target="_blank" rel="noopener">Ver ubicación en Google Maps</a>',
  hours: "Lun a Vie 09:00–18:00",
  email: "alitorresvilla@hotmail.com",
  phone: "0983405108",
  services: [
    { title: 'Terapia individual', description: 'Acompañamiento personalizado para tu bienestar emocional.' },
    { title: 'Terapia de pareja', description: 'Trabajamos la comunicación y la relación en pareja.' },
    { title: 'Terapia familiar', description: 'Apoyo en dinámicas familiares y resolución de conflictos.' },
    { title: 'Ansiedad y estrés', description: 'Estrategias prácticas para manejar la ansiedad y el estrés.' },
    { title: 'Autoestima', description: 'Fortalecimiento de la autopercepción y la confianza.' },
    { title: 'Orientación vocacional', description: 'Acompañamiento para decisiones vocacionales y profesionales.' }
  ],
  whatsappNumber: "595983405108",
  whatsappMessage: "Hola, soy Alicia. Quisiera agendar una consulta psicológica. ¿Tienen horarios disponibles?",
  instagram: "https://www.instagram.com/equilibriointerior_consultorio?igsh=MWtoamNwMTF6Njd5cw==",
  facebook: "https://www.facebook.com/share/17t9n1qVTD/"
};

// main.js — comportamiento mínimo para la landing
document.addEventListener('DOMContentLoaded', function () {
  console.log('main.js cargado correctamente.');

  // Inyectar color primario en :root
  try { document.documentElement.style.setProperty('--primary', SITE_CONFIG.primaryColor || ''); } catch (err) {}

  // Reemplazos dinámicos: nombre del negocio
  var brandNameEl = document.querySelector('.brand-name');
  if (brandNameEl) brandNameEl.textContent = SITE_CONFIG.businessName;
  

  // Hero: título y subtítulo
  var heroTitle = document.querySelector('#hero h1');
  var heroLead = document.querySelector('#hero .lead');
  if (heroTitle) heroTitle.textContent = SITE_CONFIG.businessName;
  if (heroLead) heroLead.textContent = SITE_CONFIG.tagline;

  // Profesional
  var profName = document.querySelector('#profesional h3');
  var profLicense = document.querySelector('#profesional .license');
  var profFocus = document.querySelector('#profesional .focus');
  if (!profName) profName = document.querySelector('.profile-meta h3');
  if (!profLicense) profLicense = document.querySelector('.profile-meta .license');
  if (profName) profName.textContent = SITE_CONFIG.professionalName;
  if (profLicense) profLicense.textContent = 'Matrícula: ' + SITE_CONFIG.license;
  if (profFocus && profFocus.textContent.trim() === '') profFocus.textContent = SITE_CONFIG.tagline;
  

  // Ubicación + horarios
  var locAddr = document.querySelector('.location-info p strong');
  var locInfo = document.querySelector('.location-info');
  if (locInfo) {
    var as = locInfo.querySelectorAll('p');
    if (as && as[0]) as[0].innerHTML = '<strong>Dirección:</strong> ' + SITE_CONFIG.address;
    if (as && as[1]) as[1].innerHTML = '<strong>Horarios:</strong> ' + SITE_CONFIG.hours;
  }

  // Footer email
  var footerEmail = document.querySelector('.site-footer');
  if (footerEmail) {
    footerEmail.querySelectorAll('p').forEach(function (p) {
      if (p.textContent.includes('Email:')) {
        p.innerHTML = 'Tel: ' + (SITE_CONFIG.phone || '—') + ' • Email: ' + SITE_CONFIG.email;
      }
    });
  }

  // Render servicios dinámicamente
  var servicesGrid = document.querySelector('.services-grid');
  if (servicesGrid && Array.isArray(SITE_CONFIG.services)) {
    servicesGrid.innerHTML = '';
    SITE_CONFIG.services.forEach(function (s) {
      var card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = '<h3>' + (s.title || '') + '</h3>' + (s.description ? ('<p>' + s.description + '</p>') : '');
      servicesGrid.appendChild(card);
    });
  }

  // Toggle menú móvil
  var navToggle = document.querySelector('.nav-toggle');
  var mainNav = document.querySelector('.main-nav');
  if (navToggle && mainNav) {
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.addEventListener('click', function () {
      var isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    // cerrar menú al hacer click en un enlace
    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (mainNav.classList.contains('open')) {
          mainNav.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
    // cerrar con Escape
    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape' && mainNav.classList.contains('open')) {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  // Form: validaciones y mostrar estado; permitir envío normal a FormSubmit solo si es válido
  var form = document.getElementById('contact-form');
  if (form) {
    var statusEl = document.getElementById('form-status');
    var submitBtn = form.querySelector('button[type="submit"]');

    function setFieldError(field, message) {
      if (!field) return;
      field.classList.add('input-error');
      var label = field.closest('label');
      if (!label) label = field.parentElement;
      var err = label.querySelector('.error-message');
      if (!err) {
        err = document.createElement('div');
        err.className = 'error-message';
        label.appendChild(err);
      }
      err.textContent = message;
    }

    function clearFieldError(field) {
      if (!field) return;
      field.classList.remove('input-error');
      var label = field.closest('label');
      if (!label) label = field.parentElement;
      var err = label.querySelector('.error-message');
      if (err) err.textContent = '';
    }

    // limpiar errores al modificar campos
    ['input', 'change'].forEach(function (ev) {
      form.querySelectorAll('input, textarea, select').forEach(function (el) {
        el.addEventListener(ev, function () { clearFieldError(el); if (statusEl) statusEl.textContent = ''; });
      });
    });

    form.addEventListener('submit', function (e) {
      // validaciones
      var telefono = form.querySelector('[name="telefono"]');
      var email = form.querySelector('[name="email"]');
      var valid = true;

      // Email: requerido y válido (HTML validity)
      if (!email || !email.value.trim()) {
        valid = false;
        setFieldError(email, 'El email es requerido.');
      } else if (!email.checkValidity()) {
        valid = false;
        setFieldError(email, 'Introduce un email válido.');
      }

      // Teléfono: si hay valor, debe ser solo dígitos y longitud 7-15
      if (telefono && telefono.value.trim()) {
        var tel = telefono.value.trim();
        if (!/^\d{7,15}$/.test(tel)) {
          valid = false;
          setFieldError(telefono, 'Teléfono inválido. Solo dígitos (7-15).');
        }
      }

      if (!valid) {
        e.preventDefault();
        // focus al primer campo con error
        var firstErr = form.querySelector('.input-error');
        if (firstErr) firstErr.focus();
        if (statusEl && !statusEl.textContent) statusEl.textContent = 'Corrige los errores del formulario.';
        return;
      }

      // Si es válido: mostrar estado y dejar que el envío proceda normalmente
      if (statusEl) statusEl.textContent = 'Enviando…';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.dataset._orig = submitBtn.textContent;
        submitBtn.textContent = 'Enviando…';
      }

      // Nota: no hacemos preventDefault para permitir que FormSubmit procese el POST
    });
  }

  /* ----- Smooth scroll para enlaces internos ----- */
  var header = document.querySelector('.site-header');
  function getHeaderOffset() {
    return header ? header.getBoundingClientRect().height + 12 : 12;
  }

  function smoothScrollTo(hash) {
    if (!hash) return;
    var id = hash.replace(/^#/, '');
    var target = document.getElementById(id);
    if (!target) return;
    var top = window.pageYOffset + target.getBoundingClientRect().top - getHeaderOffset();
    window.scrollTo({ top: top, behavior: 'smooth' });
  }

  // Intercept links that point to internal anchors
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      // If it's an internal link (same page)
      if (href.charAt(0) === '#') {
        e.preventDefault();
        smoothScrollTo(href);
        // update URL hash without jumping
        history.pushState(null, '', href);
      }
    });
  });

  /* ----- Active menu item usando IntersectionObserver ----- */
  var navLinks = Array.from(document.querySelectorAll('.main-nav a'));
  var sections = Array.from(document.querySelectorAll('main section[id]'));

  if (sections.length && navLinks.length) {
    var observerOptions = {
      root: null,
      rootMargin: '-40% 0% -40% 0%',
      threshold: [0, 0.25, 0.5, 0.75, 1]
    };

    var activeId = null;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          activeId = entry.target.id;
        }
      });
      if (activeId) {
        navLinks.forEach(function (link) {
          try {
            var href = link.getAttribute('href');
            if (!href) return;
            if (href.replace(/^#/, '') === activeId) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          } catch (err) { /* ignore */ }
        });
      }
    }, observerOptions);

    sections.forEach(function (sec) { observer.observe(sec); });
  }

  // Evitar que al recargar la página se haga scroll automático a un hash previo.
  if (location.hash) {
    // Forzar inicio en la parte superior y eliminar el hash de la URL.
    try { window.scrollTo(0, 0); } catch (e) {}
    try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {}
  }

  /* ----- Configuración WhatsApp (desde SITE_CONFIG) ----- */
  var WHATSAPP_NUMBER = SITE_CONFIG.whatsappNumber || '';
  var WHATSAPP_MESSAGE = SITE_CONFIG.whatsappMessage || '';

  function buildWhatsAppUrl(number, message) {
    return 'https://wa.me/' + encodeURIComponent(number) + '?text=' + encodeURIComponent(message);
  }

  function disableAnchor(a, reason) {
    a.classList.add('disabled');
    a.setAttribute('aria-disabled', 'true');
    a.addEventListener('click', function (e) {
      e.preventDefault();
      alert(reason || 'WhatsApp no está configurado.');
    });
  }

  var waSelectors = 'a[href*="wa.me"], .whatsapp-float';
  var waAnchors = Array.from(document.querySelectorAll(waSelectors));

  var invalidNumber = !WHATSAPP_NUMBER || WHATSAPP_NUMBER.trim() === '' || WHATSAPP_NUMBER.indexOf('X') !== -1;
  if (invalidNumber) {
    waAnchors.forEach(function (a) { disableAnchor(a, 'WhatsApp no configurado correctamente.'); });
    console.warn('WhatsApp number invalid or not set:', WHATSAPP_NUMBER);
  } else {
    var waUrl = buildWhatsAppUrl(WHATSAPP_NUMBER, WHATSAPP_MESSAGE);
    waAnchors.forEach(function (a) {
      try { a.setAttribute('href', waUrl); } catch (err) { /* ignore */ }
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener');
    });
  }

});



/**
 * MAMMA MIA PIZZA - LÓGICA FRONTEND VANILLA
 * Arquitectura modular sin frameworks externos.
 * Cumplimiento de accesibilidad, eventos de catálogo y flujo de despacho ítem por ítem.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNavigation();
  initDynamicPricing();
  initCatalogSorting();
  initOrderModal();
  initFeedbackForm();
});

/* ==========================================================================
   1. NAVEGACIÓN MÓVIL Y CONTROL ARIA
   ========================================================================== */
function initMobileNavigation() {
  const toggleBtn = document.getElementById('menu-toggle');
  const primaryNav = document.getElementById('primary-nav');
  const navLinks = primaryNav.querySelectorAll('.nav-link');

  if (!toggleBtn || !primaryNav) return;

  function toggleMenu(isOpen) {
    toggleBtn.setAttribute('aria-expanded', String(isOpen));
    toggleBtn.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
    primaryNav.classList.toggle('is-open', isOpen);
  }

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleMenu(!isExpanded);
  });

  // Cerrar al pulsar un enlace de ancla
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (primaryNav.classList.contains('is-open')) {
        toggleMenu(false);
      }
    });
  });

  // Cerrar con la tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && primaryNav.classList.contains('is-open')) {
      toggleMenu(false);
      toggleBtn.focus();
    }
  });
}

/* ==========================================================================
   2. CÁLCULO DINÁMICO DE PRECIOS POR TAMAÑO (COP)
   ========================================================================== */
function formatCOP(amount) {
  return `$ ${Number(amount).toLocaleString('es-CO')} COP`;
}

function initDynamicPricing() {
  const cards = document.querySelectorAll('.pizza-card');

  cards.forEach((card) => {
    const radioInputs = card.querySelectorAll('input[type="radio"]');
    const priceAmountEl = card.querySelector('.price-amount');

    radioInputs.forEach((radio) => {
      radio.addEventListener('change', (e) => {
        if (e.target.checked) {
          const selectedPrice = e.target.getAttribute('data-price');
          card.setAttribute('data-current-price', selectedPrice);
          priceAmountEl.textContent = formatCOP(selectedPrice);
        }
      });
    });
  });
}

/* ==========================================================================
   3. ORDENACIÓN REACTIVA DEL CATÁLOGO EN EL DOM
   ========================================================================== */
function initCatalogSorting() {
  const sortSelect = document.getElementById('sort-selector');
  const grid = document.getElementById('products-grid');

  if (!sortSelect || !grid) return;

  sortSelect.addEventListener('change', (e) => {
    const criteria = e.target.value;
    const cards = Array.from(grid.querySelectorAll('.pizza-card'));

    cards.sort((cardA, cardB) => {
      const priceA = parseFloat(
        cardA.getAttribute('data-current-price') || '0',
      );
      const priceB = parseFloat(
        cardB.getAttribute('data-current-price') || '0',
      );
      const popA = parseInt(cardA.getAttribute('data-popularity') || '0', 10);
      const popB = parseInt(cardB.getAttribute('data-popularity') || '0', 10);

      switch (criteria) {
        case 'price-desc':
          return priceB - priceA;
        case 'price-asc':
          return priceA - priceB;
        case 'popularity':
          return popB - popA;
        case 'availability':
          return cardA.getAttribute('data-available') === 'true' ? -1 : 1;
        default:
          return 0;
      }
    });

    // Reinsertar las tarjetas ordenadas en el DOM
    cards.forEach((card) => grid.appendChild(card));
  });
}

/* ==========================================================================
   4. MODAL NATIVO (<dialog>) DE PEDIDO ÍTEM POR ÍTEM
   ========================================================================== */
function initOrderModal() {
  const modal = document.getElementById('order-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const modalTitle = document.getElementById('modal-pizza-title');
  const modalSizeText = document.getElementById('modal-size-text');
  const modalPriceText = document.getElementById('modal-price-text');
  const orderForm = document.getElementById('order-form');
  const orderStatus = document.getElementById('order-status');
  const orderButtons = document.querySelectorAll('.btn-order');

  let activeTriggerButton = null;

  if (!modal) return;

  // Abrir modal con los datos exactos del ítem seleccionado
  orderButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      activeTriggerButton = e.currentTarget;
      const card = btn.closest('.pizza-card');
      const pizzaName = card.getAttribute('data-name');
      const checkedRadio = card.querySelector('input[type="radio"]:checked');
      const selectedPrice = checkedRadio.getAttribute('data-price');
      const sizeLabelText =
        checkedRadio.parentElement.querySelector('span').textContent;

      modalTitle.textContent = pizzaName;
      modalSizeText.textContent = sizeLabelText;
      modalPriceText.textContent = formatCOP(selectedPrice);

      orderStatus.style.display = 'none';
      orderForm.reset();
      clearOrderErrors();

      // Uso de la API nativa de HTML5 dialog
      if (typeof modal.showModal === 'function') {
        modal.showModal();
      } else {
        modal.setAttribute('open', '');
      }
    });
  });

  function closeModal() {
    if (typeof modal.close === 'function') {
      modal.close();
    } else {
      modal.removeAttribute('open');
    }
    if (activeTriggerButton) {
      activeTriggerButton.focus();
    }
  }

  closeBtn.addEventListener('click', closeModal);

  // Cerrar al hacer clic en el backdrop exterior del diálogo
  modal.addEventListener('click', (e) => {
    const dialogDimensions = modal.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      closeModal();
    }
  });

  // Procesar formulario de entrega dentro del modal
  orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearOrderErrors();

    const addressInput = document.getElementById('order-address');
    const phoneInput = document.getElementById('order-phone');
    let isValid = true;

    if (!addressInput.value.trim()) {
      showError(
        'address-error',
        'Por favor ingresa tu dirección para la entrega.',
      );
      isValid = false;
    }

    if (!phoneInput.value.trim() || phoneInput.value.trim().length < 7) {
      showError(
        'phone-error',
        'Ingresa un número telefónico de contacto válido.',
      );
      isValid = false;
    }

    if (!isValid) return;

    // Confirmación inmediata en pantalla
    orderStatus.className = 'modal-status success';
    orderStatus.textContent = `¡Excelente! Tu pedido de ${modalTitle.textContent} (${modalSizeText.textContent}) ha sido confirmado para despacho inmediato a: ${addressInput.value.trim()}.`;

    setTimeout(() => {
      closeModal();
    }, 3500);
  });

  function clearOrderErrors() {
    document.getElementById('address-error').textContent = '';
    document.getElementById('phone-error').textContent = '';
  }
}

/* ==========================================================================
   5. VALIDACIÓN DEL FORMULARIO DE FEEDBACK
   ========================================================================== */
function initFeedbackForm() {
  const form = document.getElementById('feedback-form');
  const statusEl = document.getElementById('feedback-status');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearFeedbackErrors();

    const nameInput = document.getElementById('feedback-name');
    const contactInput = document.getElementById('feedback-contact');
    const messageInput = document.getElementById('feedback-message');
    let isValid = true;

    if (!nameInput.value.trim()) {
      showError('name-error', 'Por favor ingresa tu nombre.');
      isValid = false;
    }

    if (!contactInput.value.trim()) {
      showError('contact-error', 'Por favor ingresa un correo o teléfono.');
      isValid = false;
    }

    if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
      showError(
        'message-error',
        'El mensaje debe tener al menos 10 caracteres.',
      );
      isValid = false;
    }

    if (!isValid) return;

    // Notificación accesible de éxito
    statusEl.className = 'form-status success';
    statusEl.textContent =
      '¡Gracias por tus comentarios! Hemos recibido tu mensaje con éxito.';
    form.reset();

    setTimeout(() => {
      statusEl.style.display = 'none';
    }, 5000);
  });

  function clearFeedbackErrors() {
    document.getElementById('name-error').textContent = '';
    document.getElementById('contact-error').textContent = '';
    document.getElementById('message-error').textContent = '';
  }
}

function showError(elementId, message) {
  const target = document.getElementById(elementId);
  if (target) {
    target.textContent = message;
  }
}

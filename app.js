/* ============================================
   Balanced Body x Cylindo Demo - Interactivity
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Color Swatch Selection ----
  const colorSwatches = document.querySelectorAll('.color-swatch');
  const colorNameDisplay = document.getElementById('selected-color-name');
  const viewer = document.querySelector('cylindo-viewer');

  colorSwatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      // Update active state
      colorSwatches.forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');

      // Update color name display
      const colorName = swatch.getAttribute('data-color');
      colorNameDisplay.textContent = colorName;

      // Update Cylindo viewer features (if supported by the product config)
      // The feature name/value depends on how the product is set up in Cylindo CMS
      // Example: viewer.setAttribute('features', `UPHOLSTERY:${colorName.toUpperCase()}`);
      // Uncomment and adjust the line above once you know the exact feature names
      // from your Cylindo CMS configuration for this product.
      if (viewer) {
        try {
          // Try setting features - adjust feature key to match your CMS setup
          viewer.features = { 'UPHOLSTERY': colorName.toUpperCase().replace(/\s+/g, '_') };
        } catch (e) {
          console.log('Cylindo feature update:', colorName, '- adjust feature mapping in app.js');
        }
      }
    });
  });

  // ---- Style Selector ----
  const styleBtns = document.querySelectorAll('.style-btn');
  styleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      styleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // ---- Spring Selector ----
  const springBtns = document.querySelectorAll('.spring-btn');
  springBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      springBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // ---- Quantity Controls ----
  const qtyInput = document.getElementById('qty-input');
  const qtyMinus = document.getElementById('qty-minus');
  const qtyPlus = document.getElementById('qty-plus');

  qtyMinus.addEventListener('click', () => {
    const val = parseInt(qtyInput.value) || 1;
    if (val > 1) qtyInput.value = val - 1;
  });

  qtyPlus.addEventListener('click', () => {
    const val = parseInt(qtyInput.value) || 1;
    if (val < 99) qtyInput.value = val + 1;
  });

  // ---- Add to Cart (demo) ----
  const addToCartBtn = document.querySelector('.add-to-cart-btn');
  const cartCount = document.querySelector('.cart-count');

  addToCartBtn.addEventListener('click', () => {
    const qty = parseInt(qtyInput.value) || 1;
    const current = parseInt(cartCount.textContent) || 0;
    cartCount.textContent = current + qty;

    // Button animation
    addToCartBtn.textContent = 'Added!';
    addToCartBtn.style.background = '#2d6a4f';
    setTimeout(() => {
      addToCartBtn.textContent = 'Add to Cart';
      addToCartBtn.style.background = '';
    }, 1500);
  });

  // ---- Smooth FAQ animation ----
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const summary = item.querySelector('summary');
    summary.addEventListener('click', (e) => {
      // Close other open FAQs
      faqItems.forEach(other => {
        if (other !== item && other.hasAttribute('open')) {
          other.removeAttribute('open');
        }
      });
    });
  });

});

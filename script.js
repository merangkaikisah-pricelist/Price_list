/**
 * MERANGKAI KISAH - PHOTOGRAPHY PRICE LIST & PORTFOLIO (STANDALONE VANILLA JS)
 */

document.addEventListener("DOMContentLoaded", () => {
  const categoryTabs = document.getElementById("categoryTabs");
  const tabIndicator = document.getElementById("tabIndicator");

  // Lightbox Elements
  const lightboxModal = document.getElementById("lightboxModal");
  const lightboxBackdrop = document.getElementById("lightboxBackdrop");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxClose = document.getElementById("lightboxClose");
  const lightboxPrev = document.getElementById("lightboxPrev");
  const lightboxNext = document.getElementById("lightboxNext");

  let activeLightboxIndex = 0;

  // Portfolio items array for Lightbox viewer
  const portfolioItems = [
    {
      image_path: 'asset/cerita_left.jpg',
      title: 'The Graceful Bride',
      description: 'Dokumentasi momen manis keanggunan busana pengantin.'
    },
    {
      image_path: 'asset/cerita_center.jpg',
      title: 'The Sacred Vows',
      description: 'Momen sakral pengucapan janji suci pernikahan.'
    },
    {
      image_path: 'asset/cerita_right.jpg',
      title: 'The Warm Lantern',
      description: 'Kehangatan cahaya dalam perayaan cinta bahagia.'
    }
  ];

  // Default active tab
  let currentCategory = "wedding";
  setCategory(currentCategory);

  // Price List Category Tab Click Handler
  if (categoryTabs) {
    categoryTabs.addEventListener("click", (e) => {
      const btn = e.target.closest(".tab-btn");
      if (btn) {
        const category = btn.getAttribute("data-category");
        if (category) setCategory(category);
      }
    });
    window.addEventListener("resize", updateTabIndicator);
  }

  function setCategory(categorySlug) {
    currentCategory = categorySlug;

    if (categoryTabs) {
      const tabs = categoryTabs.querySelectorAll(".tab-btn");
      tabs.forEach((tab) => {
        if (tab.getAttribute("data-category") === categorySlug) {
          tab.classList.add("active");
        } else {
          tab.classList.remove("active");
        }
      });
    }

    updateTabIndicator();
    filterPackageCards(categorySlug);
  }

  function updateTabIndicator() {
    if (!categoryTabs || !tabIndicator) return;
    const activeTab = categoryTabs.querySelector(".tab-btn.active");
    if (activeTab) {
      tabIndicator.style.left = `${activeTab.offsetLeft}px`;
      tabIndicator.style.width = `${activeTab.offsetWidth}px`;
    }
  }

  function filterPackageCards(categorySlug) {
    const cards = document.querySelectorAll(".pricing-card");
    cards.forEach((card) => {
      if (card.classList.contains(`category-group-${categorySlug}`)) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  }

  // Lightbox Click Event on Portfolio Photos
  const galleryCards = document.querySelectorAll(".photo-card");
  galleryCards.forEach((card) => {
    card.addEventListener("click", () => {
      const idx = parseInt(card.getAttribute("data-index"), 10);
      showLightbox(idx);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener("click", closeLightbox);

  if (lightboxPrev) {
    lightboxPrev.addEventListener("click", () => {
      if (portfolioItems.length === 0) return;
      activeLightboxIndex = (activeLightboxIndex - 1 + portfolioItems.length) % portfolioItems.length;
      updateLightboxContent();
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener("click", () => {
      if (portfolioItems.length === 0) return;
      activeLightboxIndex = (activeLightboxIndex + 1) % portfolioItems.length;
      updateLightboxContent();
    });
  }

  function showLightbox(index) {
    if (isNaN(index) || index < 0 || index >= portfolioItems.length) return;
    activeLightboxIndex = index;
    updateLightboxContent();
    if (lightboxModal) {
      lightboxModal.classList.add("active");
      lightboxModal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
  }

  function updateLightboxContent() {
    const item = portfolioItems[activeLightboxIndex];
    if (!item) return;

    if (lightboxImg) {
      lightboxImg.src = item.image_path;
      lightboxImg.alt = item.title;
    }
    if (lightboxCaption) {
      lightboxCaption.innerHTML = `<h4 class="lightbox-title" style="color: #ffffff; font-family: 'Cinzel', serif; margin-bottom: 4px;">${escapeHtml(item.title)}</h4><p class="lightbox-desc" style="color: rgba(255,255,255,0.7); font-size: 0.85rem;">${escapeHtml(item.description)}</p>`;
    }
  }

  function closeLightbox() {
    if (lightboxModal) {
      lightboxModal.classList.remove("active");
      lightboxModal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
});

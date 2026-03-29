document.addEventListener("DOMContentLoaded", function () {
  // Background Slider
  const slides = document.querySelectorAll(".bg-slide");
  let current = 0;

  if (slides.length > 0) {
    setInterval(() => {
      slides[current].classList.remove("active");
      current = (current + 1) % slides.length;
      slides[current].classList.add("active");
    }, 4000);
  }

  // Анимация появления элементов
  const elements = document.querySelectorAll(
    ".nav a, .page, .post, .logo, .footer, .back",
  );

  elements.forEach(function (el) {
    el.classList.add("fade-in");
  });

  setTimeout(function () {
    elements.forEach(function (el) {
      el.classList.add("visible");
    });
  }, 50);

  // Мобильное меню
  const menuBtn = document.querySelector(".mobile-menu-btn");
  const mobileNav = document.querySelector(".mobile-nav");
  const mobileLinks = document.querySelectorAll(".mobile-nav a");

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener("click", function () {
      this.classList.toggle("active");
      mobileNav.classList.toggle("active");
    });

    // Закрыть меню при клике на ссылку
    mobileLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        menuBtn.classList.remove("active");
        mobileNav.classList.remove("active");
      });
    });
  }

  // Lightbox для изображений
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxClose = document.querySelector(".lightbox-close");
  const lightboxPrev = document.getElementById("lightboxPrev");
  const lightboxNext = document.getElementById("lightboxNext");
  const lightboxYear = document.getElementById("lightbox-year");
  const lightboxCounter = document.getElementById("lightbox-counter");
  const images = document.querySelectorAll(".lightbox-trigger");

  let currentImageIndex = 0;
  let currentGalleryImages = [];

  if (lightbox && lightboxImg) {
    images.forEach(function (img) {
      img.addEventListener("click", function () {
        // Найти все изображения в той же галерее
        const currentGallery = img.closest(".gallery-track");
        currentGalleryImages = Array.from(
          currentGallery.querySelectorAll(".lightbox-trigger"),
        );
        currentImageIndex = currentGalleryImages.indexOf(img);
        openLightbox(img);
      });
    });

    function openLightbox(img) {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;

      // Получить информацию из work-caption
      const workCaption = img
        .closest(".work-item")
        .querySelector(".work-caption");
      if (workCaption && lightboxYear) {
        const title = workCaption.querySelector(".work-title");
        const year = workCaption.querySelector(".work-year");

        if (title && year) {
          lightboxYear.innerHTML =
            title.textContent + "<br>" + year.textContent;
        } else if (title) {
          lightboxYear.textContent = title.textContent;
        } else if (year) {
          lightboxYear.textContent = year.textContent;
        }
      }

      // Обновить счётчик
      if (lightboxCounter) {
        lightboxCounter.textContent =
          currentImageIndex + 1 + " / " + currentGalleryImages.length;
      }

      lightbox.classList.add("active");
      document.body.style.overflow = "hidden";
      updateLightboxNav();
    }

    function updateLightboxNav() {
      // Скрыть стрелку влево на первом изображении
      if (lightboxPrev) {
        if (currentImageIndex === 0) {
          lightboxPrev.classList.add("hidden");
        } else {
          lightboxPrev.classList.remove("hidden");
        }
      }

      // Скрыть стрелку вправо на последнем изображении
      if (lightboxNext) {
        if (currentImageIndex === currentGalleryImages.length - 1) {
          lightboxNext.classList.add("hidden");
        } else {
          lightboxNext.classList.remove("hidden");
        }
      }

      // Обновить счётчик
      if (lightboxCounter) {
        lightboxCounter.textContent =
          currentImageIndex + 1 + " / " + currentGalleryImages.length;
      }
    }

    function showPrevImage() {
      if (currentImageIndex > 0) {
        currentImageIndex--;
        const img = currentGalleryImages[currentImageIndex];
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;

        // Получить информацию из work-caption
        const workCaption = img
          .closest(".work-item")
          .querySelector(".work-caption");
        if (workCaption && lightboxYear) {
          const title = workCaption.querySelector(".work-title");
          const year = workCaption.querySelector(".work-year");

          if (title && year) {
            lightboxYear.innerHTML =
              title.textContent + "<br>" + year.textContent;
          } else if (title) {
            lightboxYear.textContent = title.textContent;
          } else if (year) {
            lightboxYear.textContent = year.textContent;
          }
        }

        updateLightboxNav();
      }
    }

    function showNextImage() {
      if (currentImageIndex < currentGalleryImages.length - 1) {
        currentImageIndex++;
        const img = currentGalleryImages[currentImageIndex];
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;

        // Получить информацию из work-caption
        const workCaption = img
          .closest(".work-item")
          .querySelector(".work-caption");
        if (workCaption && lightboxYear) {
          const title = workCaption.querySelector(".work-title");
          const year = workCaption.querySelector(".work-year");

          if (title && year) {
            lightboxYear.innerHTML =
              title.textContent + "<br>" + year.textContent;
          } else if (title) {
            lightboxYear.textContent = title.textContent;
          } else if (year) {
            lightboxYear.textContent = year.textContent;
          }
        }

        updateLightboxNav();
      }
    }

    // Закрытие lightbox
    function closeLightbox() {
      lightbox.classList.remove("active");
      document.body.style.overflow = "";
    }

    if (lightboxClose) {
      lightboxClose.addEventListener("click", closeLightbox);
    }

    if (lightboxPrev) {
      lightboxPrev.addEventListener("click", showPrevImage);
    }

    if (lightboxNext) {
      lightboxNext.addEventListener("click", showNextImage);
    }

    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // Закрытие по Esc
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && lightbox.classList.contains("active")) {
        closeLightbox();
      }
      if (e.key === "ArrowLeft" && lightbox.classList.contains("active")) {
        showPrevImage();
      }
      if (e.key === "ArrowRight" && lightbox.classList.contains("active")) {
        showNextImage();
      }
    });

    // Свайпы для мобильных
    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener(
      "touchstart",
      function (e) {
        touchStartX = e.changedTouches[0].screenX;
      },
      false,
    );

    lightbox.addEventListener(
      "touchend",
      function (e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      },
      false,
    );

    function handleSwipe() {
      const swipeThreshold = 50;
      if (touchStartX - touchEndX > swipeThreshold) {
        // Свайп влево - следующее изображение
        showNextImage();
      }
      if (touchEndX - touchStartX > swipeThreshold) {
        // Свайп вправо - предыдущее изображение
        showPrevImage();
      }
    }
  }

  // Аккордеон для работ
  const accordionHeaders = document.querySelectorAll(".accordion-header");

  accordionHeaders.forEach(function (header) {
    header.addEventListener("click", function () {
      const item = this.parentElement;
      const isActive = item.classList.contains("active");

      // Закрыть все
      document.querySelectorAll(".accordion-item").forEach(function (i) {
        i.classList.remove("active");
      });

      // Открыть текущий если не был активен
      if (!isActive) {
        item.classList.add("active");
      }
    });
  });

  // Последняя работа (по дате добавления)
  const latestWorkImg = document.getElementById("latest-work-img");
  const latestWorkTitle = document.getElementById("latest-work-title");
  const latestWorkDate = document.getElementById("latest-work-date");

  if (latestWorkImg) {
    const allWorks = document.querySelectorAll(".work-item");
    let latestWork = null;
    let latestDate = "";

    // Ищем работу с самой свежей датой
    allWorks.forEach(function (work) {
      const date = work.dataset.date;
      if (date && date > latestDate) {
        latestDate = date;
        latestWork = work;
      }
    });

    if (latestWork) {
      const img = latestWork.querySelector("img");
      const caption = latestWork.querySelector(".work-caption");

      if (img) {
        latestWorkImg.src = img.src;
        latestWorkImg.alt = img.alt;
      }

      if (caption && latestWorkTitle && latestWorkDate) {
        const title = caption.querySelector(".work-title");
        const year = caption.querySelector(".work-year");

        if (title) {
          latestWorkTitle.textContent = title.textContent;
        }

        if (year) {
          latestWorkDate.textContent = year.textContent;
        }
      }
    }
  }

  // Навигация для галерей (точки)
  const galleryDots = document.querySelectorAll(".gallery-dot");

  galleryDots.forEach(function (dot) {
    dot.addEventListener("click", function () {
      const galleryId = this.parentElement.dataset.gallery;
      const gallery = document.getElementById(galleryId);
      const dotsContainer = this.parentElement;
      const workItems = gallery.querySelectorAll(".work-item");
      const slideIndex = parseInt(this.dataset.slide);

      // Обновить активные точки
      dotsContainer.querySelectorAll(".gallery-dot").forEach(function (d) {
        d.classList.remove("active");
      });
      this.classList.add("active");

      // Ширина одного слайда (50% + gap)
      const itemWidth = workItems[0].offsetWidth + 15; // 15px = gap

      // Сдвиг трека
      const translateX = -(slideIndex * itemWidth * 2); // *2 потому что 2 работы в ряд

      gallery.style.transform = "translateX(" + translateX + "px)";
    });
  });

  // Блог - открытие поста
  const posts = document.querySelectorAll(".post");
  const postView = document.getElementById("postView");
  const postTitle = document.getElementById("postTitle");
  const postMeta = document.getElementById("postMeta");
  const postContent = document.getElementById("postContent");
  const postBack = document.getElementById("postBack");

  if (posts.length > 0 && postView) {
    posts.forEach(function (post) {
      post.addEventListener("click", function () {
        const title = post.dataset.title;
        const date = post.dataset.date;
        const content = post.dataset.content;

        postTitle.textContent = title;
        postMeta.textContent = date;
        postContent.innerHTML = content;

        postView.classList.add("active");
        document.body.style.overflow = "hidden";
      });
    });

    if (postBack) {
      postBack.addEventListener("click", function (e) {
        e.preventDefault();
        postView.classList.remove("active");
        document.body.style.overflow = "";
      });
    }
  }

  // Навигация по якорям на странице работ
  const sideNavLinks = document.querySelectorAll(".side-nav-link[href^='#']");

  sideNavLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").slice(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        // Если цель - аккордеон, открываем его
        if (targetElement.classList.contains("accordion-item")) {
          targetElement.classList.add("active");
        }

        // Если цель внутри аккордеона, открываем его
        const accordionContent = targetElement.closest(".accordion-content");
        if (accordionContent) {
          const accordionItem = accordionContent.closest(".accordion-item");
          if (accordionItem) {
            accordionItem.classList.add("active");
          }
        }

        // Плавная прокрутка
        setTimeout(function () {
          const offset = 100;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }, 300);
      }
    });
  });

  // Навигация по якорям на страницах about и blog
  const aboutBlogLinks = document.querySelectorAll(
    ".about-page .side-nav-link, .blog-page .side-nav-link",
  );

  aboutBlogLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").slice(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const offset = 100;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });
});

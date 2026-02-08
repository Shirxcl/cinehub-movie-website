console.log("main.js loaded");

document.addEventListener("DOMContentLoaded", function () {
  // --------------------
  // SWIPER INITIALIZATION
  // --------------------
  let swiperInstance = null;

  if (document.querySelector(".popular-content")) {
    swiperInstance = new Swiper(".popular-content", {
      slidesPerView: 1,
      spaceBetween: 10,
      loop: true,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        280: { slidesPerView: 1, spaceBetween: 10 },
        320: { slidesPerView: 2, spaceBetween: 10 },
        510: { slidesPerView: 2, spaceBetween: 10 },
        758: { slidesPerView: 3, spaceBetween: 15 },
        900: { slidesPerView: 4, spaceBetween: 20 },
      },
    });
  }

  // --------------------
  // VIDEO POPUP (SAFE)
  // --------------------
  const playButton = document.querySelector(".play-movie");
  const videoContainer = document.querySelector(".video-container");
  const iframe = document.querySelector("#myvideo");
  const closebtn = document.querySelector(".close-video");

  if (playButton && videoContainer && iframe && closebtn) {
    const videoSrc = iframe.src;

    playButton.addEventListener("click", () => {
      videoContainer.classList.add("show-video");
      iframe.src = videoSrc;
    });

    closebtn.addEventListener("click", () => {
      videoContainer.classList.remove("show-video");
      iframe.src = "";
      setTimeout(() => {
        iframe.src = videoSrc;
      }, 50);
    });
  }

  // --------------------
  // GLOBAL SEARCH (Visible filtering + focus match)
  // --------------------
  const searchInput = document.getElementById("search-input");

  function filterMovies() {
    const query = searchInput.value.toLowerCase().trim();

    // Trending (Swiper slides)
    const trendingSlides = document.querySelectorAll(".popular-content .swiper-slide");
    let firstMatchIndex = -1;

    trendingSlides.forEach((slide, index) => {
      const titleEl =
        slide.querySelector(".movie-title") ||
        slide.querySelector("h2") ||
        slide.querySelector("h3");

      if (!titleEl) return;

      const title = titleEl.innerText.toLowerCase();
      const isMatch = query === "" || title.includes(query);

      slide.style.opacity = isMatch ? "1" : "0.15";
      slide.style.pointerEvents = isMatch ? "auto" : "none";

      if (isMatch && firstMatchIndex === -1 && query !== "") {
        firstMatchIndex = index;
      }
    });

    // Move Swiper to first matched slide so user sees result
    if (swiperInstance && firstMatchIndex >= 0) {
      swiperInstance.slideToLoop(firstMatchIndex, 400);
    }

    // Movies Grid
    const gridCards = document.querySelectorAll(".movies-content .movie-box");

    gridCards.forEach((card) => {
      const titleEl =
        card.querySelector(".movie-title") ||
        card.querySelector("h2") ||
        card.querySelector("h3");

      if (!titleEl) return;

      const title = titleEl.innerText.toLowerCase();
      card.style.display = title.includes(query) ? "block" : "none";
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", filterMovies);
  }
});

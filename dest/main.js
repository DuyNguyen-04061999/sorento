window.addEventListener("load", function () {
  const $ = document.querySelector.bind(document);
  const $$ = document.querySelectorAll.bind(document);
  const langWrap = $(".header__control-lang");

  // =================Hover Language =================
  function handleHoverLangWrap() {
    function handleMouseEnter() {
      if (window.innerWidth >= 1024) this.classList.add("active");
    }
    function handleMouseLeave() {
      if (window.innerWidth >= 1024) {
        this.classList.remove("active");
      }
    }
    function handleLangClick(e) {
      e.stopPropagation();
      if (window.innerWidth < 1024) this.classList.toggle("active");
    }
    if (langWrap) {
      langWrap.addEventListener("mouseenter", handleMouseEnter);
      langWrap.addEventListener("mouseleave", handleMouseLeave);
      langWrap.addEventListener("click", handleLangClick);
      document.addEventListener("click", () => {
        langWrap.classList.remove("active");
      });
    }
  }
  handleHoverLangWrap();

  //   ================click hamburger =============
  const mobileHTML = `
<ul class="header__nav-mobile">
  <div class="--close">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 24 24"
    >
      <path
        fill="none"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 12L7 7m5 5l5 5m-5-5l5-5m-5 5l-5 5"
      />
    </svg>
  </div>
    <li><a href="./index.html">TRANG CHỦ</a></li>
    <li><a href="./about.html">VỀ CHÚNG TÔI</a></li>
    <li><a href="./services.html">DỊCH VỤ</a></li>
    <li><a href="./event.html">SỰ KIỆN</a></li>
    <li><a href="./menu.html">THỰC ĐƠN</a></li>
    <li><a href="./destination.html">ĐIỂM ĐẾN</a></li>
    <li><a href="./library.html">THƯ VIỆN</a></li>
    <li><a href="./contact.html">LIÊN HỆ</a></li>
</ul>`;
  const overlayHTML = `<div class="overlay-nav"></div>`;
  document.body.insertAdjacentHTML("beforeend", mobileHTML);
  document.body.insertAdjacentHTML("beforeend", overlayHTML);

  const hamburger = $(".hamburger");

  const navMobile = $(".header__nav-mobile");
  const closeMobile = navMobile.querySelector(".--close");
  const overlayNav = document.body.querySelector(".overlay-nav");

  function onClickHamburger() {
    if (!hamburger && !closeMobile && !navMobile && !overlayNav) return;
    hamburger.addEventListener("click", function () {
      this.classList.toggle("active");
      navMobile.classList.toggle("active");
      overlayNav.classList.add("active");
    });

    function removeActive() {
      hamburger.classList.remove("active");
      navMobile.classList.remove("active");
      overlayNav.classList.remove("active");
    }
    closeMobile.addEventListener("click", removeActive);
    overlayNav.addEventListener("click", removeActive);
  }
  onClickHamburger(); 
  
  // =========slider-hero==============
  const bannerSlides = $(".banner__slides");

  if (bannerSlides) {
    const flktyHero = new Flickity(bannerSlides, {
      prevNextButtons: false,
      wrapAround: true,
      pageDots: false,
      // autoPlay: true,
    });
    $(".control .--prev").addEventListener("click", function () {
      flktyHero.previous();
    });
    $(".control .--next").addEventListener("click", function () {
      flktyHero.next();
    });
  }
  // ==============modalvideo================
  // https://www.youtube.com/embed/g5Qn1sH-hbg
  const endPoint = "https://www.youtube.com/embed/";
  const videoControl = $(".video__control");
  const clipModal = $(".clip__modal");
  const clipClose = $(".clip__content-close");
  const overlayClip = $(".clip__modal .overlay");
  const iframe = $("iframe");
  if (videoControl && clipModal && clipClose && overlayClip && iframe) {
    function handleRemoveClip() {
      clipModal.classList.remove("active");
      iframe.src = "";
    }

    videoControl.dataset.key = "dA0VGEbbw4g";
    videoControl.addEventListener("click", function () {
      const key = this.dataset.key;
      clipModal.classList.add("active");
      iframe.src = `${endPoint}${key}?autoplay=1`;
    });

    clipClose.addEventListener("click", handleRemoveClip);
    overlayClip.addEventListener("click", handleRemoveClip);
  }

  // ============ homeClient ================
  const clientList = $(".client__list");
  if (clientList) {
    const flktyHomeClient = new Flickity(clientList, {
      // options
      prevNextButtons: false,
      pageDots: false,
      wrapAround: true,
      draggable: ">1",
      percentPosition: true,
      cellAlign: "left",
    });
  }

  // ============== homeNews =================
  const newsDessert = $$(".news__dessert");
  if (newsDessert.length >= 1) {
    const swiperHomeNews = new Swiper(".news__dessert", {
      slidesPerView: 1,
      grabCursor: true,
      spaceBetween: 30,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      loop: true,
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
        1200: {
          slidesPerView: 3,
        },
      },
    });
  }

  // ========homeMessageNews=======
  const messageList = $(".message__list");
  if (messageList) {
    const flktyHomeMessage = new Flickity(messageList, {
      // options
      prevNextButtons: false,
      pageDots: false,
      wrapAround: true,
      draggable: ">1",
      percentPosition: true,
      cellAlign: "left",
      autoPlay: true,
    });

    $$(".message__dir .img")[0].onclick = function () {
      flktyHomeMessage.previous();
    };
    $$(".message__dir .img")[1].onclick = function () {
      flktyHomeMessage.next();
    };
  }

  // =============Home Destination===============
  const destinationSwiperWrap = $(".destination .container .swiper");
  const destinationList = $(".destination__list");
  if (destinationSwiperWrap && destinationList) {
    (function () {
      "use strict";

      // breakpoint where swiper will be destroyed
      // and switches to a dual-column layout
      const breakpoint = window.matchMedia("(min-width:75em)");

      // keep track of swiper instances to destroy later
      let swiperHomeDestination;

      const breakpointChecker = function () {
        // if larger viewport and multi-row layout needed
        if (breakpoint.matches === true) {
          // clean up old instances and inline styles when available
          if (swiperHomeDestination !== undefined)
            swiperHomeDestination.destroy(true, true);
          destinationList.classList.add("--grid");
          return;

          // else if a small viewport and single column layout needed
        } else if (breakpoint.matches === false) {
          // fire small viewport version of swiper
          destinationList.classList.remove("--grid");
          return enableSwiper();
        }
      };

      const enableSwiper = function () {
        swiperHomeDestination = new Swiper(".destination-swiper", {
          slidesPerView: 1,
          grabCursor: true,
          spaceBetween: 24,
          loop: true,
          breakpoints: {
            768: {
              slidesPerView: 2,
            },
          },
        });
      };

      // keep an eye on viewport size changes
      breakpoint.addListener(breakpointChecker);

      // kickstart
      breakpointChecker();
    })(); /* IIFE end */
  }

  // =================== register ===================
  const reserveRegister = $(".reserve__content-register");
  if (reserveRegister) {
    function setHeightReservePattern() {
      const reserveRegisterHeight = reserveRegister.scrollHeight;
      $(
        ".reserve__content-pattern"
      ).style.height = `${reserveRegisterHeight}px`;
    }
    setHeightReservePattern();
    window.onresize = setHeightReservePattern;
  }

  // ==================== panorama about ===============
  const pan = $(".pan");
  if (pan) {
    const img = "./img/about-panoram.jpg";
    const panorama = new PANOLENS.ImagePanorama(img);
    const viewer = new PANOLENS.Viewer({
      container: pan,
      autoRotate: true,
    });

    viewer.add(panorama);
    viewer.OrbitControls.noZoom = true;
  }
  // ================= back to top =================
  const backToTopHTML = `
  <div class="backtotop">
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 1L10.3556 0.648532L10 0.288698L9.64437 0.648532L10 1ZM9.5 19.213V19.713L10.5 19.713V19.213L9.5 19.213ZM19.3556 9.75502L10.3556 0.648532L9.64437 1.35147L18.6444 10.458L19.3556 9.75502ZM9.64437 0.648532L0.644375 9.75502L1.35563 10.458L10.3556 1.35147L9.64437 0.648532ZM9.5 1L9.5 19.213L10.5 19.213L10.5 1L9.5 1Z"
      fill="#B68C2D"
    />
  </svg>
  </div>
  `;
  document.body.insertAdjacentHTML("beforeend", backToTopHTML);
  const backToTop = document.body.querySelector(".backtotop");
  if (backToTop) {
    window.addEventListener("scroll", () => {
      window.scrollY >= window.innerHeight
        ? backToTop.classList.add("active")
        : backToTop.classList.remove("active");
    });

    backToTop.addEventListener("click", () => {
      window.scrollTo(0, 0);
    });
  }
  // =========== swiper service =============
  const ourserviceSlides = $(".ourservice__slides");
  if (ourserviceSlides) {
    const swiperServiceSlide = new Swiper(".ourservice__slides", {
      slidesPerView: 1,
      grabCursor: true,
      spaceBetween: 54,
      pagination: {
        el: ".ourservice-pagination",
      },
      loop: true,
      breakpoints: {
        768: {
          slidesPerView: 2,
          centeredSlides: true,
        },
      },
    });
  }

  // ================= parallax service benefits==================
  const benefitsDecor = $(".benefits__illus-decor");
  if (benefitsDecor) {
    const parallaxServiceBenefits = new Parallax(benefitsDecor);
  }
  // ================= parallax service benefits==================
  const prizeColLogo = $(".--parallax-service-prize");
  if (prizeColLogo) {
    const parallaxPrizeLogo = new Parallax(prizeColLogo);
  }

  // ================ destination fancy app ================
  const imgItems = $$(".--destination .content .content__list-item");
  if (imgItems.length >= 1) {
    imgItems.forEach((item) => {
      item.dataset.fancybox = "galleryDestination";
      item.dataset.src = item.querySelector("img").src;
    });
    Fancybox.bind('[data-fancybox="galleryDestination"]', {
      infinite: true,
      autoFocus: false,
    });
  }

  // ================== library ==================
  const libraryNavList = $(".--library .content .content__nav-list");

  if (libraryNavList) {
    const libraryNavListItems =
      libraryNavList.querySelectorAll(".subtitle-white");
    const activeBar = document.createElement("div");
    activeBar.className = "active-bar";
    libraryNavList.appendChild(activeBar);
    function handleStyleActiveBar(el) {
      Object.assign(activeBar.style, {
        left: `${el.offsetLeft}px`,
        width: `${el.offsetWidth}px`,
      });
    }

    libraryNavListItems.forEach((item) => {
      if (item.classList.contains("active")) {
        handleStyleActiveBar(item);
      }
      item.addEventListener("click", function () {
        libraryNavListItems.forEach((item) => item.classList.remove("active"));
        this.classList.add("active");
        handleStyleActiveBar(this);
      });

      item.addEventListener("mouseenter", function () {
        handleStyleActiveBar(this);
      });
    });
    libraryNavList.addEventListener("mouseleave", () => {
      libraryNavListItems.forEach((item) => {
        if (item.classList.contains("active")) {
          handleStyleActiveBar(item);
        }
      });
    });
  }

  // ====== AOS==========
  AOS.init({
    debounceDelay: 50,
    duration: 800,
  });
});

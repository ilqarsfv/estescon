$(document).ready(() => {


  $(".hamburger").click(function () {
    $(this).toggleClass("active");
    $(".header_menu_list").toggleClass("active");
    $("#wide_menu_wrapper").toggleClass("active");
  });

  $(".index_number").each(function (i, item) {
    $(item).text(i < 9 ? "0" + (i + 1) : i + 1);
  });

  // Banner slider yalnız elementlər varsa işləsin
  if (
    $(".contents_slider").length &&
    $(".banner_thumbs_slider").length &&
    $(".banner_main_slider").length
  ) {
    const contentsSlider = new Swiper(".contents_slider", {
      direction: "vertical",
      slidesPerView: 1,
      allowTouchMove: false,
      speed: 500,
    });

    const thumbs = new Swiper(".banner_thumbs_slider", {
      spaceBetween: 10,
      slidesPerView: 10,
      freeMode: true,
      watchSlidesProgress: true,
      slideToClickedSlide: true,
    });

    const mainSlider = new Swiper(".banner_main_slider", {
      spaceBetween: 0,
      effect: "fade",
      speed: 900,
      fadeEffect: {
        crossFade: true,
      },
      autoplay: {
        delay: 2000,
      },
    });

    function syncAll(index) {
      if (mainSlider && mainSlider.initialized) {
        mainSlider.slideTo(index);
      }

      if (contentsSlider && contentsSlider.initialized) {
        contentsSlider.slideTo(index);
      }

      if (thumbs && thumbs.initialized) {
        thumbs.slideTo(index);
      }

      $(".banner_thumbs_slider .swiper-slide")
        .removeClass("swiper-slide-thumb-active")
        .eq(index)
        .addClass("swiper-slide-thumb-active");
    }

    syncAll(0);

    thumbs.on("click", function () {
      const index = thumbs.clickedIndex;

      if (typeof index === "number" && index >= 0) {
        syncAll(index);
      }
    });

    mainSlider.on("slideChange", function () {
      syncAll(mainSlider.realIndex);
    });

    contentsSlider.on("slideChange", function () {
      syncAll(contentsSlider.realIndex);
    });
  }

  // Content slider
  if ($(".banner_content_slider").length) {
    new Swiper(".banner_content_slider", {
      slidesPerView: 2.2,
      spaceBetween: 10,
      speed: 900,
      autoplay: {
        delay: 2000,
      },
      loop: true,
    });
  }

  new Swiper(".heroSwiper", {
    speed: 1000,
    navigation: {
      nextEl: ".hero-swiper-button-next",
      prevEl: ".hero-swiper-button-prev",
    },
  });

  const productSwiper = new Swiper(".productSwiper", {
    autoplay: {
      delay: 2500,
    },
    slidesPerView: 3,
    speed: 1000,
    spaceBetween: 20,
    pagination: {
      el: ".products-swiper-pagination",
      clickable: true,
    },
  });

  const firstSlideImg = $("#first_slide_img");
  const sliderContentTexts = $("#change_slider_content_wrapper > p");

  const updateProductPreview = (swiper) => {
    const prevSlideIndex = swiper.activeIndex > 0 ? swiper.activeIndex - 1 : swiper.slides.length - 1;
    const prevSlide = $(swiper.slides[prevSlideIndex]);
    const prevSlideImg = prevSlide.find("img").first();
    const nextSrc = (prevSlideImg.attr("src") || "").trim();
    const category = prevSlide.find(".pr_card_bottom span").first().text().trim();
    const title = prevSlide.find(".pr_card_top p").eq(0).text().trim();
    const description = prevSlide.find(".pr_card_top p").eq(1).text().trim();

    if (!nextSrc) {
      return;
    }

    sliderContentTexts.eq(0).text(category);
    sliderContentTexts.eq(1).text(title);
    sliderContentTexts.eq(2).text(description);

    firstSlideImg.removeClass("fade-change");
    firstSlideImg[0].offsetWidth;

    requestAnimationFrame(() => {
      firstSlideImg.attr("src", nextSrc);
      firstSlideImg.addClass("fade-change");
    });
  };

  updateProductPreview(productSwiper);
  productSwiper.on("slideChangeTransitionStart", (swiper) => {
    updateProductPreview(swiper);
  });

  new Swiper(".prSwiper", {
    slidesPerView: 2,
    spaceBetween: 20,
    // centeredSlides: true,
    navigation: {
      nextEl: ".pr-swiper-button-next",
      prevEl: ".pr-swiper-button-prev",
    },
  });

  $(function() {
  $(".partnor_card").on('mouseenter', function(e) {
    x = e.pageX - $(this).offset().left;
    y = e.pageY - $(this).offset().top;
    $(this).find("span").css({
      top: y,
      left: x
    });
  });
  $(".partnor_card").on('mouseout', function(e) {
    x = e.pageX - $(this).offset().left;
    y = e.pageY - $(this).offset().top;
    $(this).find("span").css({
      top: y,
      left: x
    });
  });
});
});

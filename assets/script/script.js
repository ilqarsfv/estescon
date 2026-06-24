$(document).ready(() => {
  $(window).scroll(() => {
    if ($(window).scrollTop() > 30) {
      $("header").addClass("scrolled");
    } else {
      $("header").removeClass("scrolled");
    }
  });
  $(".header_menu_desctop").hover(
    () => {
      $("header").addClass("hover");
    },
    () => {
      $("header").removeClass("hover");
    },
  );

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

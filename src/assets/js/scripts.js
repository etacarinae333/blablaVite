import Swiper from "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs";
import countries from "../CountryCodes.json";

const setCssVariables = () => {
  const vh = window.innerHeight * 0.01;
  const vw = window.innerWidth * 0.01;
  const zoom = window.innerWidth / 320;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
  document.documentElement.style.setProperty("--zoom", `${zoom}`);
  document.documentElement.style.setProperty("--vw", `${vw}px`);

  // document
  //   .querySelector('meta[name="viewport"]')
  //   .setAttribute(
  //     "content",
  //     `width=device-width, initial-scale=${$(window).width() < 577 ? zoom : 1}`
  //   );
  document.querySelector("html").style.zoom = `${
    $(window).width() < 577 ? zoom : 1
  }`;
};
setCssVariables();
window.addEventListener("resize", () => {
  setCssVariables();
});
let scrollPrev = 0;
$(window).scroll(function () {
  var scrolled = $(window).scrollTop();

  if (scrolled > 100 && scrolled > scrollPrev) {
    $(".header").addClass("hidden");
  } else {
    $(".header").removeClass("hidden");
  }
  scrollPrev = scrolled;
});

const addEventListenerAll = (selector, event, handler) => {
  const elems = document.querySelectorAll(selector);
  elems.forEach((item) => {
    item.addEventListener(event, handler);
  });
};

const mainBanner = new Swiper(".main-banner", {
  loop: true,
  autoplay: {
    delay: 5000,
  },
  speed: 700,
  slideClass: "main-banner__item",
  slidesPerView: 1,
  pagination: {
    el: ".main-banner__pagination .pagination",
    currentClass: "",
    bulletClass: "dot",
    clickable: true,
  },
});

let timeout;
addEventListenerAll(".services-list__item", "mouseover", (e) => {
  const el = e.currentTarget;
  clearTimeout(timeout);
  timeout = setTimeout(function () {
    document.querySelectorAll(".services-list__item").forEach((item) => {
      item.classList.remove("active");
    });
    el.classList.add("active");
  }, 140);
});

const testimonials = new Swiper(".testimonials-slider", {
  loop: true,
  autoplay: {
    delay: 5000,
  },
  freeMode: {
    enabled: false,
  },
  slideClass: "testimonials-slider__item",
  scrollbar: { enabled: false, hide: true },
  pagination: {
    enabled: true,
    el: ".testimonials-slider__pagination",
    bulletClass: "dot",
    clickable: true,
  },
  mousewheel: {
    releaseOnEdges: true,
    sensitivity: 1,
  },
  slidesPerView: 1,
  spaceBetween: 16,
  breakpoints: {
    993: {
      slidesPerView: 2,
      spaceBetween: 30,
      scrollbar: {
        enabled: true,
        el: ".testimonials-slider__scrollbar",
        draggable: true,
        snapOnRelease: true,
        dragSize: "auto",
        hide: false,
      },
      pagination: {
        enabled: false,
        hide: true,
      },
      freeMode: {
        enabled: true,
        sticky: false,
        momentumBounce: false,
        momentumVelocityRatio: 0.5,
      },
    },
  },
});

{
  const addressesTabsSubtabs = new Swiper(".addresses__tabs__subtabs", {
    loop: true,
    slideClass: "addresses__tabs__subtabs__item",
    preventInteractionOnTransition: true,
    allowTouchMove: false,
    navigation: { enabled: false },
    slidesPerView: 1,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
  });
  const addresses = new Swiper(".addresses__list", {
    slideClass: "addresses__list__item",
    preventInteractionOnTransition: true,
    // loop: true,
    slidesPerView: 1,
    pagination: {
      el: ".addresses__list__pagination .pagination",
      currentClass: "",
      bulletClass: "dot",
      clickable: true,
    },
    navigation: {
      prevEl: ".addresses__list__pagination .pagination-prev",
      nextEl: ".addresses__list__pagination .pagination-next",
    },
  });
  const pictures = new Swiper(".addresses__pictures", {
    slideClass: "addresses__pictures__item",
    preventInteractionOnTransition: true,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    // loop: true,
    slidesPerView: 1,
  });

  addresses.controller.control = pictures;
  pictures.controller.control = addresses;

  addresses.on("slideChange", function (e) {
    const cityClass = `.addresses__tabs__item`;
    const streetClass = `.addresses__tabs__subtabs__item .street`;

    const currentStreet = document.querySelector(
      `${streetClass}[data-slide="${addresses.activeIndex}"`
    );
    const currentCityId = currentStreet.getAttribute("data-parent-slide");

    document
      .querySelectorAll(streetClass)
      .forEach((item) => item.classList.remove("active"));

    currentStreet.classList.add("active");

    document
      .querySelectorAll(cityClass)
      .forEach((item) => item.classList.remove("active"));

    document
      .querySelector(`${cityClass}[data-slide="${currentCityId}"`)
      .classList.add("active");

    addressesTabsSubtabs.slideTo(currentCityId);
  });

  addEventListenerAll(".addresses__tabs__item", "click", (e) => {
    addressesTabsSubtabs.slideTo(e.currentTarget.getAttribute("data-slide"));
    document
      .querySelector(
        ".addresses__tabs__subtabs__item.swiper-slide-active .street"
      )
      .click();

    document.querySelectorAll(".addresses__tabs__item").forEach((item) => {
      item.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
  });

  addEventListenerAll(
    ".addresses__tabs__subtabs__item .street",
    "click",
    (e) => {
      addresses.slideTo(e.currentTarget.getAttribute("data-slide"));
      document
        .querySelectorAll(".addresses__tabs__subtabs__item .street")
        .forEach((item) => {
          item.classList.remove("active");
        });
      e.currentTarget.classList.add("active");
    }
  );
}

{
  const modal = $("header");
  const modalBtn = $(".header__burger");
  const overlay = $(".overlay");
  const body = $("html");
  modalBtn.on("click", () => {
    modal.toggleClass("active");
    overlay.toggleClass("active");
    body.toggleClass("no-scroll");
  });
  overlay.on("click", () => {
    $("header").removeClass("active");
    overlay.removeClass("active");
    body.removeClass("no-scroll");
  });
}
$(".modal .close, .modal .modal__overlay").on("click", () => {
  $(".modal").removeClass("active");
  $("html").removeClass("no-scroll");
});

const toggleModal = (modal) => {
  $("html").toggleClass("no-scroll");
  modal.toggleClass("active");
};
{
  const modal = $(".modal.contact-me");
  const modalBtn = $(".contact-me-btn");
  modalBtn.on("click", () => toggleModal(modal));
}
{
  const modal = $(".modal.contact-modal");
  const modalBtn = $(".contact-modal-btn");
  modalBtn.on("click", () => toggleModal(modal));
}

document.querySelectorAll(".select").forEach(
  (item) =>
    new SlimSelect({
      select: item,
      settings: {
        showSearch: false,
      },
      placeholder: "Placeholder Text Here",
    })
);

document.querySelectorAll(".countryCodes").forEach((item) => {
  const input = item.parentElement.querySelector("input");
  if (input) {
    const mask = IMask(input, {
      mask: "+{48} (000) 000 000",
      lazy: false,
    });
    new SlimSelect({
      select: item,
      data: countries.map((item) => ({
        text: `${item.iso} (${item.name})`,
        value: {
          code: item.code,
          mask: item.mask,
        },
        selected: item.iso === "PL",
      })),
      events: {
        afterChange: (newVal) => {
          const val = newVal[0].value;
          mask.updateOptions({
            mask: `+{${val.code.slice(1)}} ${val.mask.replaceAll("#", "0")}`,
          });
          mask.value = "";
        },
      },
    });
  }
});

$("footer .menu:not(.contacts) .title").on("click", function () {
  $(this).parents().toggleClass("active");
});

const notFoundServices = new Swiper("section#not-found .services-list", {
  loop: true,
  // autoplay: {
  //     delay: 5000,
  // },
  slideClass: "services-list__item",
  slidesPerView: 2,
  spaceBetween: 12,
  scrollbar: {
    enabled: true,
    el: ".services-list__scrollbar",
    draggable: true,
    snapOnRelease: true,
    dragSize: "auto",
    hide: false,
  },
  breakpoints: {
    993: {
      enabled: false,
    },
    577: {
      slidesPerView: 2,
      enabled: true,
      spaceBetween: 20,
      scrollbar: {
        enabled: false,
        hide: true,
      },
    },
  },
});

const addressesMap = new Swiper("#contacts-map .contacts__addresses", {
  // loop: true,
  slideClass: "contacts__addresses__item",
  direction: "vertical",
  slidesPerView: 4,
  spaceBetween: 10,
  scrollbar: {
    enabled: true,
    el: ".contacts__addresses__scrollbar",
    draggable: true,
    snapOnRelease: true,
    dragSize: "auto",
  },
  mousewheel: {
    releaseOnEdges: true,
    sensitivity: 1,
    forceToAxis: true,
  },
});

try {
  const getMapCenterPosition = (lat, lng, isMobile) =>
    isMobile
      ? {
          lat: lat,
          lng: lng,
        }
      : {
          lat: lat,
          lng: lng - 0.003,
        };

  const markers = [
    {
      posLat: 52.2309364,
      posLng: 20.976091,
    },
    {
      posLat: 52.1309364,
      posLng: 20.976091,
    },
    {
      posLat: 51.9309364,
      posLng: 20.976091,
    },
    {
      posLat: 52.8309364,
      posLng: 20.976091,
    },
    {
      posLat: 52.7309364,
      posLng: 20.976091,
    },
    {
      posLat: 52.6309364,
      posLng: 20.976091,
    },
  ];

  // const posMarkerLat = 52.2309364,
  //     posMarkerLng = 20.976091,
  //     posCenterLat = posMarkerLat + 0.000657,
  //     posCenterlng = posMarkerLng - 0.0017747,
  //     posCenterMobileLat = posMarkerLat,
  //     posCenterMobilelng = posMarkerLng + 0.00031;

  const element = document.querySelector(".contacts__map");

  async function initMap(element) {
    const { Map } = await google.maps.importLibrary("maps");
    const { Marker } = await google.maps.importLibrary("marker");

    let posCenter = getMapCenterPosition(markers[0].posLat, markers[0].posLng);
    let sizeMarker = [39, 50];

    const check = element.offsetWidth;
    if (check < 768) {
      posCenter = getMapCenterPosition(
        markers[0].posLat,
        markers[0].posLng,
        true
      );
      sizeMarker = [28, 36];
    }

    const map = new Map(element, {
      center: posCenter,
      zoom: 16,
    });
    const image = {
      url: "assets/img/marker.svg",
      scaledSize: new google.maps.Size(...sizeMarker),
    };

    markers.forEach((marker) => {
      new Marker({
        position: { lat: marker.posLat, lng: marker.posLng },
        map: map,
        icon: image,
        optimized: false,
      });
    });

    $(".contacts__addresses__item").on("click", function () {
      const id = $(this).attr("data-id");
      map.setCenter(
        getMapCenterPosition(markers[id].posLat, markers[id].posLng)
      );
    });
  }

  if (element) {
    initMap(element);
  }
} catch (e) {
  // console.log(e);
}

// const swiper = new Swiper(".team-slider", {
//   speed: 400,
//   spaceBetween: 100,
// });

const teamSlider = new Swiper(".team-slider", {
  loop: true,

  freeMode: {
    enabled: false,
  },
  slideClass: "team-slider__item",
  // mousewheel: {
  //   releaseOnEdges: true,
  //   sensitivity: 1,
  // },
  slidesPerView: 2,
  spaceBetween: 12,
  scrollbar: {
    enabled: true,
    el: ".team-slider__scrollbar",
    draggable: true,
    snapOnRelease: true,
    dragSize: "auto",
    hide: false,
  },
  breakpoints: {
    1200: {
      slidesPerView: 4,
    },
    993: {
      slidesPerView: 3,
    },
    577: {
      spaceBetween: 30,
    },
  },
});

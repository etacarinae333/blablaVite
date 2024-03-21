import Swiper from "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs";
import countries from "../CountryCodes.json";

const setCssVariables = () => {
    const vh = window.innerHeight * 0.01;
    const vw = window.innerWidth * 0.01;
    const zoom = window.innerWidth / 320;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    document.documentElement.style.setProperty("--zoom", `${zoom}`);
    document.documentElement.style.setProperty("--vw", `${vw}px`);

    document
        .querySelector('meta[name="viewport"]')
        .setAttribute(
            "content",
            `width=device-width, initial-scale=${
                $(window).width() < 577 ? zoom : 1
            }`
        );
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
    // autoplay: {
    //     delay: 5000,
    // },
    freeMode: {
        enabled: true,
        sticky: false,
        momentumBounce: false,
        momentumVelocityRatio: 0.5,
    },
    slideClass: "testimonials-slider__item",
    scrollbar: { enabled: false, hide: true },
    pagination: {
        enabled: true,
        el: ".testimonials-slider__pagination",
        currentClass: "",
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

    // const booksy = new Swiper(".booksy-btn", {
    //     slideClass: "btn",
    //     slidesPerView: 1,
    // });
    addresses.controller.control = pictures;
    // addresses.controller.control = booksy;
    pictures.controller.control = addresses;
    // pictures.controller.control = booksy;
    // booksy.controller.control = pictures;
    // booksy.controller.control = addresses;

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
        addressesTabsSubtabs.slideTo(
            e.currentTarget.getAttribute("data-slide")
        );
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
        modal.addClass("active");
        overlay.addClass("active");
        body.addClass("no-scroll");
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

const countryCodes = new SlimSelect({
    select: ".countryCodes",
    data: countries.map((item) => ({
        text: `${item.code} (${item.name})`,
        value: item.dial_code,
        selected: item.code === "PL",
    })),
    events: {
        afterChange: (newVal) => {
            console.log(newVal);
            return {
                text: `${item.code}`,
                value: item.dial_code,
                selected: item.code === "PL",
            };
        },
    },
});
console.log(countryCodes);

$("footer .menu:not(.contacts) .title").on("click", function () {
    $(this).parents().toggleClass("active");
    // $(this).siblings("ul").stop().slideToggle(400);
});

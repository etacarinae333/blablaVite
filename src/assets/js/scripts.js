import Swiper from "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs";

const addEventListenerAll = (selector, event, handler) => {
    const elems = document.querySelectorAll(selector);
    elems.forEach((item) => {
        item.addEventListener(event, handler);
    });
};

const mainBanner = new Swiper(".main-banner", {
    loop: true,
    // autoplay: {
    //     delay: 5000,
    // },
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

addEventListenerAll(".services-list__item", "mouseover", (e) => {
    document.querySelectorAll(".services-list__item").forEach((item) => {
        item.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
});

const testimonials = new Swiper(".testimonials-slider", {
    loop: true,
    slideClass: "testimonials-slider__item",
    scrollbar: { enabled: false, hide: true },
    pagination: {
        enabled: true,
        el: ".testimonials-slider__pagination",
        currentClass: "",
        bulletClass: "dot",
        clickable: true,
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

const overlay = $(".overlay");
overlay.on("click", () => {
    $(".modal, header").removeClass("active");
    overlay.removeClass("active");
});
$(".modal .close").on("click", () => {
    $(".modal, header").removeClass("active");
    overlay.removeClass("active");
});
const toggleModal = (modal) => {
    modal.toggleClass("active");
    overlay.toggleClass("active");
};
{
    const modal = $("header");
    const modalBtn = $(".header__burger");
    modalBtn.on("click", () => toggleModal(modal));
}
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
        })
);

$("footer .menu:not(.contacts) .title").on("click", function () {
    $(this).parents().toggleClass("active");
    // $(this).siblings("ul").stop().slideToggle(400);
});

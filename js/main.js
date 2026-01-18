const selectorBlocks = document.querySelectorAll(".product-selector_block");
const refillTexts = document.querySelectorAll(".product_atc-refills");

selectorBlocks.forEach((block, index) => {
    block.addEventListener("click", () => {
        selectorBlocks.forEach(b => b.classList.remove("active"));

        block.classList.add("active");

        const targetData = (index + 1).toString();

        refillTexts.forEach(text => {
            if (text.getAttribute("data") === targetData) {
                text.classList.remove("hided");
            } else {
                text.classList.add("hided");
            }
        });
    });
});

function toggleHeight(el, isOpen, duration = 600) {
    el.style.overflow = "hidden";

    if (isOpen) {
        // ĐÓNG
        el.style.height = el.scrollHeight + "px";
        el.offsetHeight;

        el.style.transition = `height ${duration}ms ease`;
        el.style.height = "0";

        setTimeout(() => {
            el.style.display = "none";
            el.style.height = "";
            el.style.transition = "";
            el.style.overflow = "";
        }, duration);

    } else {
        // MỞ
        el.style.display = "block";
        el.style.height = "0";
        el.offsetHeight;

        el.style.transition = `height ${duration}ms ease`;
        el.style.height = el.scrollHeight + "px";

        setTimeout(() => {
            el.style.height = "";
            el.style.transition = "";
            el.style.overflow = "";
        }, duration);
    }
}

document.querySelectorAll(".product_faq-box").forEach(tab => {
    tab.addEventListener("click", () => {
        const content = tab.querySelector(".product_faq-content");
        const icon = tab.querySelector(".faq-thum_arrow");

        const isOpen = tab.classList.contains("active");

        tab.classList.toggle("active");
        toggleHeight(content, isOpen);

        icon.style.transform = isOpen ? "rotate(0deg)" : "rotate(180deg)";
    });
});

document.querySelectorAll(".product_tab-block").forEach(tab => {
    tab.addEventListener("click", () => {
        const content = tab.querySelector(".product_tab-content");
        const icon = tab.querySelector(".product_tab-thumb img");

        const isOpen = tab.classList.contains("active");

        tab.classList.toggle("active");
        toggleHeight(content, isOpen);

        icon.style.transform = isOpen ? "rotate(0deg)" : "rotate(45deg)";
    });
});

document.querySelectorAll(".product-lymph-ingredient").forEach(tab => {
    tab.addEventListener("click", () => {
        const content2 = tab.querySelector(".product_lymph-ingr-content");

        const isOpen = tab.classList.contains("active");

        tab.classList.toggle("active");
        toggleHeight(content2, isOpen);
    });
});


const track = document.querySelector('.slick-track');
const list = document.querySelector('.slick-list');
const slides = Array.from(document.querySelectorAll('.slick-slide'));
const nextBtn = document.querySelector('.product_carousel-next');
const prevBtn = document.querySelector('.product_carousel-prev');
const dots = document.querySelectorAll('.slick-dots li');
const progressBar = document.querySelector('.product_ugc-progress-bar');

let currentIndex = 0;
const itemWidth = 310;

function updateCarousel() {
    const visibleWidth = list.offsetWidth;
    const totalWidth = slides.length * itemWidth - 620;
    const maxScroll = totalWidth - visibleWidth;

    let moveDistance = currentIndex * itemWidth;

    if (moveDistance >= maxScroll) {
        moveDistance = maxScroll;
        nextBtn.style.pointerEvents = "none";
    } else {
        nextBtn.style.pointerEvents = "auto";
    }

    if (currentIndex <= 0) {
        currentIndex = 0;
        moveDistance = 0;
        prevBtn.style.pointerEvents = "none";
    } else {
        prevBtn.style.pointerEvents = "auto";
    }

    track.style.transition = "transform 0.5s ease-in-out";
    track.style.transform = `translate3d(-${moveDistance}px, 0px, 0px)`;

    dots.forEach((dot, index) => {
        if (index === currentIndex) {
            dot.classList.add('slick-active');
            dot.querySelector('button').setAttribute('aria-selected', 'true');
            dot.querySelector('button').tabIndex = 0;
        } else {
            dot.classList.remove('slick-active');
            dot.querySelector('button').setAttribute('aria-selected', 'false');
            dot.querySelector('button').tabIndex = -1;
        }
    });

    if (progressBar) {
        const progressPercent = ((moveDistance + visibleWidth) / totalWidth) * 100;
        progressBar.style.width = `${progressPercent}%`;
    }
}

nextBtn.addEventListener('click', () => {
    const maxScroll = (slides.length * itemWidth) - list.offsetWidth;
    if (currentIndex * itemWidth < maxScroll) {
        currentIndex++;
        updateCarousel();
        stopAllVideos();
    }
});

// Click nút Prev
prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
        stopAllVideos();
    }
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
        stopAllVideos();
    });
});

function stopAllVideos() {
    document.querySelectorAll('video').forEach(v => {
        v.pause();
        const icon = v.parentElement.querySelector('.product_ugc-play');
        if (icon) icon.style.opacity = "1";
    });
}

document.querySelectorAll('.product_ugc-video').forEach(container => {
    container.addEventListener('click', function () {
        const video = this.querySelector('video');
        const icon = this.querySelector('.product_ugc-play');
        if (video.paused) {
            video.play();
            icon.style.opacity = "0";
        } else {
            video.pause();
            icon.style.opacity = "1";
        }
    });
});

updateCarousel();
window.addEventListener('resize', updateCarousel);

const btnAdd = document.querySelector('.product-selector_atc');

btnAdd.addEventListener('click', function () {
    alert("Đã thêm vào giỏ hàng!");
});

$(document).ready(function () {
    $('.main_product-image-carousel').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        infinite: true,
        arrows: true, // Phải để là true
        prevArrow: $('.slick-prev'), // Nhận diện nút prev trong HTML
        nextArrow: $('.slick-next'), // Nhận diện nút next trong HTML
        asNavFor: '.main_product-image-carousel_thumbs'
    });

    // Khởi tạo slider thumbnail
    $('.main_product-image-carousel_thumbs').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: '.main_product-image-carousel',
        dots: false,
        centerMode: false,
        focusOnSelect: true,
        infinite: true,
        arrows: false
    });
});


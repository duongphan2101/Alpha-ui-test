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

document.querySelectorAll(".product_tab-block").forEach(tab => {
    tab.addEventListener("click", () => {
        const content = tab.querySelector(".product_tab-content");
        const icon = tab.querySelector(".product_tab-thumb img");

        const isOpen = tab.classList.contains("active");

        tab.classList.toggle("active");
        toggleHeight(content, isOpen);

        icon.style.transform = isOpen ? "rotate(0deg)" : "rotate(45deg)";
        icon2.style.transform = isOpen ? "rotate(0deg)" : "rotate(90deg)";
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
const progressBar = document.querySelector('.product_ugc-progress-bar'); // Nếu bạn có thanh màu xanh

let currentIndex = 0;
const itemWidth = 310; // Chiều rộng mỗi item

function updateCarousel() {
    const visibleWidth = list.offsetWidth; 
    const totalWidth = slides.length * itemWidth - 620;
    const maxScroll = totalWidth - visibleWidth;
    
    // 1. Tính toán điểm dừng tối đa chính xác theo pixel
    let moveDistance = currentIndex * itemWidth;

    if (moveDistance >= maxScroll) {
        moveDistance = maxScroll; // Hít vào lề phải
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

    // 2. Thực hiện trượt track
    track.style.transition = "transform 0.5s ease-in-out";
    track.style.transform = `translate3d(-${moveDistance}px, 0px, 0px)`;

    // 3. ACTIVE LI (DOTS): Xóa hết active cũ, thêm active vào index hiện tại
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

    // 4. CẬP NHẬT PROGRESS BAR (Nếu dùng)
    if (progressBar) {
        const progressPercent = ((moveDistance + visibleWidth) / totalWidth) * 100;
        progressBar.style.width = `${progressPercent}%`;
    }
}

// Click nút Next
nextBtn.addEventListener('click', () => {
    // Chỉ tăng index nếu khoảng cách hiện tại chưa chạm mép phải
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

// Click trực tiếp vào các số (Dots)
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
        stopAllVideos();
    });
});

// Các hàm bổ trợ Video
function stopAllVideos() {
    document.querySelectorAll('video').forEach(v => {
        v.pause();
        const icon = v.parentElement.querySelector('.product_ugc-play');
        if (icon) icon.style.opacity = "1";
    });
}

document.querySelectorAll('.product_ugc-video').forEach(container => {
    container.addEventListener('click', function() {
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

// Khởi tạo lần đầu
updateCarousel();
window.addEventListener('resize', updateCarousel);
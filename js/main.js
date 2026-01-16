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
    });
});


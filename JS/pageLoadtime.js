(function() {
    window.addEventListener("load", function() {
        const loadtime = performance.now();

        const loadtimeElement = document.createElement("div");
        loadtimeElement.innerText = `Время загрузки страницы: ${loadtime.toFixed(2)} мс`;
        loadtimeElement.classList.add("load_time");

        const footer = document.querySelector("footer");
        if (footer) {
            footer.appendChild(loadtimeElement);
        } else {
            console.warn("add footer");
        }
    });
})();
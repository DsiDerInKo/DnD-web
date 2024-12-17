document.addEventListener("DOMContentLoaded", () => {
    function setActiveMenu() {
        const menuItems = document.querySelectorAll("nav a");
        menuItems.forEach(item => item.classList.remove("active"));
        const location = window.location;
        menuItems.forEach(item => {
            if (item.href === location.href) item.classList.add("active")
        });
    }

    setActiveMenu();
});
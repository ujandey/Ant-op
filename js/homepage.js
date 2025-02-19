document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".btn");
    
    buttons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault();
            let targetPage = this.getAttribute("href");
            
            document.body.style.opacity = "0";
            setTimeout(() => {
                window.location.href = targetPage;
            }, 500);
        });
    });

    document.body.style.transition = "opacity 0.5s ease-in-out";
    document.body.style.opacity = "1";
});

document.addEventListener("DOMContentLoaded", function() {
    const gallery = document.getElementById('gallery');
    const basePath = '../images/mypics-assets/';
    
    // Function to load images
    function loadImages() {
        let i = 1;
        const loadNextImage = function() {
            const img = new Image();
            img.src = `${basePath}pic${i}.jpg`;
            img.onload = function() {
                const imgElement = document.createElement('img');
                imgElement.src = img.src;
                imgElement.alt = `My Pic ${i}`;
                gallery.appendChild(imgElement);
                i++;
                loadNextImage();
            };
            img.onerror = function() {
                // Stop loading if image doesn't exist
                return;
            };
        };
        loadNextImage();
    }

    // Initial load
    loadImages();
});

document.addEventListener("DOMContentLoaded", function() {
    const gallery = document.getElementById('gallery');
    const basePath = '../images/';
    const maxImages = 26;
    
    // Function to load images
    function loadImages() {
        for (let i = 1; i <= maxImages; i++) {
            const img = document.createElement('img');
            img.src = `${basePath}cat${i}.jpg`;
            img.alt = `Cat ${i}`;
            img.onerror = function() {
                // Remove image if it fails to load
                this.remove();
            };
            gallery.appendChild(img);
        }
    }

    // Function to check for additional images
    function checkForNewImages() {
        let i = maxImages + 1;
        const checkImage = function() {
            const img = new Image();
            img.src = `${basePath}cat${i}.jpg`;
            img.onload = function() {
                const imgElement = document.createElement('img');
                imgElement.src = img.src;
                imgElement.alt = `Cat ${i}`;
                gallery.appendChild(imgElement);
                i++;
                checkImage();
            };
        };
        checkImage();
    }

    // Initial load
    loadImages();
    
    // Check for additional images
    checkForNewImages();
});

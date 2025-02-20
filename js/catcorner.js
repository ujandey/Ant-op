document.addEventListener("DOMContentLoaded", function() {
    const gallery = document.getElementById('gallery');
    const basePath = '../images/';
    const maxImages = 26;
    
    // Create IntersectionObserver
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '0px 0px 200px 0px' // Load images 200px before they enter viewport
    });

    // Function to create and observe image placeholders
    function createImagePlaceholders() {
        for (let i = 1; i <= maxImages; i++) {
            const imgElement = document.createElement('img');
            imgElement.dataset.src = `${basePath}cat${i}.jpg`;
            imgElement.alt = `Cat ${i}`;
            imgElement.loading = 'lazy';
            imgElement.classList.add('lazy-load');
            
            // Create placeholder
            const placeholder = document.createElement('div');
            placeholder.className = 'image-placeholder';
            placeholder.appendChild(imgElement);
            gallery.appendChild(placeholder);
            
            // Observe the image
            observer.observe(imgElement);
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
                imgElement.dataset.src = img.src;
                imgElement.alt = `Cat ${i}`;
                imgElement.loading = 'lazy';
                imgElement.classList.add('lazy-load');
                
                // Create placeholder
                const placeholder = document.createElement('div');
                placeholder.className = 'image-placeholder';
                placeholder.appendChild(imgElement);
                gallery.appendChild(placeholder);
                
                // Observe the image
                observer.observe(imgElement);
                
                i++;
                checkImage();
            };
            img.onerror = function() {
                // Stop if image doesn't exist
                return;
            };
        };
        checkImage();
    }

    // Initial setup
    createImagePlaceholders();
    
    // Check for additional images
    checkForNewImages();

});

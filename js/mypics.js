document.addEventListener("DOMContentLoaded", function() {
    const gallery = document.getElementById('gallery');
    const basePath = '../images/mypics-assets/';
    
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
        let i = 1;
        const createNextPlaceholder = function() {
            const img = new Image();
            img.src = `${basePath}pic${i}.jpg`;
            img.onload = function() {
                const imgElement = document.createElement('img');
                imgElement.dataset.src = img.src;
                imgElement.alt = `My Pic ${i}`;
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
                createNextPlaceholder();
            };
            img.onerror = function() {
                // Stop if image doesn't exist
                return;
            };
        };
        createNextPlaceholder();
    }

    // Initial setup
    createImagePlaceholders();

});

// Pinterest API configuration
const PINTEREST_ACCESS_TOKEN = 'YOUR_PINTEREST_ACCESS_TOKEN';
const BOARD_USERNAME = 'organesson';
const BOARD_NAME = 'ani-meme';

// Fetch and display Pinterest board images
async function fetchPinterestBoardImages() {
    const gallery = document.getElementById('anime-memes-gallery');
    
    try {
        // Fetch board pins
        const response = await fetch(
            `https://api.pinterest.com/v1/boards/${BOARD_USERNAME}/${BOARD_NAME}/pins/?access_token=${PINTEREST_ACCESS_TOKEN}&fields=image`
        );
        
        if (!response.ok) {
            throw new Error('Failed to fetch Pinterest board data');
        }

        const data = await response.json();
        
        if (!data.data || data.data.length === 0) {
            gallery.innerHTML = '<p>No pins found in this board.</p>';
            return;
        }

        // Clear existing content
        gallery.innerHTML = '';

        // Create and append image elements
        data.data.forEach(pin => {
            const img = document.createElement('img');
            img.src = pin.image.original.url;
            img.alt = pin.note || 'Anime Meme';
            img.classList.add('pinterest-image');
            gallery.appendChild(img);
        });
    } catch (error) {
        console.error('Error fetching Pinterest board:', error);
        gallery.innerHTML = '<p>Failed to load anime memes. Please try again later.</p>';
    }
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", function() {
    fetchPinterestBoardImages();
    
    // Refresh images every 5 minutes
    setInterval(fetchPinterestBoardImages, 5 * 60 * 1000);
});

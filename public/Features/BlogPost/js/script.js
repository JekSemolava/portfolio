// Helper function to load testimonials from LocalStorage
function loadTestimonials() {
    const testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
    const testimonialList = document.getElementById('testimonial-list');
    testimonialList.innerHTML = '';

    testimonials.forEach((testimonial, index) => {
        const testimonialDiv = document.createElement('div');
        testimonialDiv.classList.add('testimonial');
        
        // Format the last edited timestamp
        const lastEdited = testimonial.lastEdited ? `Last edited: ${testimonial.lastEdited}` : '';
        
        // Create the star rating HTML
        const stars = Array.from({ length: 5 }, (_, i) => {
            return i < testimonial.rating
                ? '<span class="star">&#9733;</span>'  // Filled star
                : '<span class="star">&#9734;</span>';  // Empty star
        }).join('');

        testimonialDiv.innerHTML = `
            <p><strong>${testimonial.username}</strong> <span>${stars}</span></p>
            <p>" ${testimonial.text} "</p>
            ${lastEdited ? `<p><em>${lastEdited}</em></p>` : ''}
            <div class="btn-grp">
            <button class="edit-btn" onclick="editTestimonial(${index})">Edit</button>
            <button class="delete-btn" onclick="deleteTestimonial(${index})">Delete</button>
            </div>
        `;
        testimonialList.appendChild(testimonialDiv);
    });
}

// Add a new testimonial or update an existing one
document.getElementById('post-btn').addEventListener('click', () => {
    const testimonialText = document.getElementById('testimonial-text').value.trim();
    const username = document.getElementById('username').value.trim();
    
    // Get the rating from the selected radio button
    const rating = document.querySelector('input[name="rating"]:checked') ? parseInt(document.querySelector('input[name="rating"]:checked').value) : 0;

    if (testimonialText && username && rating) {
        const testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];

        // Get current date and time for "last edited"
        const currentDate = new Date().toLocaleString();

        if (editingIndex !== null) {  // Check if we're editing an existing testimonial
            testimonials[editingIndex].text = testimonialText;  // Update the testimonial text
            testimonials[editingIndex].username = username; // Update the username
            testimonials[editingIndex].rating = rating; // Update the rating
            testimonials[editingIndex].lastEdited = currentDate; // Update the last edited time
            editingIndex = null;  // Reset editingIndex after updating
            document.getElementById('post-btn').textContent = 'Post'; // Reset button text
        } else {
            testimonials.push({ 
                text: testimonialText, 
                username: username,
                rating: rating,
                lastEdited: currentDate // Set the last edited time when posting new
            });
        }

        localStorage.setItem('testimonials', JSON.stringify(testimonials));
        document.getElementById('testimonial-text').value = '';  // Clear textarea
        document.getElementById('username').value = ''; // Clear username field
        document.querySelectorAll('input[name="rating"]').forEach(radio => radio.checked = false); // Clear rating selection
        loadTestimonials();  // Reload testimonials after adding or updating
    } else {
        alert('Please enter a username, testimonial, and select a rating!');
    }
});

// Edit an existing testimonial
let editingIndex = null; // Track the index of the testimonial being edited

function editTestimonial(index) {
    const testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
    const testimonialText = testimonials[index].text;
    const username = testimonials[index].username;
    const rating = testimonials[index].rating;

    document.getElementById('testimonial-text').value = testimonialText;
    document.getElementById('username').value = username; // Pre-fill the username field

    // Set the rating radio button to the selected rating
    document.querySelectorAll('input[name="rating"]').forEach(radio => radio.checked = false); // Clear all
    if (rating) document.getElementById(`rating${rating}`).checked = true; // Select the corresponding rating

    editingIndex = index; // Set the index to the testimonial being edited

    // Change the button text to 'Update Testimonial'
    document.getElementById('post-btn').textContent = 'Update';
}

// Delete a testimonial
function deleteTestimonial(index) {
    const testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
    testimonials.splice(index, 1); // Remove the testimonial at the specified index
    localStorage.setItem('testimonials', JSON.stringify(testimonials));
    loadTestimonials(); // Reload testimonials after deletion
}

// Load the testimonials when the page loads
loadTestimonials();

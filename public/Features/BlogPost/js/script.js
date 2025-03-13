let editingIndex = null; // Track the index of the testimonial being edited

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

        if (editingIndex !== null) {  // We're editing an existing testimonial
            testimonials[editingIndex].text = testimonialText;  // Update the testimonial text
            testimonials[editingIndex].username = username; // Update the username
            testimonials[editingIndex].rating = rating; // Update the rating
            testimonials[editingIndex].lastEdited = currentDate; // Update the last edited time
            editingIndex = null;  // Reset editingIndex after updating
            document.getElementById('post-btn').textContent = 'Post'; // Reset button text
        } else {  // We're adding a new testimonial
            testimonials.push({
                text: testimonialText,
                username: username,
                rating: rating,
                lastEdited: currentDate // Set the last edited time when posting new
            });
        }

        localStorage.setItem('testimonials', JSON.stringify(testimonials));
        loadTestimonials();  // Reload testimonials after adding or updating

        // Close the modal and reset the form
        closeModal();
    } else {
        alert('Please enter a username, testimonial, and select a rating!');
    }
});

// Function to load testimonials from LocalStorage
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

// Edit an existing testimonial
function editTestimonial(index) {
    const testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
    const testimonialText = testimonials[index].text;
    const username = testimonials[index].username;
    const rating = testimonials[index].rating;

    document.getElementById('testimonial-text').value = testimonialText;
    document.getElementById('username').value = username;

    // Set the rating radio button to the selected rating
    document.querySelectorAll('input[name="rating"]').forEach(radio => radio.checked = false); // Clear all
    if (rating) document.getElementById(`rating${rating}`).checked = true; // Select the corresponding rating

    editingIndex = index; // Set the index to the testimonial being edited

    // Change the button text to 'Update Testimonial'
    document.getElementById('post-btn').textContent = 'Update';

    // Open the modal
    openModal();
}

// Delete a testimonial with a confirmation prompt
function deleteTestimonial(index) {
    // Get the testimonials array from localStorage
    const testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
    
    // Debug: Check if testimonials array is valid
    console.log('Testimonials:', testimonials);
    
    // Debug: Check the index that is passed to delete
    console.log('Deleting testimonial at index:', index);

    if (index < 0 || index >= testimonials.length) {
        console.error('Invalid index:', index);
        return; // Exit if the index is invalid
    }

    // Show a confirmation dialog before deleting
    const isConfirmed = window.confirm('Are you sure you want to delete this testimonial?');

    if (isConfirmed) {
        // Remove the testimonial at the specified index
        testimonials.splice(index, 1);
        
        // Update localStorage with the new testimonials list
        localStorage.setItem('testimonials', JSON.stringify(testimonials));
        
        // Reload testimonials to reflect the deletion
        loadTestimonials(); // Call your function to update the display
    }
}


// Modal handling functions
const modal = document.getElementById('testimonial-modal');
const openModalButton = document.getElementById('open-modal-btn');
const closeModalButton = document.getElementById('close-modal-btn');

// Open the modal
function openModal() {
    modal.style.display = 'block';
}

// Close the modal
function closeModal() {
    modal.style.display = 'none';
    resetForm();
}

// Event listener for opening the modal
openModalButton.addEventListener('click', openModal);

// Event listener for closing the modal
closeModalButton.addEventListener('click', closeModal);

// Close the modal if clicked outside of the modal content
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Reset the form inputs
function resetForm() {
    document.getElementById('testimonial-text').value = '';
    document.getElementById('username').value = '';
    document.querySelectorAll('input[name="rating"]').forEach(radio => radio.checked = false);
    document.getElementById('post-btn').textContent = 'Post';
}

// Load testimonials when the page loads
loadTestimonials();

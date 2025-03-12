// Helper function to load testimonials from LocalStorage
function loadTestimonials() {
    const testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
    const testimonialList = document.getElementById('testimonial-list');
    testimonialList.innerHTML = '';

    testimonials.forEach((testimonial, index) => {
        const testimonialDiv = document.createElement('div');
        testimonialDiv.classList.add('testimonial');
        testimonialDiv.innerHTML = `
            <p>${testimonial.text}</p>
            <button class="edit-btn" onclick="editTestimonial(${index})">Edit</button>
            <button class="delete-btn" onclick="deleteTestimonial(${index})">Delete</button>
        `;
        testimonialList.appendChild(testimonialDiv);
    });
}

// Add a new testimonial or update an existing one
document.getElementById('post-btn').addEventListener('click', () => {
    const testimonialText = document.getElementById('testimonial-text').value.trim();

    if (testimonialText) {
        const testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
        
        if (editingIndex !== null) {  // Check if we're editing an existing testimonial
            testimonials[editingIndex].text = testimonialText;  // Update the testimonial text
            editingIndex = null;  // Reset editingIndex after updating
            document.getElementById('post-btn').textContent = 'Post'; // Reset button text
        } else {
            testimonials.push({ text: testimonialText });  // Add a new testimonial
        }

        localStorage.setItem('testimonials', JSON.stringify(testimonials));
        document.getElementById('testimonial-text').value = '';  // Clear textarea
        loadTestimonials();  // Reload testimonials after adding or updating
    }
});

// Edit an existing testimonial
let editingIndex = null; // Track the index of the testimonial being edited

function editTestimonial(index) {
    const testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
    const testimonialText = testimonials[index].text;

    document.getElementById('testimonial-text').value = testimonialText;
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

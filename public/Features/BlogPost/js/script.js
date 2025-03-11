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

// Add a new testimonial
document.getElementById('post-btn').addEventListener('click', () => {
    const testimonialText = document.getElementById('testimonial-text').value.trim();

    if (testimonialText) {
        const testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
        testimonials.push({ text: testimonialText });
        localStorage.setItem('testimonials', JSON.stringify(testimonials));
        document.getElementById('testimonial-text').value = ''; // Clear textarea
        loadTestimonials(); // Reload testimonials
    }
});

// Edit an existing testimonial
function editTestimonial(index) {
    const testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
    const testimonialText = testimonials[index].text;

    document.getElementById('testimonial-text').value = testimonialText;

    // Update the testimonial after editing
    document.getElementById('post-btn').textContent = 'Update Testimonial';
    document.getElementById('post-btn').onclick = function () {
        const updatedText = document.getElementById('testimonial-text').value.trim();
        if (updatedText) {
            testimonials[index].text = updatedText;
            localStorage.setItem('testimonials', JSON.stringify(testimonials));
            document.getElementById('testimonial-text').value = '';
            document.getElementById('post-btn').textContent = 'Post Testimonial';
            loadTestimonials();
        }
    };
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

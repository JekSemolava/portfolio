document.addEventListener('DOMContentLoaded', function() {
const track = document.querySelector('.carousel-track');
const cards = [...document.querySelectorAll('.carousel-card')];
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
const blob = document.querySelector(".blob-cursor");
const sidebar = document.getElementById("sidebar");
  const burger  = document.getElementById("burgerButton");
  const closeBtn= document.getElementById("sb_closeButton");
  const header  = document.getElementById("header");
  const overlay = document.getElementById("overlay");
  const links   = sidebar.querySelectorAll("a"); // all links inside sidebar

  function openSidebar() {
    sidebar.classList.add("active");
    overlay.classList.add("active");
    document.body.classList.add("no-scroll");

    burger.style.display = "none";
    header.style.display = "none";
  }

  function closeSidebar() {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("no-scroll");

    burger.style.display = "block";
    header.style.display = "block";
  }

  burger.addEventListener("click", openSidebar);
  closeBtn.addEventListener("click", closeSidebar);
  overlay.addEventListener("click", closeSidebar);

  // NEW: close sidebar when a link is clicked
  links.forEach(link => {
    link.addEventListener("click", closeSidebar);
  });

  // Optional: ESC key closes sidebar
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && sidebar.classList.contains("active")) {
      closeSidebar();
    }
  });


document.querySelectorAll(".flip-card").forEach(card => {
    card.addEventListener("click", () => {
      card.classList.toggle("is-flipped");
    });
  });

let index = 0;
let cardWidth = cards[0].offsetWidth + 16;

cards.forEach(card => {
  const cloneFirst = card.cloneNode(true);
  const cloneLast = card.cloneNode(true);
  track.appendChild(cloneFirst);
  track.insertBefore(cloneLast, track.firstChild);
});

let offset = -cardWidth * cards.length; 
track.style.transform = `translateX(${offset}px)`;



function moveCarousel(direction) {
  if (direction === 'next') {
    offset -= cardWidth;
    index++;
  } else {
    offset += cardWidth;
    index--;
  }
  track.style.transition = 'transform 0.5s ease';
  track.style.transform = `translateX(${offset}px)`;

  track.addEventListener('transitionend', () => {
    if (index >= cards.length) {
      index = 0;
      offset = -cardWidth * cards.length;
      track.style.transition = 'none';
      track.style.transform = `translateX(${offset}px)`;
    } else if (index < 0) {
      index = cards.length - 1;
      offset = -cardWidth * (cards.length + index);
      track.style.transition = 'none';
      track.style.transform = `translateX(${offset}px)`;
    }
  }, { once: true });
}

nextBtn.addEventListener('click', () => moveCarousel('next'));
prevBtn.addEventListener('click', () => moveCarousel('prev'));



    let backToTopButton = document.getElementById('backToTop');
    const texts = [
      'Hi! Nice to Meet You . . .',
      'I am an aspiring and self-taught Frontend Developer . . .|'
  ];
  let line = 0;
  let wordIndex = 0;
  let isDeleting = false;
  let currentText = '';
  
  function typeText() {
      const currentLine = texts[line];
      const words = currentLine.split(' ');
      if (isDeleting) {
          currentText = words.slice(0, wordIndex).join(' ');
          if (wordIndex > 0) {
              setTimeout(wordIndex--, 2500);
          } else {
              isDeleting = false;
          }
      } else {
          currentText = words.slice(0, wordIndex + 1).join(' ');
          if (wordIndex === words.length - 1) {
              isDeleting = true;
          } else {
              setTimeout(wordIndex++, 4000);
          }
      }
  
      document.getElementById('textAnimation').textContent = currentText;
  
      if (isDeleting && wordIndex === 0) {
          isDeleting = false;
          line = (line + 1) % texts.length;
          wordIndex = 0;
          setTimeout(typeText, 4000);
          return;
      }
  
      const speed = isDeleting ? 75 : 200;
      setTimeout(typeText, speed);
  }
  typeText();
  

    window.addEventListener('scroll', function () {
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        backToTopButton.style.display = 'block';
      } else {
        backToTopButton.style.display = 'none';
      }
    });

    backToTopButton.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

  let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;
    let speed = 0.1;

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animate() {
      let dx = mouseX - currentX;
      let dy = mouseY - currentY;

      currentX += dx * speed;
      currentY += dy * speed;

      let velocity = Math.sqrt(dx * dx + dy * dy) * 0.05;
      let scale = Math.min(1.2, 1 + velocity * 0.02);

      blob.style.transform = `translate(${currentX - 20}px, ${currentY - 20}px) scale(${scale})`;

      requestAnimationFrame(animate);
    }
    animate();

  });
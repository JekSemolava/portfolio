document.addEventListener('DOMContentLoaded', function() {
const track = document.querySelector('.carousel-track');
const cards = [...document.querySelectorAll('.carousel-card')];
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

let index = 0;
let cardWidth = cards[0].offsetWidth + 16; // width + gap

// Clone first & last few cards for seamless looping
cards.forEach(card => {
  const cloneFirst = card.cloneNode(true);
  const cloneLast = card.cloneNode(true);
  track.appendChild(cloneFirst);
  track.insertBefore(cloneLast, track.firstChild);
});

let offset = -cardWidth * cards.length; 
track.style.transform = `translateX(${offset}px)`;

// Move carousel
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
  });
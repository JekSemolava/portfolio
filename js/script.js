document.addEventListener('DOMContentLoaded', function() {
    let backToTopButton = document.getElementById('backToTop');
    const texts = [
      'Hi! Nice to Meet You . . .',
      'I am an aspiring and self-taught Frontend Developer . . .|'
      // →
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
          setTimeout(typeText, 4000); // Delay before starting to type the next line
          return;
      }
  
      const speed = isDeleting ? 75 : 200;
      setTimeout(typeText, speed);
  }
  typeText();

    window.onscroll = function() {
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        backToTopButton.style.display = 'block';
      } else {
        backToTopButton.style.display = 'none';
      }
    };

    // var copy = document.querySelector(".tags-slide-content").cloneNode(true);
    // document.querySelector('.tags-container').appendChild(copy);

    backToTopButton.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });


    window.onscroll = function() {
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        backToTopButton.style.display = 'block';
      } else {
        backToTopButton.style.display = 'none';
      }
    };

    backToTopButton.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

  });


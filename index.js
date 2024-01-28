const navbarToggler = document.querySelector('.navbar-toggler');
const closeBtn = document.querySelector('#close-button')
const navbarLinks = document.querySelector('.navbar-links');
const questionTexts = document.querySelectorAll('.question-text');
const carouselInner = document.getElementById('carousel-inner');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicatorsContainer = document.getElementById('indicators');

const images = [
  'https://static.wixstatic.com/media/93e8a3_a356bb7d201f4f47870683655e9e4120~mv2.png/v1/fill/w_308,h_93,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Asset%204_2x_edited.png',
  'https://static.wixstatic.com/media/93e8a3_eaf33552ffd5463e96a5f776dda00111~mv2.png/v1/fill/w_301,h_100,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/White%20horiz.png',
  'https://static.wixstatic.com/media/93e8a3_ae4ade72135b4c7eaa531290232fe5aa~mv2.png/v1/fill/w_313,h_56,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/93e8a3_ae4ade72135b4c7eaa531290232fe5aa~mv2.png',
  'https://static.wixstatic.com/media/93e8a3_b595f31239344928802dd7135813e17c~mv2.png/v1/fill/w_310,h_89,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Tegeta%20logo%20geo.png',
  'https://static.wixstatic.com/media/93e8a3_aca86c1c067d4f8585c3c2cb1b0a0178~mv2.png/v1/fill/w_234,h_80,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/93e8a3_aca86c1c067d4f8585c3c2cb1b0a0178~mv2.png',
  'https://static.wixstatic.com/media/93e8a3_b6ed8fb2602e4670bc83d1fd4a7d9283~mv2.png/v1/fill/w_390,h_119,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/MicrosoftTeams-image%20(9).png',
  'https://static.wixstatic.com/media/93e8a3_ef7860c1a2854f1c8fc20f867ffa30ab~mv2.png/v1/fill/w_284,h_80,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/UFC%20GEO%20PNG_edited.png', 
];


navbarToggler.addEventListener('click', function () {
  navbarLinks.classList.toggle('show');

  if (!navbarToggler.classList.contains('close-icon')) {
    closeBtn.classList.add('show');
    document.body.style.overflow = 'hidden';
  } else {
    navbarToggler.innerHTML = '&#9776;';
    closeBtn.classList.remove('show');
    document.body.style.overflow = '';
  }
});

closeBtn.addEventListener('click', function () {
  navbarLinks.classList.remove('show');
  closeBtn.classList.remove('show');
  document.body.style.overflow = '';
});


document.querySelectorAll('.navbar-links a').forEach(function (link) {
  link.addEventListener('click', function () {
    navbarLinks.classList.remove('show');
    navbarToggler.innerHTML = '&#9776;'; 
    navbarToggler.classList.remove('close-icon');
    document.body.style.overflow = '';
  });
});


document.querySelectorAll('.navbar-links a').forEach(function (link) {
  link.addEventListener('click', function () {
    navbarLinks.classList.remove('show');
    navbarToggler.innerHTML = '&#9776;'; 
  });
});

questionTexts.forEach(function (questionText) {
  questionText.addEventListener('click', function () {
    const answer = this.parentNode.querySelector('.answer');
    questionTexts.forEach(function (otherQuestionText) {
      const otherAnswer = otherQuestionText.parentNode.querySelector('.answer');
      if (otherQuestionText !== questionText) {
        otherAnswer.style.display = 'none';
      }
    });

    answer.style.display = answer.style.display === 'none' || answer.style.display === '' ? 'block' : 'none';
  });
});


function changeColor(clickedElement) {
  const links = document.querySelectorAll('.navbar-links a');
  links.forEach(function (link) {
    link.classList.remove('clicked');
  });

  clickedElement.classList.add('clicked');
}



//Slider
let currentIndex = 0;

function initCarousel() {
    createIndicators();
    renderImages();

    setInterval(() => {
      changeSlide(1);
  }, 4000);
}

function renderImages() {
    carouselInner.classList.add('transition');

    carouselInner.innerHTML = '';

    for (let i = currentIndex; i < currentIndex + 3; i++) {
        if (i < images.length) {
            const item = document.createElement('div');
            item.classList.add('carousel-item');

            const img = document.createElement('img');
            img.src = images[i];
            item.appendChild(img);

            carouselInner.appendChild(item);
        }
    }

    updateIndicator(currentIndex);

    setTimeout(() => {
        carouselInner.classList.remove('transition');
    }, 500);
}

function createIndicators() {
    const totalIndicators = Math.ceil(images.length / 3);

    for (let i = 0; i < totalIndicators; i++) {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        indicator.setAttribute('data-index', i * 3);
        indicator.addEventListener('click', () => goToSlide(i * 3));
        indicatorsContainer.appendChild(indicator);
    }
}

function updateIndicator(index) {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i * 3 === index);
    });
}

function changeSlide(direction) {
    currentIndex += direction * 3;

    if (currentIndex < 0) {
        currentIndex = Math.floor((images.length - 1) / 3) * 3;
    } else if (currentIndex >= images.length) {
        currentIndex = 0;
    }

    renderImages();
}

function goToSlide(index) {
    currentIndex = index;
    renderImages();
}

initCarousel();
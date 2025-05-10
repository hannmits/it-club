const typedTextWrapper = document.getElementById("typed-text-wrapper");
const text = "Welcome to IT CLUB";
let index = 0;

function typeText() {
  if (index < text.length) {
    typedTextWrapper.innerHTML += text.charAt(index);
    index++;
    setTimeout(typeText, 100); // Delay between each character (adjust as needed)
  } else {
    // After typing all characters, fade out the text content only
    setTimeout(() => {
      typedTextWrapper.style.opacity = 0; // Fade out only the text inside the wrapper
    }, 500); // Delay to allow the text to fully type before fading out

    // After the fade-out animation is complete, reset the text and start typing again
    setTimeout(() => {
      typedTextWrapper.innerHTML = ""; // Clear only the text
      typedTextWrapper.style.opacity = 1; // Reset opacity for the next loop
      index = 0; // Reset index
      typeText(); // Restart typing animation
    }, 1500); // Wait for the fade-out animation to finish before restarting
  }
}

window.onload = typeText;

// Fungsi untuk memeriksa apakah elemen sudah terlihat di viewport
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Menambahkan event listener scroll
window.addEventListener("scroll", function () {
  const h2Element = document.querySelector(".about-text h2");

  if (isElementInViewport(h2Element)) {
    h2Element.classList.add("underline-visible");
  } else {
    h2Element.classList.remove("underline-visible");
  }
});

// gsap
gsap.fromTo(
  ".loading-page",
  { opacity: 1 },
  {
    opacity: 0,
    display: "none",
    duration: 1.5,
    delay: 2.5,
  }
);

gsap.fromTo(
  ".logo-name",
  {
    y: 50,
    opacity: 0,
  },
  {
    y: 0,
    opacity: 1,
    duration: 2,
    delay: 0.5,
  }
);

window.addEventListener("load", function () {
  // Wait for 8 seconds (or adjust according to your SVG animation duration)
  setTimeout(() => {
    const splashScreen = document.getElementById("splash-screen");
    const mainContent = document.getElementById("main-content");

    // Hide splash screen and show main content
    splashScreen.style.display = "none";
    mainContent.style.opacity = 1;
  }, 8000); // Adjust this duration based on your animation length
});


// Activity
document.addEventListener('DOMContentLoaded', function() {
  // Add hover effects for category cards
  const categoryCards = document.querySelectorAll('.category-card');

  categoryCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
          card.style.transform = 'translateY(-5px)';
      });

      card.addEventListener('mouseleave', () => {
          card.style.transform = 'translateY(0)';
      });
  });

  // Add click handler for more categories card
  const moreCategories = document.querySelector('.more-categories');
  if (moreCategories) {
      moreCategories.addEventListener('click', () => {
          // You can add navigation or modal opening logic here
          console.log('Exploring more categories...');
      });
  }

  // Add animation on scroll
  let observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('fade-in-up');
          }
      });
  }, {
      threshold: 0.1
  });

  categoryCards.forEach(card => {
      observer.observe(card);
  });

  // Optional: Add counter animation for job numbers
  function animateValue(element, start, end, duration) {
      let startTimestamp = null;
      const step = (timestamp) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          const value = Math.floor(progress * (end - start) + start);
          element.textContent = value.toLocaleString() + ' Jobs';
          if (progress < 1) {
              window.requestAnimationFrame(step);
          }
      };
      window.requestAnimationFrame(step);
  }

  // Initialize job count animations when cards become visible
  const jobCountElements = document.querySelectorAll('.category-info p');
  jobCountElements.forEach(element => {
      observer.observe(element);
  });
});

// Optional: Add smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});

// Add responsive navigation handling
function handleResponsiveMenu() {
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.navigation');

  if (menuButton && navigation) {
      menuButton.addEventListener('click', () => {
          navigation.classList.toggle('active');
          menuButton.classList.toggle('active');
      });
  }
}

handleResponsiveMenu();


// profiles 
function validateForm(event) {
  event.preventDefault();
  
  const form = document.getElementById('registrationForm');
  const fullName = document.getElementById('fullName').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const division = document.getElementById('division').value;
  const experience = document.getElementById('experience').value;
  
  // Validasi nama (minimal 3 karakter)
  if (fullName.length < 3) {
      alert('Nama harus minimal 3 karakter!');
      return false;
  }
  
  // Validasi format email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
      alert('Format email tidak valid!');
      return false;
  }
  
  // Validasi nomor telepon (minimal 10 digit)
  const phoneRegex = /^\d{10,}$/;
  if (!phoneRegex.test(phone.replace(/[^0-9]/g, ''))) {
      alert('Nomor telepon harus minimal 10 digit!');
      return false;
  }
  
  // Validasi divisi harus dipilih
  if (!division) {
      alert('Silakan pilih divisi yang diminati!');
      return false;
  }
  
  // Validasi pengalaman (minimal 50 karakter)
  if (experience.length < 50) {
      alert('Mohon jelaskan pengalaman Anda minimal 50 karakter!');
      return false;
  }

  // Jika semua validasi berhasil, tampilkan pesan sukses
  showSuccessMessage();
  return false;
}

function showSuccessMessage() {
  const formContainer = document.querySelector('.form-container');
  const originalContent = formContainer.innerHTML;
  
  formContainer.innerHTML = `
      <div style="text-align: center; padding: 40px;">
          <h2 style="color: #27ae60; margin-bottom: 20px;">🎉 Pendaftaran Berhasil!</h2>
          <p style="margin-bottom: 20px;">Terima kasih telah mendaftar di IT Club. Kami akan menghubungi Anda melalui email dalam 1-2 hari kerja.</p>
          <button onclick="resetForm()" style="background: #3498db; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">Kembali ke Form</button>
      </div>
  `;
  
  // Simpan konten original untuk digunakan saat reset
  formContainer.setAttribute('data-original-content', originalContent);
}

function resetForm() {
  const formContainer = document.querySelector('.form-container');
  const originalContent = formContainer.getAttribute('data-original-content');
  formContainer.innerHTML = originalContent;
}

// Animasi untuk input fields
document.addEventListener('DOMContentLoaded', function() {
  const inputs = document.querySelectorAll('input, select, textarea');
  
  inputs.forEach(input => {
      input.addEventListener('focus', function() {
          this.parentElement.style.transform = 'translateY(-5px)';
          this.parentElement.style.transition = 'transform 0.3s ease';
      });
      
      input.addEventListener('blur', function() {
          this.parentElement.style.transform = 'translateY(0)';
      });
  });
});


// team
document.addEventListener('DOMContentLoaded', function () {
  const sliderTrack = document.querySelector('.slider-track');
  const slides = document.querySelectorAll('.team-member');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const dotsContainer = document.querySelector('.slider-dots');

  let currentIndex = 0;
  let slideWidth;
  let slidesToShow;

  // Create dots
  function createDots() {
      dotsContainer.innerHTML = '';
      const numberOfDots = Math.ceil(slides.length / slidesToShow);

      for (let i = 0; i < numberOfDots; i++) {
          const dot = document.createElement('div');
          dot.classList.add('dot');
          if (i === currentIndex) dot.classList.add('active');
          dot.addEventListener('click', () => goToSlide(i));
          dotsContainer.appendChild(dot);
      }
  }

  // Update slider dimensions
  function updateSliderDimensions() {
      slideWidth = slides[0].offsetWidth;

      if (window.innerWidth > 1024) {
          slidesToShow = 3;
      } else if (window.innerWidth > 768) {
          slidesToShow = 2;
      } else {
          slidesToShow = 1;
      }

      sliderTrack.style.width = `${slideWidth * slides.length}px`;
      createDots();
      goToSlide(currentIndex);
  }

  // Go to specific slide
  function goToSlide(index) {
      const maxIndex = Math.ceil(slides.length / slidesToShow) - 1;
      currentIndex = Math.max(0, Math.min(index, maxIndex));

      const offset = -currentIndex * (slideWidth * slidesToShow);
      sliderTrack.style.transform = `translateX(${offset}px)`;

      // Update dots
      document.querySelectorAll('.dot').forEach((dot, dotIndex) => {
          dot.classList.toggle('active', dotIndex === currentIndex);
      });
  }

  // Previous button handler
  prevBtn.addEventListener('click', () => {
      goToSlide(currentIndex - 1);
  });

  // Next button handler
  nextBtn.addEventListener('click', () => {
      goToSlide(currentIndex + 1);
  });

  // Update on window resize
  window.addEventListener('resize', updateSliderDimensions);

  // Initialize slider
  updateSliderDimensions();
});


// footer
document.addEventListener('DOMContentLoaded', () => {
  const joinForm = document.getElementById('joinForm');
  const message = document.getElementById('message');

  joinForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = document.getElementById('email').value.trim();

      // Validate email format
      if (email === '' || !validateEmail(email)) {
          message.style.color = 'red';
          message.textContent = 'Please enter a valid email address!';
      } else {
          message.style.color = '#4caf50';
          message.textContent = 'Thank you for joining the IT Club!';
          joinForm.reset();
      }
  });

  // Email validation function
  function validateEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
  }
});

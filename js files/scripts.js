
// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mainNav = document.getElementById('main-nav');

mobileMenuBtn.addEventListener('click', () => {
  mainNav.classList.toggle('active');
  const icon = mobileMenuBtn.querySelector('i');
  if (mainNav.classList.contains('active')) {
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-times');
  } else {
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('#main-nav a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('active');
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  });
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    if (mainNav.classList.contains('active')) {
      mainNav.classList.remove('active');
      const icon = mobileMenuBtn.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Sticky Header on Scroll
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  header.classList.toggle('sticky', window.scrollY > 0);
});

// <!-- Updated Countdown Timer Script for 20th of the month -->
// Function to calculate the next 20th of the month
function getNext20th() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const currentDate = now.getDate();

  // If today is before the 20th of this month
  if (currentDate < 20) {
    return new Date(currentYear, currentMonth, 20, 9, 0, 0);
  }
  // Otherwise return 20th of next month
  else {
    // Handle December -> January transition
    if (currentMonth === 11) {
      return new Date(currentYear + 1, 0, 20, 9, 0, 0);
    } else {
      return new Date(currentYear, currentMonth + 1, 20, 9, 0, 0);
    }
  }
}

// Set the target date to the next 20th at 9:00 AM
const countDownDate = getNext20th().getTime();

// Update the countdown every second
const countdownInterval = setInterval(updateCountdown, 1000);

function updateCountdown() {
  // Get current date and time
  const now = new Date().getTime();

  // Calculate the distance between now and the countdown date
  const distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the results
  document.getElementById("days").innerHTML = days.toString().padStart(2, "0");
  document.getElementById("hours").innerHTML = Math.floor(hours)
    .toString()
    .padStart(2, "0");
  document.getElementById("minutes").innerHTML = minutes
    .toString()
    .padStart(2, "0");
  document.getElementById("seconds").innerHTML = seconds
    .toString()
    .padStart(2, "0");

  // If the countdown is finished
  if (distance < 0) {
    clearInterval(countdownInterval);
    document.getElementById("days").innerHTML = "00";
    document.getElementById("hours").innerHTML = "00";
    document.getElementById("minutes").innerHTML = "00";
    document.getElementById("seconds").innerHTML = "00";

    // Update the heading to show event has arrived
    document.querySelector(".countdown h2").textContent =
      "The event has started!";
  }
}

// Initial call to avoid 1-second delay
updateCountdown();

// 

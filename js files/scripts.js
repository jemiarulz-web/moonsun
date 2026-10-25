
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
const countdownElements = ["days", "hours", "minutes", "seconds"].map((id) =>
  document.getElementById(id)
);
const countdownInterval = countdownElements.every(Boolean)
  ? setInterval(updateCountdown, 1000)
  : null;

function updateCountdown() {
  if (!countdownElements.every(Boolean)) return;

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
  countdownElements[0].innerHTML = days.toString().padStart(2, "0");
  countdownElements[1].innerHTML = Math.floor(hours)
    .toString()
    .padStart(2, "0");
  countdownElements[2].innerHTML = minutes
    .toString()
    .padStart(2, "0");
  countdownElements[3].innerHTML = seconds
    .toString()
    .padStart(2, "0");

  // If the countdown is finished
  if (distance < 0) {
    clearInterval(countdownInterval);
    countdownElements.forEach((element) => {
      element.innerHTML = "00";
    });

    // Update the heading to show event has arrived
    document.querySelector(".countdown h2").textContent =
      "The event has started!";
  }
}

// Initial call to avoid 1-second delay
updateCountdown();

document.querySelectorAll('.box-rating').forEach((rating) => {
  const score = Number(rating.querySelector('strong')?.textContent);
  const starContainer = rating.querySelector('[aria-hidden="true"]');

  if (!starContainer || !Number.isFinite(score)) return;

  const filledStars = Math.round(score);
  starContainer.replaceChildren(...Array.from({ length: 5 }, (_, index) => {
    const star = document.createElement('span');
    star.className = index < filledStars ? 'star-filled' : 'star-empty';
    star.textContent = index < filledStars ? '★' : '☆';
    return star;
  }));
});

const orderDialog = document.getElementById('order-dialog');
const orderForm = document.getElementById('order-form');

if (orderDialog && orderForm) {
  const orderProduct = document.getElementById('order-product');
  const orderProductInput = document.getElementById('order-product-input');
  const orderStatus = document.getElementById('order-status');
  const orderSubmit = orderForm.querySelector('button[type="submit"]');
  const countrySelect = document.getElementById('order-country');
  const countryNames = typeof Intl.DisplayNames === 'function'
    ? new Intl.DisplayNames(['en'], { type: 'region' })
    : null;

  if (countryNames && countrySelect) {
    const countries = [];

    for (let first = 65; first <= 90; first += 1) {
      for (let second = 65; second <= 90; second += 1) {
        const code = String.fromCharCode(first, second);
        const name = countryNames.of(code);

        if (name && name !== code && name !== 'Unknown Region') {
          countries.push({ code, name });
        }
      }
    }

    countries.sort((left, right) => left.name.localeCompare(right.name));
    countries.forEach(({ name }) => {
      countrySelect.add(new Option(name, name));
    });
  }

  document.querySelectorAll('.buy-button').forEach((button) => {
    button.addEventListener('click', () => {
      const product = button.dataset.product;
      orderForm.reset();
      orderProduct.textContent = product;
      orderProductInput.value = product;
      orderStatus.textContent = '';
      orderSubmit.disabled = false;
      orderSubmit.textContent = 'Send order request';
      orderDialog.showModal();
    });
  });

  orderDialog.querySelector('.order-close').addEventListener('click', () => {
    orderDialog.close();
  });

  orderDialog.addEventListener('click', (event) => {
    if (event.target === orderDialog) orderDialog.close();
  });

  orderForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    orderSubmit.disabled = true;
    orderStatus.textContent = 'Sending your order request...';

    try {
      const response = await fetch('https://formsubmit.co/ajax/jemiarulz@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(new FormData(orderForm)))
      });
      const result = await response.json();

      if (!response.ok || result.success === false || result.success === 'false') {
        throw new Error('Order request failed');
      }

      orderStatus.textContent = 'Request sent. MoonSun will email you to confirm availability and payment details.';
      orderSubmit.textContent = 'Request sent';
    } catch {
      orderStatus.textContent = 'Could not send your request. Please try again.';
      orderSubmit.disabled = false;
    }
  });
}

const newsletterForm = document.getElementById('newsletter-form');

newsletterForm?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const status = document.getElementById('newsletter-status');
  const submitButton = newsletterForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  status.textContent = 'Submitting...';

  try {
    const response = await fetch('https://formsubmit.co/ajax/jemiarulz@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(Object.fromEntries(new FormData(newsletterForm)))
    });
    const result = await response.json();

    if (!response.ok || result.success === false || result.success === 'false') {
      throw new Error('Newsletter submission failed');
    }

    status.textContent = 'Thanks for subscribing. Confirm the activation email if this is your first submission.';
    newsletterForm.reset();
  } catch {
    status.textContent = 'Could not submit your signup. Please try again.';
  } finally {
    submitButton.disabled = false;
  }
});

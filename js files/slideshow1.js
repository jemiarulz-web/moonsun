const heroText =
  document.getElementById("hero-text");
const messages = [
  "MoonSun creates immersive mystery experience for those who believe there is more to existence than what we can see.",
  "Discover hidden stories, mysterious world, and experience beyond imagination.",
  "Join a community of curious minds searching for deeper meaning and connection.",
  "Step beyond the ordinary and explore the unknown.",
  "There are things you cannot explain.",
  "Things you have felt.",
  "Things you have believed in.",
  "Things you have wondered about."
];

let currentMessage = 0;
function changeText() {
  //fade out 
  heroText.classList.add("fade-out");
  setTimeout(() => {
    //Move to next message
    currentMessage++;
    if (currentMessage >= messages.length) {
      currentMessage = 0;
    }
    //Change text
    heroText.textContent = messages[currentMessage];
    //Fade in
    heroText.classList.remove("fade-out");
  }, 800);
}
//Change text every 5 seconds
setInterval(changeText, 5000);


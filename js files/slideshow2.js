const slideshowHeroText = document.getElementById("hero-text");
const holymessages = [
  "MoonSun creates immersive mystery experience for those who believe there is more to existence than what we can see.",
  "Discover hidden stories, mysterious world, and experience beyond imagination",
  "Join a community of curious minds searching for deeper meaning and connection.",
  "Step beyond the ordinary and explore the unknown."
];

let presentMessage = 0;
function changeText() {
  if (!slideshowHeroText) return;

  //fade out
  slideshowHeroText.classList.add("fade-out");
  setTimeout(() => {
    //Move to next message
    presentMessage++;
    if (presentMessage >= holymessages.length) {
      presentMessage = 0;
    }
    //Change text
    slideshowHeroText.textContent = holymessages[presentMessage];
    //Fade in
    slideshowHeroText.classList.remove("fade-out");
  }, 500);
}
//Change text every 5 seconds
if (slideshowHeroText) {
  setInterval(changeText, 4000);
}
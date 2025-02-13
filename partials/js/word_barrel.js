const wrapper = document.querySelector(".words");
const words = wrapper.querySelectorAll("span");
const currentWord = wrapper.querySelector("span.current");
const wordsWidths = Array.from(words).map((word) => word.offsetWidth);
const maxWordsWidth = Math.max(...wordsWidths);
const CURRENT_CLASS = "current";
const NEXT_CLASS = "next";

const colors = [
  { bg: "#ff6232", text: "#fffffa" },
  { bg: "#1375DB", text: "#333330" },
  { bg: "#333330", text: "#FCFF55" },
  { bg: "#1375DB", text: "#fffffa" },
  { bg: "#ff6232", text: "#333330" },
  { bg: "#FCFF55", text: "#333330" },
  { bg: "#333330", text: "#fffffa" },

];

let colorIndex = 0;

wrapper.style.setProperty("--width", `${currentWord.offsetWidth}px`);
wrapper.style.setProperty("--width-mobile", `${maxWordsWidth}px`);
wrapper.style.setProperty("--color", colors[0].text);
wrapper.style.setProperty("--color-bg", colors[0].bg);

setInterval(() => {
  const currentWord = wrapper.querySelector("span.current");
  const nextWord = wrapper.querySelector("span.next");
  const nextNextWord = nextWord.nextElementSibling
    ? nextWord.nextElementSibling
    : wrapper.firstElementChild;
  
  currentWord.classList.remove(CURRENT_CLASS);
  nextWord.classList.remove(NEXT_CLASS);
  nextWord.classList.add(CURRENT_CLASS);
  nextNextWord.classList.add(NEXT_CLASS);

  colorIndex = (colorIndex + 1) % colors.length;

  wrapper.style.setProperty("--color", colors[colorIndex].text);
  wrapper.style.setProperty("--color-bg", colors[colorIndex].bg);
  wrapper.style.setProperty("--width", `${nextWord.offsetWidth}px`);
}, 1500);

document.addEventListener("DOMContentLoaded", function () {
  const checkmarks = document.querySelectorAll(".checkmark");

  const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add("visible"); // Add class when visible
          } else {
              entry.target.classList.remove("visible"); // Remove if it leaves viewport (optional)
          }
      });
  }, { threshold: .9 }); // Adjust threshold (0.5 = 50% in view)

  checkmarks.forEach(checkmark => {
      observer.observe(checkmark);
  });
});
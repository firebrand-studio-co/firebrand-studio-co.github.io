const hero = document.querySelector(".animatedbg");

// Dynamically determine the number of shapes based on screen size.
// You can tweak the formula below as needed.
let maxShapes = Math.floor((window.innerWidth * window.innerHeight) / 20000);
// Provide a minimum and/or maximum cap if desired:
maxShapes = Math.max(10, Math.min(maxShapes, 50)); // e.g., between 10 and 50

for (let i = 0; i < maxShapes; i++) {
  let shape = document.createElement("div");

  // Use a random distribution for shape types:
  // 50% plus signs, 30% outlines, 20% circles
  const rand = Math.random();
  let shapeClass;
  if (rand < 0.5) {
    shapeClass = "plus";           // 50%
  } else if (rand < 0.8) {
    shapeClass = "circle outline"; // 30%
  } else {
    shapeClass = "circle";         // 20%
  }
  
  shape.className = "shape " + shapeClass;

  shape.style.setProperty("--size", Math.random());
  shape.style.setProperty("--position", Math.random());
  shape.style.setProperty("--speed", Math.random());
  shape.style.setProperty("--delay", Math.random());
  shape.style.setProperty("--start", Math.random());

  // If this is a plus sign, use the "+" symbol
  if (shape.classList.contains("plus")) {
    shape.innerHTML = "+";
  }

  hero.appendChild(shape);
}

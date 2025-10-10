import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

document.body.innerHTML = `
  <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
`;
console.log("ello :3");

let counter: number = 0;
let lastTimestamp: number = 0;

document.body.innerHTML = `
  <h1>CMPM 121 Project</h1>
  <p>Counter: <span id="counter">0</span></p>
  <button id="increment">😱</button>
`;

const button = document.getElementById("increment")!;
const counterElement = document.getElementById("counter")!;

button.addEventListener("click", () => {
  counter += 1;
  counterElement.textContent = counter.toString();
  console.log("clicked", button, counterElement, counter);
});

function animate(timestamp: number) {
  if (lastTimestamp !== 0) {
    const deltaTime = timestamp - lastTimestamp; //time in milliseconds
    const increment = deltaTime / 1000; //convert it into seconds
    counter += increment;
    counterElement.textContent = counter.toFixed(2); //2 decimal places
  }

  lastTimestamp = timestamp;
  requestAnimationFrame(animate);
}

//starts here
requestAnimationFrame(animate);

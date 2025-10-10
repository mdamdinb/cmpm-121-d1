import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

document.body.innerHTML = `
  <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
`;
console.log("ello :3");

let counter: number = 0;
let growthRate: number = 0;
let lastTimestamp: number = 0;

document.body.innerHTML = `
  <h1>CMPM 121 Project</h1>
  <p>Counter: <span id="counter">0</span></p>
  <button id="increment">😱</button>
  <br><br>
  <button id="upgrade" disabled>Purchase Upgrade (Cost: 10)</button>
  <p>Growth Rate: <span id="growth-rate">0</span> per second</p>
`;

const button = document.getElementById("increment")!;
const counterElement = document.getElementById("counter")!;
const upgradeButton = document.getElementById("upgrade")! as HTMLButtonElement;
const growthRateElement = document.getElementById("growth-rate")!;

function updateUpgradeButton() { //have to wait till 10 sec
  upgradeButton.disabled = counter < 10;
}

button.addEventListener("click", () => {
  counter += 1;
  counterElement.textContent = counter.toString();
  console.log("clicked", button, counterElement, counter);
});

//to purchase upgrade
upgradeButton.addEventListener("click", () => {
  if (counter >= 10) {
    counter -= 10; //remove 10 units not reset
    growthRate += 1;
    counterElement.textContent = counter.toFixed(2);
    growthRateElement.textContent = growthRate.toString();
    updateUpgradeButton();
    console.log("Upgrade purchased! New growth rate:", growthRate);
  }
});

function animate(timestamp: number) {
  if (lastTimestamp !== 0) {
    const deltaTime = timestamp - lastTimestamp; //time in milliseconds
    const increment = deltaTime / 1000; //convert it into seconds
    counter += increment;
    counterElement.textContent = counter.toFixed(2); //2 decimal places
    updateUpgradeButton(); //checks if the button should be enabled/disabled
  }

  lastTimestamp = timestamp;
  requestAnimationFrame(animate);
}

//starts here
requestAnimationFrame(animate);

//initail button state
updateUpgradeButton();

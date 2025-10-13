import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

document.body.innerHTML = `
  <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
`;
console.log("ello :3");

let counter: number = 0;
let growthRate: number = 0;
let lastTimestamp: number = 0;

let countA: number = 0;
let countB: number = 0;
let countC: number = 0;

document.body.innerHTML = `
  <h1>CMPM 121 Project</h1>
  <p>Counter: <span id="counter">0</span></p>
  <button id="increment">😱</button>
  <br><br>
  <button id="upgradeA" disabled>Purchase A (Cost: 10, Rate: +0.1/sec)</button>
  <br>
  <button id="upgradeB" disabled>Purchase B (Cost: 100, Rate: +2.0/sec)</button>
  <br>
  <button id="upgradeC" disabled>Purchase C (Cost: 1000, Rate: +50/sec)</button>
  <p>Growth Rate: <span id="growth-rate">0.00</span> units/sec</p>
  <p>A purchased: <span id="countA">0</span></p>
  <p>B purchased: <span id="countB">0</span></p>
  <p>C purchased: <span id="countC">0</span></p>
  <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
`;

const button = document.getElementById("increment")!;
const counterElement = document.getElementById("counter")!;
const upgradeAButton = document.getElementById(
  "upgradeA",
)! as HTMLButtonElement;
const upgradeBButton = document.getElementById(
  "upgradeB",
)! as HTMLButtonElement;
const upgradeCButton = document.getElementById(
  "upgradeC",
)! as HTMLButtonElement;
const growthRateElement = document.getElementById("growth-rate")!;
const countAElement = document.getElementById("countA")!;
const countBElement = document.getElementById("countB")!;
const countCElement = document.getElementById("countC")!;

function updateUpgradeButton() { //have to wait till 10 sec
  upgradeAButton.disabled = counter < 10;
  upgradeBButton.disabled = counter < 100;
  upgradeCButton.disabled = counter < 1000;
}

button.addEventListener("click", () => {
  counter += 1;
  counterElement.textContent = counter.toString();
  console.log("clicked", button, counterElement, counter);
});

//to purchase upgrade
upgradeAButton.addEventListener("click", () => {
  if (counter >= 10) {
    counter -= 10; //remove 10 units not reset
    countA += 1;
    growthRate += 1;
    counterElement.textContent = counter.toFixed(2);
    growthRateElement.textContent = growthRate.toFixed(2);
    countAElement.textContent = countA.toString();
    updateUpgradeButton();
    console.log("A purchased! Count:", countA, "New growth rate:", growthRate);
  }
});

upgradeBButton.addEventListener("click", () => {
  if (counter >= 100) {
    counter -= 100;
    countB += 1;
    growthRate += 2.0;
    counterElement.textContent = counter.toFixed(2);
    growthRateElement.textContent = growthRate.toFixed(2);
    countBElement.textContent = countB.toString();
    updateUpgradeButton();
    console.log("B purchased! Count:", countB, "Growth rate:", growthRate);
  }
});

upgradeCButton.addEventListener("click", () => {
  if (counter >= 1000) {
    counter -= 1000;
    countC += 1;
    growthRate += 50;
    counterElement.textContent = counter.toFixed(2);
    growthRateElement.textContent = growthRate.toFixed(2);
    countCElement.textContent = countC.toString();
    updateUpgradeButton();
    console.log("C purchased! Count:", countC, "Growth rate:", growthRate);
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

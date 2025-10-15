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

let costA: number = 10;
let costB: number = 100;
let costC: number = 1000;

document.body.innerHTML = `
  <h1>CMPM 121 Project</h1>
  <p>Counter: <span id="counter">0</span></p>
  <button id="increment">😱</button>
  <br><br>
  <button id="upgradeA" disabled>Purchase A (Cost: <span id="costA">10</span>, Rate: +0.1/sec)</button>
  <br>
  <button id="upgradeB" disabled>Purchase B (Cost: <span id="costB">100</span>, Rate: +2.0/sec)</button>
  <br>
  <button id="upgradeC" disabled>Purchase C (Cost: <span id="costC">1000</span>, Rate: +50/sec)</button>
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
const costAElement = document.getElementById("costA")!;
const costBElement = document.getElementById("costB")!;
const costCElement = document.getElementById("costC")!;

function updateUpgradeButton() { //have to wait till 10 sec
  upgradeAButton.disabled = counter < costA;
  upgradeBButton.disabled = counter < costB;
  upgradeCButton.disabled = counter < costC;
}

button.addEventListener("click", () => {
  counter += 1;
  counterElement.textContent = counter.toString();
  console.log("clicked", button, counterElement, counter);
});

//to purchase upgrade
upgradeAButton.addEventListener("click", () => {
  if (counter >= costA) {
    counter -= costA;
    countA += 1;
    growthRate += 0.1;
    costA *= 1.15;
    counterElement.textContent = counter.toFixed(2);
    growthRateElement.textContent = growthRate.toFixed(2);
    countAElement.textContent = countA.toString();
    costAElement.textContent = costA.toFixed(2);
    updateUpgradeButton();
    console.log(
      "A purchased! Count:",
      countA,
      "New cost:",
      costA.toFixed(2),
      "Growth rate:",
      growthRate,
    );
  }
});

upgradeBButton.addEventListener("click", () => {
  if (counter >= costB) {
    counter -= costB;
    countB += 1;
    growthRate += 2.0;
    costB *= 1.15;
    counterElement.textContent = counter.toFixed(2);
    growthRateElement.textContent = growthRate.toFixed(2);
    countBElement.textContent = countB.toString();
    costBElement.textContent = costB.toFixed(2);
    updateUpgradeButton();
    console.log(
      "B purchased! Count:",
      countB,
      "New cost:",
      costB.toFixed(2),
      "Growth rate:",
      growthRate,
    );
  }
});

upgradeCButton.addEventListener("click", () => {
  if (counter >= costC) {
    counter -= costC;
    countC += 1;
    growthRate += 50;
    costC *= 1.15;
    counterElement.textContent = counter.toFixed(2);
    growthRateElement.textContent = growthRate.toFixed(2);
    countCElement.textContent = countC.toString();
    costCElement.textContent = costC.toFixed(2);
    updateUpgradeButton();
    console.log("C purchased! Count:", countC, "Growth rate:", growthRate);
  }
});

function animate(timestamp: number) {
  if (lastTimestamp !== 0) {
    const deltaTime = timestamp - lastTimestamp; //time in milliseconds
    const increment = (deltaTime / 1000) * growthRate; //convert it into seconds
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

import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

document.body.innerHTML = `
  <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
`;
console.log("ello :3");

interface Item {
  name: string;
  cost: number;
  rate: number;
}

const availableItems: Item[] = [
  { name: "Retweet Bot", cost: 10, rate: 0.1 },
  { name: "Influencer", cost: 100, rate: 2.0 },
  { name: "Algorithm", cost: 1000, rate: 50 },
];

let counter: number = 0;
let growthRate: number = 0;
let lastTimestamp: number = 0;

const counts: number[] = [0, 0, 0];
const costs: number[] = [10, 100, 1000];

// LOOP to generate button HTML
let upgradeButtonsHTML = "";
for (let i = 0; i < availableItems.length; i++) {
  const item = availableItems[i];
  upgradeButtonsHTML += `
    <button id="upgrade${i}" disabled>${item.name} (Cost: <span id="cost${i}">${item.cost}</span> likes, Rate: +${item.rate}/sec)</button>
    <br>
  `;
}

document.body.innerHTML = `
  <h1>TikTak Likes Farm</h1>
  <p>Likes: <span id="counter">0</span></p>
  <button id="increment" style="font-size: 48px; padding: 20px;">❤️</button>
  <p style="font-size: 12px; color: gray;">Click to generate likes!</p>
  <br><br>
  <br><br>
  ${upgradeButtonsHTML}
  <p>Growth Rate: <span id="growth-rate">0.00</span> likes/sec</p>
`;

// LOOP to generate stats HTML
for (let i = 0; i < availableItems.length; i++) {
  const item = availableItems[i];
  document.body.innerHTML +=
    `<p>${item.name}s purchased: <span id="count${i}">0</span></p>`;
}

document.body.innerHTML +=
  `<p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>`;

const button = document.getElementById("increment")!;
const counterElement = document.getElementById("counter")!;
const growthRateElement = document.getElementById("growth-rate")!;

const upgradeButtons: HTMLButtonElement[] = [];
const costElements: HTMLElement[] = [];
const countElements: HTMLElement[] = [];

for (let i = 0; i < availableItems.length; i++) {
  upgradeButtons.push(
    document.getElementById(`upgrade${i}`)! as HTMLButtonElement,
  );
  costElements.push(document.getElementById(`cost${i}`)!);
  countElements.push(document.getElementById(`count${i}`)!);
}
function updateUpgradeButton() { //have to wait till 10 sec
  for (let i = 0; i < availableItems.length; i++) {
    upgradeButtons[i].disabled = counter < costs[i];
  }
}

button.addEventListener("click", () => {
  counter += 1;
  counterElement.textContent = counter.toString();
  console.log("clicked", button, counterElement, counter);
});

//to purchase upgrade
for (let i = 0; i < availableItems.length; i++) {
  upgradeButtons[i].addEventListener("click", () => {
    if (counter >= costs[i]) {
      const item = availableItems[i];
      counter -= costs[i];
      counts[i] += 1;
      growthRate += item.rate;
      costs[i] *= 1.15;

      counterElement.textContent = counter.toFixed(2);
      growthRateElement.textContent = growthRate.toFixed(2);
      countElements[i].textContent = counts[i].toString();
      costElements[i].textContent = costs[i].toFixed(2);
      updateUpgradeButton();

      console.log(
        `${item.name} purchased! Count: ${counts[i]}, New cost: ${
          costs[i].toFixed(2)
        }, Growth rate: ${growthRate}`,
      );
    }
  });
}

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

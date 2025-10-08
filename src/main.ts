import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

document.body.innerHTML = `
  <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
`;
console.log("ello :3");

// src/main.ts
const button = document.createElement("button");
button.textContent = "Click me";
button.onclick = () => {
  alert("Hello World");
};

document.body.appendChild(button);

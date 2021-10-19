console.log("hello there i'm project");
const addBtn = document.getElementById("add-project-btn");
const projectInput = document.getElementById("add-project-input");
const mainDisplay = document.querySelector(".main-display");
addBtn.addEventListener("click", (e) => {
  if (projectInput.value) {
    const newDiv = document.createElement("div");
    newDiv.innerText = projectInput.value;
    mainDisplay.appendChild(newDiv);
    projectInput.value = "";
  }
});

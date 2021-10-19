const addBtn = document.getElementById("add-project-btn");
const projectName = document.getElementById("add-project-name");
const dueDate = document.getElementById("add-project-date");
const mainDisplay = document.querySelector(".main-display");
addBtn.addEventListener("click", async(e) => {
  if (projectName.value) {
    const newDiv = document.createElement("div");
    const subDiv = document.createElement("div");
    newDiv.innerText = projectName.value;
    if(dueDate.value) {
      subDiv.innerText = dueDate.value;
    }
    mainDisplay.appendChild(newDiv);
    newDiv.appendChild(subDiv);
    // dueDate.value= "";
    // projectName.value= "";
  }
});

const addBtn = document.getElementById("add-project-btn");
const projectName = document.getElementById("add-project-name");
const dueDate = document.getElementById("add-project-date");
const mainDisplay = document.querySelector(".main-display");
const form = document.querySelector(".project-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const name = formData.get("name");
  const content = formData.get("content");
  const dueDate = formData.get("dueDate");
  const body = { name, content, dueDate };
  try {
    const projects = await fetch("http://localhost:8080/projects", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    if (e.status == 401) {
      window.location.href = "/users/login";
    }
  }
});

addBtn.addEventListener("click", async (e) => {
  if (projectName.value) {
    const newDiv = document.createElement("div");
    const subDiv = document.createElement("div");
    newDiv.innerText = projectName.value;
    if (dueDate.value) {
      subDiv.innerText = dueDate.value;
    }
    mainDisplay.appendChild(newDiv);
    newDiv.appendChild(subDiv);
    // dueDate.value= "";
    // projectName.value= "";
  }
});

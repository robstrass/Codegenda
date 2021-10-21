const addBtn = document.getElementById("add-project-btn");
const projectName = document.getElementById("add-project-name");
const dueDate = document.getElementById("add-project-date");
const mainDisplay = document.querySelector(".main-display");
const form = document.querySelector(".project-form");
const incompleteProjects = document.querySelector("#incomplete-projects-list");

// helper function: post project to database &
// return json data for projects
const formFunc = async () => {
  const formData = new FormData(form);
  const name = formData.get("name");
  const content = formData.get("content");
  const dueDate = formData.get("dueDate");
  const body = { name, content, dueDate };
  try {
    const res = await fetch("/projects", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const newProject = await res.json();
    // console.log('hello from new proj', newProject)
    return newProject;
  } catch (e) {
    if (e.status == 401) {
      window.location.href = "/users/login";
    }
  }
};

// helper function to add event listener to project
const addEventListenerToProject = (project) => {
  project.addEventListener("click", async (e) => {
    const id = project.id.split("-")[1];

    try {
      const res = await fetch(`/projects/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 401) {
        window.location.href("users/login");
        return;
      }

      const { project } = await res.json();
      const singleProjectDiv = document.querySelector("#single-project");
      const { name, content, dueDate } = project;
      singleProjectDiv.innerHTML = "";
      singleProjectDiv.innerHTML = `<div id="single-project-holder"><div id="single-project-name-${id}">${name}</div><div id="single-project-content-${id}">${content}</div><div id="single-project-dueDate-${id}">${dueDate}</div><button class="project-edit" id="edit-${id}">Edit</button><button class="project-delete" id="delete-${id}">Delete</button></div>`;
    } catch (e) {}
  });
};

// actual event listener to create the divs to display on screen
addBtn.addEventListener("click", async (e) => {
  const returnVal = await formFunc();
  console.log(returnVal);

  const { id, name, content, dueDate } = returnVal;
  if (projectName.value) {
    const newDiv = document.createElement("div");
    newDiv.className = "project-name";
    newDiv.id = `project-${id}`;
    const subDiv = document.createElement("div");
    // const editBtn = document.createElement("a")
    newDiv.innerText = projectName.value;
    if (dueDate.value) {
      subDiv.innerText = dueDate.value;
    }
    incompleteProjects.appendChild(newDiv);
    newDiv.appendChild(subDiv);
    // dueDate.value= "";
    // projectName.value= "";
    addEventListenerToProject(newDiv);
  }
});

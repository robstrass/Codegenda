document.addEventListener("DOMContentLoaded", async (e) => {
  try {
    const res = await fetch("/projects", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 401) {
      window.location.href("/users/login");
      return;
    }
    const { projects } = await res.json();
    const incompleteProjects = document.querySelector(
      "#incomplete-projects-list"
    );
    // console.log(incompleteProjects);
    // console.log(projects);
    const newArr = projects.map(({ name, dueDate, id }) => {
      return `<div class="project-name" id="project-${id}">${name}
            <div class="project-dueDate" id="dueDate-${id}">${dueDate}</div></div>`;
    });
    // console.log(newArr);
    incompleteProjects.innerHTML = newArr.join("");
  } catch (e) {}

  // grabs individual projects
  const allProjects = document.querySelectorAll(".project-name");

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
        //Selectint the delete button upon viewing a project to allow delete button functionality
        const deleteButton = document.querySelector(".project-delete");
        deleteButton.addEventListener("click", async (e) => {
          try {
            const mainListProject = document.querySelector(`#project-${id}`);
            const selectedProject = document.querySelector(
              "#single-project-holder"
            );
            mainListProject.remove();
            selectedProject.remove();
            const res = await fetch(`/projects/${id}`, {
              method: "DELETE",
            });
          } catch (e) {}
        });
        // This is for the edit button to work:
        const editBtn = document.querySelector(".project-edit");
        console.log(editBtn);

        editBtn.addEventListener("click", async (e) => {
          try {
            const checkEditContainer = document.querySelector("#editContainer");
            if (!checkEditContainer) {
              console.log("bang bang");
              const editContainerDiv = document.createElement("div");
              editContainerDiv.id = "editContainer";
              const inputBoxName = document.createElement("input");
              const inputBoxContent = document.createElement("input");
              const inputBoxDueDate = document.createElement("input");
              inputBoxName.placeholder = "Edit name";
              inputBoxContent.placeholder = "Edit content";
              inputBoxDueDate.type = "date";
              const submitBtn = document.createElement("button");
              submitBtn.innerHTML = "submit";

              editContainerDiv.appendChild(inputBoxName);
              editContainerDiv.appendChild(inputBoxContent);
              editContainerDiv.appendChild(inputBoxDueDate);
              editContainerDiv.appendChild(submitBtn);
              singleProjectDiv.appendChild(editContainerDiv);
              //To replace values in our project and delete the edit fields
              submitBtn.addEventListener("click", async (e) => {
                e.preventDefault();
                if (inputBoxName.value) {
                  const nameValue = inputBoxName.value;
                  const contentValue = inputBoxContent.value;
                  const dateValue = inputBoxDueDate.value;
                  //Changing main display project content
                  const mainDisplayProjectName = document.querySelector(
                    `#project-${id}`
                  );
                  const mainDisplayDueDate = document.querySelector(
                    `#dueDate-${id}`
                  );
                  const prevNameValue = document.querySelector(
                    `#single-project-name-${id}`
                  );
                  const prevContent = document.querySelector(
                    `#single-project-content-${id}`
                  );
                  const prevDate = document.querySelector(
                    `#single-project-dueDate-${id}`
                  );
                  if (nameValue) {
                    prevNameValue.innerHTML = nameValue;
                    mainDisplayProjectName.innerText = nameValue;
                  }
                  if (contentValue) {
                    prevContent.innerHTML = contentValue;
                  }
                  if (dateValue) {
                    prevDate.innerHTML = dateValue;
                    mainDisplayDueDate.innerHTML = dateValue;
                  }
                }
              });
            }
          } catch (e) {}
        });
      } catch (e) {}
    });
  };
  allProjects.forEach((project) => {
    addEventListenerToProject(project);
  });
});

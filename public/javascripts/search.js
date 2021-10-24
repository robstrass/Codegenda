// import { addTaskFunc } from "./add-task";
// import {
//     editButtonFunctionality,
//     deleteButtonFunctionality,
// } from "./projectsList";
//not currently working here ^
const searchButton = document.querySelector("#search-button");
const searchInput = document.querySelector("#searchTerm");
const incompleteProjects = document.querySelector("#incomplete-projects-list");
searchButton.addEventListener("click", async(e) => {
    e.preventDefault();
    let searchTerm = searchInput.value;
    try {
        const res = await fetch(`/search/${searchTerm}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const { searchedProjects } = await res.json();
        incompleteProjects.innerHTML = "";
        console.log("hello i am here");
        const searchArr = searchedProjects.map(({ name, dueDate, id }) => {
            let newDueDate = dueDate.split("T")[0];
            return `<div id="project-container-${id}" class="project-container-class"><div class="project-name" id="project-${id}">${name}
                </div><div class="project-dueDate" id="dueDate-${id}">${newDueDate}</div></div>`;
        });

        incompleteProjects.innerHTML = searchArr.join("");
    } catch (e) {}
    const allProjects = document.querySelectorAll(".project-container-class");

    const addEventListenerToProject = (project) => {
        project.addEventListener("click", async(e) => {
            const id = project.id.split("-")[2];

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
                let newDueDate = dueDate.split("T")[0];
                singleProjectDiv.innerHTML = "";
                singleProjectDiv.innerHTML = `<div id="single-project-holder"><div id="single-project-name-${id}">${name}</div><div id="single-project-content-${id}">${content}</div><div id="single-project-dueDate-${id}">${newDueDate}</div><button class="add-tasks" id="project-${id}-task">Add a Task</button><button class="project-edit" id="edit-${id}">Edit</button><button class="project-delete" id="delete-${id}">Delete</button></div><div id='task-errors'></div><div id='task-container'></div></div>`;
                const taskContainer = document.querySelector("#task-container");
                //need to import to uncomment
                // deleteButtonFunctionality(id);
                // editButtonFunctionality(id);
                // addTaskFunc(id);

                const resTask = await fetch(`/tasks/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                // const resTaskData = await resTask.json();
                // console.log("a thing so you know", resTaskData.id);
                if (resTask.status == 401) {
                    window.location.href = "/users/login";
                } else {
                    const { tasks } = await resTask.json();
                    const taskArr = tasks.map(
                        ({ name, content, language, dueDate, id }) => {
                            let newDueDate = dueDate.split("T")[0];
                            return `<div id="task-container-${id}" class="task-container-class"><div class="task-name" id="task-name-${id}">${name}</div><div class='task-content' id='task-content-${id}'>${content}</div><div class='task-language' id='task-language-${id}'>${language}</div><div class="task-dueDate" id="task-dueDate-${id}">${newDueDate}</div><button class="edit-task-button" id="task-edit-btn-${id}">Edit Task</button><button class="delete-task-button" id="task-delete-btn-${id}">Delete Task</button></div>`;
                        }
                    );
                    taskContainer.innerHTML = taskArr.join("");
                }
                const taskDeleteButton = document.querySelector(".delete-task-button");
                const buttonIdString = taskDeleteButton.getAttribute("id");
                const taskId = buttonIdString.split("-")[3];
                const taskHolder = document.querySelector(`#task-container-${taskId}`);

                taskDeleteButton.addEventListener("click", async(e) => {
                    try {
                        const res = await fetch(`/tasks/${id}/${taskId}`, {
                            method: "DELETE",
                        });
                        taskHolder.remove();
                    } catch (e) {}
                });
            } catch (e) {}
        });
    };
    allProjects.forEach((project) => {
        addEventListenerToProject(project);
    });
});

//add project details, edit, delete, add task, task details, edit task, delete task.
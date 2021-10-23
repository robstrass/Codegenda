import { addTaskFunc } from "./add-task.js";

const deleteButtonFunctionality = (id) => {
    const deleteButton = document.querySelector(".project-delete");
    deleteButton.addEventListener("click", async(e) => {
        try {
            const mainProjectHolder = document.querySelector(
                `#project-container-${id}`
            );
            const editContainer = document.querySelector(`#editContainer`);
            const selectedProject = document.querySelector("#single-project-holder");
            const singleProject = document.querySelector("#single-project");
            const newTaskHolder = document.querySelector(".new-task-container");
            const taskContainer = document.querySelector("#task-container");
            //const mainProjectDueDate = document.querySelector(`#dueDate-${id}`);
            selectedProject.remove();
            mainProjectHolder.remove();
            if (editContainer) {
                editContainer.remove();
            }
            if (newTaskHolder) {
                newTaskHolder.remove();
            }
            if (taskContainer) {
                taskContainer.remove();
            }
            const res = await fetch(`/projects/${id}`, {
                method: "DELETE",
            });
        } catch (e) {}
    });
};

const editButtonFunctionality = (id) => {
    const editBtn = document.querySelector(".project-edit");
    editBtn.addEventListener("click", async(e) => {
        try {
            const checkEditContainer = document.querySelector("#editContainer");
            if (!checkEditContainer) {
                const editContainerDiv = document.createElement("div");
                editContainerDiv.id = "editContainer";
                const inputBoxName = document.createElement("input");
                const inputBoxContent = document.createElement("input");
                const inputBoxDueDate = document.createElement("input");
                const singleProjectDivEdit = document.querySelector(
                    "#single-project-holder"
                );
                inputBoxName.placeholder = "Edit name";
                inputBoxContent.placeholder = "Edit content";
                inputBoxDueDate.type = "date";
                const submitBtn = document.createElement("button");
                submitBtn.innerHTML = "submit";

                const singleHolderDiv = document.querySelector(
                    "#single-project-holder"
                );

                editContainerDiv.appendChild(inputBoxName);
                editContainerDiv.appendChild(inputBoxContent);
                editContainerDiv.appendChild(inputBoxDueDate);
                editContainerDiv.appendChild(submitBtn);
                singleProjectDivEdit.appendChild(editContainerDiv);
                //To replace values in our project and delete the edit fields
                submitBtn.addEventListener("click", async(e) => {
                    e.preventDefault();
                    if (inputBoxName.value) {
                        let nameValue = inputBoxName.value;
                        let contentValue = inputBoxContent.value;
                        let dateValue = inputBoxDueDate.value;
                        //Changing main display project content
                        const mainDisplayProjectName = document.querySelector(
                            `#project-${id}`
                        );
                        const mainDisplayDueDate = document.querySelector(`#dueDate-${id}`);
                        const prevNameValue = document.querySelector(
                            `#single-project-name-${id}`
                        );
                        const prevContent = document.querySelector(
                            `#single-project-content-${id}`
                        );
                        const prevDate = document.querySelector(
                            `#single-project-dueDate-${id}`
                        );
                        // mainDisplayProjectName is main list stuff
                        // prevNameValue is original stuff
                        // nameValue is new stuff
                        // console.log('prev vals: ', prevNameValue.innerHTML, prevContent.innerHTML, prevDate.innerHTML);
                        if (nameValue) {
                            prevNameValue.innerText = nameValue;
                            mainDisplayProjectName.innerText = nameValue;
                        } else {
                            nameValue = prevNameValue.innerText;
                        }
                        if (contentValue) {
                            prevContent.innerText = contentValue;
                        } else {
                            contentValue = prevContent.innerText;
                        }
                        if (dateValue) {
                            prevDate.innerText = dateValue;
                            mainDisplayDueDate.innerText = dateValue;
                        } else {
                            dateValue = prevDate.innerText;
                        }
                        const name = nameValue;
                        const content = contentValue;
                        const dueDate = dateValue;
                        const body = { name, content, dueDate };
                        // console.log('editing: ', body, body.name, body.content, body.dueDate);
                        const res = await fetch(`/projects/${id}`, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(body),
                        });
                        if (res.status === 401) {
                            window.location.href("users/login");
                            return;
                        }
                    }
                    editContainerDiv.remove();
                    singleHolderDiv.remove();
                });
            }
        } catch (e) {}
    });
};
document.addEventListener("DOMContentLoaded", async(e) => {
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

        const newArr = projects.map(({ name, dueDate, id }) => {
            let newDueDate = dueDate.split("T")[0];
            return `<div id="project-container-${id}" class="project-container-class"><div class="project-name" id="project-${id}">${name}
            </div><div class="project-dueDate" id="dueDate-${id}">${newDueDate}</div></div>`;
        });

        incompleteProjects.innerHTML = newArr.join("");
    } catch (e) {}

    // grabs individual projects
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
                singleProjectDiv.innerHTML = `<div id="single-project-holder"><div id="single-project-name-${id}">${name}</div><div id="single-project-content-${id}">${content}</div><div id="single-project-dueDate-${id}">${newDueDate}</div><button class="add-tasks" id="project-${id}-task">Add a Task</button><button class="project-edit" id="edit-${id}">Edit</button><button class="project-delete" id="delete-${id}">Delete</button></div><div id='task-container'>All Tasks</div></div>`;
                const taskContainer = document.querySelector("#task-container");
                deleteButtonFunctionality(id);
                editButtonFunctionality(id);
                addTaskFunc(id);

                const resTask = await fetch(`/tasks/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (resTask.status == 401) {
                    window.location.href = "/users/login";
                } else {
                    const { tasks } = await resTask.json();
                    const taskArr = tasks.map(
                        ({ name, content, language, dueDate, id }) => {
                            let newDueDate = dueDate.split("T")[0];
                            return `<div id="task-container-${id}" class="task-container-class"><div class="task-name" id="task-${id}">${name}</div><div class='task-content' id='task-content-${id}'>${content}</div><div class='task-language' id='language-${id}'>${language}</div><div class="task-dueDate" id="task-dueDate-${id}">${newDueDate}</div><button>Delete Task</button></div>`;
                        }
                    );
                    console.log("a string with task", taskContainer);
                    taskContainer.innerHTML = taskArr.join("");
                    console.log("put a string", taskContainer);
                }
            } catch (e) {}
        });
    };
    allProjects.forEach((project) => {
        addEventListenerToProject(project);
    });
});
export { deleteButtonFunctionality, editButtonFunctionality };
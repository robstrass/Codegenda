import {
    deleteButtonFunctionality,
    editButtonFunctionality,
} from "./projectsList.js";
import { addTaskFunc } from "./add-task.js";

const addBtn = document.getElementById("add-project-btn");
const projectName = document.getElementById("add-project-name");
const dueDateDiv = document.getElementById("add-project-date");
const contentDiv = document.querySelector('#add-project-content');

const form = document.querySelector(".project-form");
const incompleteProjects = document.querySelector("#incomplete-projects-list");

// helper function: post project to database &
// return json data for projects
const formFunc = async() => {
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
        return newProject;
    } catch (e) {
        if (e.status == 401) {
            window.location.href = "/users/login";
        }
    }
};

// helper function to add event listener to project
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
            deleteButtonFunctionality(id);
            editButtonFunctionality(id);
            addTaskFunc(id);

        } catch (e) {}
    });
};

// actual event listener to create the divs to display on screen
addBtn.addEventListener("click", async(e) => {
    const returnVal = await formFunc();
    // console.log('testing', returnVal)
    const { errors } = returnVal
    console.log('errors arr', errors)

    const errorsDiv = document.querySelector('#project-errors');
    errorsDiv.innerHTML = '';
    if (errors && errors.length > 0) {
        const errorUL = document.createElement('ul');
        errorsDiv.appendChild(errorUL);
        errors.forEach(error => {
            const newErrMsg = document.createElement('li');
            newErrMsg.innerText = error;
            errorUL.appendChild(newErrMsg);
        })
    }


    const { id, name, content, dueDate } = returnVal;
    if (projectName.value) {
        const mainProjectContainer = document.createElement("div");
        mainProjectContainer.id = `project-container-${id}`;
        incompleteProjects.appendChild(mainProjectContainer);
        const newDiv = document.createElement("div");
        newDiv.className = "project-name";
        newDiv.id = `project-${id}`;
        const dateDiv = document.createElement("div");

        newDiv.innerText = projectName.value;
        let newDueDate = dueDate.split("T")[0];
        if (newDueDate) {
            dateDiv.innerText = newDueDate;
        }
        mainProjectContainer.appendChild(newDiv);
        mainProjectContainer.appendChild(dateDiv);

        addEventListenerToProject(mainProjectContainer);
        // console.log('add proj values: ', dueDateDiv.value, projectName.value)
        projectName.value = '';
        dueDateDiv.value = '';
        contentDiv.value = '';
        // console.log('after removing: ', projectName.value, dueDateDiv.value, contentDiv.value);
    }
});


const deleteButtonFunctionality = (id) => {
    const deleteButton = document.querySelector(".project-delete");
    deleteButton.addEventListener("click", async(e) => {
        console.log("delete", deleteButton);
        try {
            const mainProjectHolder = document.querySelector(
                `#project-container-${id}`
            );
            const mainListProject = document.querySelector(`#project-${id}`);
            const selectedProject = document.querySelector("#single-project-holder");
            const mainProjectDueDate = document.querySelector(`#dueDate-${id}`);
            // mainListProject.remove();
            selectedProject.remove();
            // mainProjectDueDate.remove();
            mainProjectHolder.remove();
            const res = await fetch(`/projects/${id}`, {
                method: "DELETE",
            });
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
        // console.log(incompleteProjects);
        // console.log(projects);
        const newArr = projects.map(({ name, dueDate, id }) => {
            newDueDate = dueDate.split("T")[0];
            return `<div id="project-container-${id}"><div class="project-name" id="project-${id}">${name}
            </div><div class="project-dueDate" id="dueDate-${id}">${newDueDate}</div></div>`;
        });
        // console.log(newArr);
        console.log("hello new arr", newArr);
        incompleteProjects.innerHTML = newArr.join("");
    } catch (e) {}

    // grabs individual projects
    const allProjects = document.querySelectorAll(".project-name");

    const addEventListenerToProject = (project) => {
        project.addEventListener("click", async(e) => {
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
                let newDueDate = dueDate.split("T")[0];
                singleProjectDiv.innerHTML = "";
                singleProjectDiv.innerHTML = `<div id="single-project-holder"><div id="single-project-name-${id}">${name}</div><div id="single-project-content-${id}">${content}</div><div id="single-project-dueDate-${id}">${newDueDate}</div><button class="project-edit" id="edit-${id}">Edit</button><button class="project-delete" id="delete-${id}">Delete</button></div>`;
                deleteButtonFunctionality(id);
                //Selecting the delete button upon viewing a project to allow delete button functionality
                // const deleteButton = document.querySelector(".project-delete");

                // const deleteButtonFunctionality = () => {
                //     deleteButton.addEventListener("click", async(e) => {
                //         console.log("delete", deleteButton);
                //         try {
                //             const mainProjectHolder = document.querySelector(
                //                 `#project-container-${id}`
                //             );
                //             const mainListProject = document.querySelector(`#project-${id}`);
                //             const selectedProject = document.querySelector(
                //                 "#single-project-holder"
                //             );
                //             const mainProjectDueDate = document.querySelector(
                //                 `#dueDate-${id}`
                //             );
                //             mainListProject.remove();
                //             selectedProject.remove();
                //             mainProjectDueDate.remove();
                //             mainProjectHolder.remove();
                //             const res = await fetch(`/projects/${id}`, {
                //                 method: "DELETE",
                //             });
                //         } catch (e) {}
                //     });
                // };
                // This is for the edit button to work:
                const editBtn = document.querySelector(".project-edit");
                console.log(editBtn);

                editBtn.addEventListener("click", async(e) => {
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
                            submitBtn.addEventListener("click", async(e) => {
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
                                        prevNameValue.innerText = nameValue;
                                        mainDisplayProjectName.innerText = nameValue;
                                    }
                                    if (contentValue) {
                                        prevContent.innerText = contentValue;
                                    }
                                    if (dateValue) {
                                        console.log(mainDisplayDueDate);
                                        prevDate.innerText = dateValue;
                                        mainDisplayDueDate.innerText = dateValue;
                                    }
                                    const name = nameValue;
                                    const content = contentValue;
                                    const dueDate = dateValue;
                                    const body = { name, content, dueDate };
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
export default deleteButtonFunctionality;
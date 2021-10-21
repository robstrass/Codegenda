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
            return `<div class="project-name" id="project-${id}">${name}
            <div class="project-dueDate" id="dueDate">${dueDate}</div></div>`;
        });
        // console.log(newArr);
        incompleteProjects.innerHTML = newArr.join("");
    } catch (e) {}

    // grabs individual projects
    const allProjects = document.querySelectorAll('.project-name');

    const addEventListenerToProject = project => {
        project.addEventListener('click', async(e) => {
            const id = project.id.split('-')[1];

            try {
                const res = await fetch(`/projects/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                });

                if (res.status === 401) {
                    window.location.href("users/login");
                    return;
                }

                const { project } = await res.json();
                const singleProjectDiv = document.querySelector('#single-project');
                const { name, content, dueDate } = project;
                singleProjectDiv.innerHTML = '';
                singleProjectDiv.innerHTML = `<div id="single-project-holder"><div>${name}</div><div>${content}</div><div>${dueDate}</div><button class="project-edit" id="edit-${id}">Edit</button><button class="project-delete" id="delete-${id}">Delete</button></div>`
                    //Selectint the delete button upon viewing a project to allow delete button functionality
                const deleteButton = document.querySelector('.project-delete');
                deleteButton.addEventListener("click", async(e) => {
                    try {
                        const mainListProject = document.querySelector(`#project-${id}`);
                        const selectedProject = document.querySelector('#single-project-holder');
                        mainListProject.remove();
                        selectedProject.remove();
                        const res = await fetch(`/projects/${id}`, {
                            method: "DELETE",
                        });
                    } catch (e) {}
                })
            } catch (e) {}
        });
    }
    allProjects.forEach(project => {
        addEventListenerToProject(project);

    })
});
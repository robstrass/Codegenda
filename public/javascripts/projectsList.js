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
    console.log('id', projects[1])
    const newArr = projects.map(({ name, dueDate, id }) => {
      return `<div class="project-name" id="project-${id}">${name}
            <div class="project-dueDate" id="dueDate">${dueDate}</div></div>`;
    });
    // console.log(newArr);
    incompleteProjects.innerHTML = newArr.join("");
  } catch (e) {}

  // grabs individual projects
  const allProjects = document.querySelectorAll('.project-name');

    console.log('testing loader', allProjects)


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
                console.log('single project ready to mingle', project)
                const { name, content, dueDate } = project;
                singleProjectDiv.innerHTML = '';
                singleProjectDiv.innerHTML = `<div>${name}</div><div>${content}</div><div>${dueDate}</div>`
            } catch (e) {

            }
        });
    }
    allProjects.forEach(project => {
        addEventListenerToProject(project);
    })
});

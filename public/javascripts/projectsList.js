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
    console.log(incompleteProjects);
    console.log(projects);
    const newArr = projects.map(({ name, dueDate, id }) => {
      return `<div class="project-name" id="project-${id}">${name}
            <div class="project-dueDate" id="dueDate">${dueDate}</div></div>`;
    });
    console.log(newArr);
    incompleteProjects.innerHTML = newArr.join("");
  } catch (e) {}
});

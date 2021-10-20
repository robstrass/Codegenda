document.addEventListener("DOMContentLoaded", async (e) => {
  try {
    const res = await fetch("http://localhost:8080/projects", {
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
    console.log("I'm hitting it");
    console.log(projects);
    const newArr = projects.map(({ name, dueDate, id }) => {
      `<div class="project-name" id="project-${id}">${name}
            <div class="project-dueDate" id="dueDate">${dueDate}</div></div>`;
    });
    console.log(newArr);
    incompleteProjects.innerHTML = newArr.join("");
  } catch (e) {}
});

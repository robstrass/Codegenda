// import { addTaskFunc } from "./add-task";
// import { editButtonFunctionality, deleteButtonFunctionality } from "./projectsList";
const searchButton = document.querySelector("#search-button");
const searchInput = document.querySelector("#searchTerm");
const incompleteProjects = document.querySelector("#incomplete-projects-list")
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
        console.log('hello i am here');
        const searchArr = searchedProjects.map(({ name, dueDate, id }) => {
            let newDueDate = dueDate.split("T")[0];
            return `<div id="project-container-${id}" class="project-container-class"><div class="project-name" id="project-${id}">${name}
                </div><div class="project-dueDate" id="dueDate-${id}">${newDueDate}</div></div>`;
        });

        incompleteProjects.innerHTML = searchArr.join("");
    } catch (e) {}
});
// const searchButton = document.querySelector("#search-button");
// const searchInput = document.querySelector("#searchTerm");
// searchButton.addEventListener("click", async(e) => {
//     let searchTerm = searchInput.value;
//     try {
//         const res = await fetch(`/search/${searchTerm}`, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         });

//         const { projects } = await res.json();
//         console.log("nothing", res.json());
//         console.log(projects);
//         incompleteProjects.innerHTML = "";
//         const searchArr = projects.map(({ name, dueDate, id }) => {
//             let newDueDate = dueDate.split("T")[0];
//             return `<div id="project-container-${id}" class="project-container-class"><div class="project-name" id="project-${id}">${name}
//                 </div><div class="project-dueDate" id="dueDate-${id}">${newDueDate}</div></div>`;
//         });

//         incompleteProjects.innerHTML = searchArr.join("");
//     } catch (e) {}
// });
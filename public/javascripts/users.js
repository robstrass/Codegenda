const { loginUser } = require("../../auth");

let demoUserButton = document.querySelector("#demoButton");
demoUserButton.addEventListener('click', async(event) => {
    event.preventDefault();
})

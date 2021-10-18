const { restart } = require("nodemon");
const { loginUser } = require("../..auth");

const signUpForm = document.querySelector(".sign-up-form");
signUpForm.addEventListener("submit", async(event) => {
    event.preventDefault();
    const formData = new FormData(signUpForm);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const body = {email, password, username};

    

});
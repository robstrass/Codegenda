// console.log("Hello");
// let loginButton = document.querySelector(".loginbtn");
// loginButton.addEventListener("submit", async(e) => {
//     e.preventDefault();
//     const formData = new FormData(logInForm);
//     const username = formData.get("username");
//     const password = formData.get("password");
//     const body = { email, password, username };
//     console.log("Jose's consolelog")
//     try {
//         const res = await fetch("http://localhost:8080/users/login", {
//             method: "POST",
//             body: JSON.stringify(body),
//             headers: {
//                 "Content-Type": "application/json"
//             }
//         })
//         console.log("This is after the res.")

//     } catch (e) {
//         console.log("It didn't work:(")
//     }

// })
function login() {
    const formContainer = document.getElementsByClassName("formContainer");
    const inputValue = document.getElementById("login");
    inputValue.checked = true;

    formContainer[0].style.left = "-18px";
}

function signup() {
    const formContainer = document.getElementsByClassName("formContainer");
    const inputValue = document.getElementById("signup");
    inputValue.checked = true;
    formContainer[0].style.left = "-440px";
}

function clearSignup() {
    const signupForm = document.getElementById("signupForm");
    signupForm.reset();
}

function clearLogin() {
    const loginForm = document.getElementById("loginForm");
    loginForm.reset();
}

function unload(){
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
    loginForm.reset();
    signupForm.reset();
    const inputValue = document.getElementById("login");
    inputValue.checked = true;
    window.removeEventListener("unload");
}

window.addEventListener("unload", unload);


const arr = new Array(10);
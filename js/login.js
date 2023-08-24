let intervalId
let fixIncrement = 70


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
    formContainer[0].style.left = "-445px";
}


function formCheck(form, type){
    if(type == "login"){
        const email = form.elements.email.value;
        const password = form.elements.password.value;
        console.log(email.length!==0, password)
        if(email.length !== 0 || password.length !== 0){
            return true;
        }else{
            return false;
        }
  }else if(type == "signup"){
    const username = form.elements.username.value;
    const email = form.elements.email.value;
    const password = form.elements.password.value;
    if(username.length !== 0 || email.length !== 0 || password.length !== 0){
        return true;
    }else{
        return false;
    }
  }
}


function clearSignup() {
    const signupForm = document.getElementById("signupForm");
    const type = "signup"
    if(formCheck(signupForm, type)){
        createSuccessPopup("Form is cleared!")
        signupForm.reset();
        
    }else{
        createFailurePopup("Form is empty!")
    }
}

function clearLogin() {
    const type = "login"
    const loginForm = document.getElementById("loginForm");
    if(formCheck(loginForm, type)){
        createSuccessPopup("Form is cleared!")
        loginForm.reset();
        
    }else{
        createFailurePopup("Form is empty!")
    }
}


function unload() {
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
    loginForm.reset();
    signupForm.reset();
    const inputValue = document.getElementById("login");
    inputValue.checked = true;
    window.removeEventListener("unload");
}

window.addEventListener("unload", ()=>unload);

function formValidation(e,type){
    const data = new FormData(e.target);
    const form = {}
    data.forEach((value, key) => {
        form[key] = value
    })

    if(type == "login"){
        const email = form.email
        const password = form.password
        console.log(email.length!==0, password)
        
        if(email.length === 0 && password.length === 0){
            return "Form is empty!";
        }
        if(email.length === 0){
            return "Email's empty!";
        }
        if(password.length === 0){
            return "Password's empty!";
        }
        return false;
  }else if(type == "signup"){
    const username = form.username
    const email = form.email
    const password = form.password
    if(username.length !== 0 && email.length !== 0 && password.length !== 0){
        return "Form is empty!";
    }
    if(username.length === 0 ){
        return "Username's empty!";
    }
    if(email.length === 0){
        return "Email's empty!";
    }
    if(password.length === 0){
        return "Password's empty!";
    }
    return false;
  }
}    



const loginAnnoumus = (e)=> {
    e.preventDefault();
    
    const type = "login"
    const message = formValidation(e,type);
    if(message.length !== 0){
        createFailurePopup(message)
        return
    };
    clearInterval(intervalId);
    setData(e);
    createSuccessPopup("You are logged in!")
    loginForm.removeEventListener("submit", (e) => {
        return
    }) 
    return 
    
}

function loginSubmit() {
    const loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit", (e) => {
        loginAnnoumus(e);
    });
}

const signupAnnoumus = (e) => {
    e.preventDefault();

    const type = "signup"

    if(!formValidation(e,type)){
        return
    };
    clearInterval(intervalId);
    createFailurePopup()
    setData(e);
    popUpFailure();
    signupForm.removeEventListener("submit", (e) => {
        return
    })
    return
}

function signupSubmit() {
    const signupForm = document.getElementById("signupForm");
    signupForm.addEventListener("submit", (e) => {
        signupAnnoumus(e);
    });
}


function setData(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target)
    e.target.id == "loginForm" ? login() : signup();
    
    function login() {
        
        const entries = {}
        formData.forEach((value, key) => {
            entries[key] = value
        })
        const loginData = {
            password: entries.password,
            email: entries.email,
        }
        localStorage.setItem("loginData", JSON.stringify(loginData));
        e.target.reset();
        console.log(localStorage.getItem("loginData"))
        
    }
    
    function signup() {
        
        const entries = {}
        formData.forEach((value, key) => {
            entries[key] = value
        })
        
        const signupData = {
            username: entries.username,
            password: entries.password,
            email: entries.email,
        }
        localStorage.setItem("signupData", JSON.stringify(signupData));
        e.target.reset();
    }
    window.removeEventListener("unload", unload);
    
    
}


function popUpSuccess(){
    const popupMessage = document.getElementById("popupSuccessMessages");
    const successMessage = document.getElementById("successMessage");
    console.log(popupMessage);
    popupMessage.classList.remove("popupContainer");
    popupMessage.classList.add("popupMessages");
    successMessage.classList.add("successMessage");

    intervalId = setTimeout(() => {
        popupMessage.classList.remove("popupMessage");
        successMessage.classList.remove("successMessage");
        popupMessage.classList.add("popupContainer");
    }, 6000);

}

function popUpFailure(){
    const popupMessage = document.getElementById("popupMessages");
    const successMessage = document.getElementById("failureMessaage");
    console.log(popupMessage, successMessage)
    popupMessage.classList.remove("popupContainer");
    popupMessage.classList.add("popupMessages");
    successMessage.classList.add("failureMessaage");
    intervalId = setTimeout(() => {
        popupMessage.classList.remove("popupMessaages");
        successMessage.classList.remove("successMessage");
        popupMessage.classList.add("popupContainer");
    }, 6000);
}



function closeContainer(e){
    e.preventDefault();
    const popupMessage1 = document.getElementById("popupMessages");
    popupMessage1.classList.remove("popupMessages");
    popupMessage1.classList.add("popupContainer");
    clearTimeout(intervalId);
}

function positionUpdate(){
    
        const messageArray = document.getElementById("messageArray");
        while(messageArray.firstChild){
            messageArray.removeChild(messageArray.firstChild);
            count = 0;

}
}

let count = 0
let successDivTimeout
function createSuccessPopup(text){
    const popupMessages = document.createElement("div");
    popupMessages.classList.add("popupMessages");
    popupMessages.id = "popupSuccessMessages";

    const successMessage = document.createElement("div");
    successMessage.classList.add("successMessage");
    successMessage.id = "successMessage";

    const closeBtn = document.createElement("div");
    closeBtn.classList.add("close");
    closeBtn.innerText = "x";
    closeBtn.addEventListener("click", (e)=>closeContainer(e));

    const p = document.createElement("p");
    p.innerText = text;
    p.id="loginMessageText"

    const popupMessage = document.createElement("div");
    popupMessage.classList.add("popupMessage");
    popupMessage.id = "popupMessage";
    successMessage.appendChild(closeBtn);
    
    popupMessage.appendChild(p);    
    successMessage.appendChild(popupMessage);

    
    const checkMarkSVG = createCheckmarkSVG();
    successMessage.appendChild(checkMarkSVG);
    popupMessages.appendChild(successMessage);
 
    popupMessages.classList.add(`position${count}`)

    const messageArray = document.getElementById("messageArray");

    const arrayContainer = document.createElement("div");
    arrayContainer.classList.add("arrayContainer");
    arrayContainer.id = "arrayContainer";

    arrayContainer.appendChild(popupMessages);

    if(count<6){
        messageArray.appendChild(arrayContainer);
        count++;
        clearTimeout(successDivTimeout);
        successDivTimeout = setTimeout(()=>{
            positionUpdate();
        },6000)
    }
    
}

function createFailurePopup(text){
    console.log(count)
    const popupMessages = document.createElement("div");
    popupMessages.classList.add("popupMessages");
    popupMessages.id = "popupFailureMessages";

    const failureMessage = document.createElement("div");
    failureMessage.classList.add("failureMessaage");
    failureMessage.id = "failureMessage";

    const closeBtn = document.createElement("div");
    closeBtn.classList.add("close");
    closeBtn.innerText = "x";
    closeBtn.addEventListener("click", ()=>closeContainer());

    const p = document.createElement("p");
    p.innerText = text;
    p.id="loginMessageText"

    const popupMessage = document.createElement("div");
    popupMessage.classList.add("popupMessage");
    popupMessage.id = "popupMessage";
    failureMessage.appendChild(closeBtn);
  
    failureMessage.appendChild(popupMessage);
    popupMessage.appendChild(p);    

    const failureMarkSVG = createXSVG();
    failureMessage.appendChild(failureMarkSVG);
    popupMessages.appendChild(failureMessage);

    popupMessages.classList.add(`position${count}`)

    const messageArray = document.getElementById("messageArray");

    const arrayContainer = document.createElement("div");
    arrayContainer.classList.add("arrayContainer");
    arrayContainer.id = "arrayContainer";

    arrayContainer.appendChild(popupMessages);

    

    if(count<6){
        messageArray.appendChild(arrayContainer);
        count++;
        clearTimeout(successDivTimeout);
        successDivTimeout = setTimeout(()=>{
            positionUpdate();
        },6000)
    }
    
}


function createCheckmarkSVG() {
    
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "checkmark");
    svg.setAttribute("viewBox", "0 0 52 52");
  
    
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("class", "checkmark__circle");
    circle.setAttribute("cx", "26");
    circle.setAttribute("cy", "26");
    circle.setAttribute("r", "25");
    circle.setAttribute("fill", "none");
  
    
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("class", "checkmark__check");
    path.setAttribute("fill", "none");
    path.setAttribute("d", "M14.1 27.2l7.1 7.2 16.7-16.8");
  
   
    svg.appendChild(circle);
    svg.appendChild(path);
  
    return svg; 
  }

  function createXSVG() {
    
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "checkmark__x");
    svg.setAttribute("viewBox", "0 0 52 52");

    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("class", "checkmark__circle__x");
    circle.setAttribute("cx", "26");
    circle.setAttribute("cy", "26");
    circle.setAttribute("r", "25");
    circle.setAttribute("fill", "none");
  
    
    const line1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    line1.setAttribute("class", "checkmark__cross1");
    line1.setAttribute("fill", "none");
    line1.setAttribute("d", "M13.5 17 36 36");

    const line2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    line2.setAttribute("class", "checkmark__cross2");
    line2.setAttribute("fill", "none");
    line2.setAttribute("d", "M36 16 14 37.5");
  
    
    svg.appendChild(circle);
    svg.appendChild(line2);
    svg.appendChild(line1);
    return svg; 
  }
  

window.addEventListener("online", () => createSuccessPopup("You are online"))
window.addEventListener("offline", () => createFailurePopup("You are offline"))
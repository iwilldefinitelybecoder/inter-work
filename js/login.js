let intervalId
let fixIncrement = 70

const globalVariables = [{}]


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
        // createSuccessPopup("Form is cleared!")
        
    }else{
        const type = "login"
        const waitingText = "logging in..."
        const completeText = "Welcome"+"!"
        waiting(type,waitingText,completeText)
        loginForm.reset();
        // createFailurePopup("Form is empty!")
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
    if(username.length === 0 && email.length === 0 && password.length === 0){
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
    const loginForm = document.getElementById("loginForm");
    const type = "login"
    const message = formValidation(e,type);
    if(message !==false && message.length !== 0 ){
        createFailurePopup(message)
        return
    };
    setData(e);
    // createSuccessPopup("You are logged in!")
    loginForm.removeEventListener("submit", LoginSubmit) 
    return 
    
}

function LoginSubmit(e){
    loginAnnoumus(e);

}

function loginSubmit() {
    const loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit", LoginSubmit);
}

const signupAnnoumus = (e) => {
    e.preventDefault();

    const type = "signup"

    const message = formValidation(e,type);
    console.log(message)
    if(message !==false && message.length !== 0 ){
        createFailurePopup(message)
        return
    }

    setData(e);
    signupForm.removeEventListener("submit", SignupSubmit)

    return
}

function SignupSubmit(e){
    signupAnnoumus(e);
}

function signupSubmit() {
    const signupForm = document.getElementById("signupForm");
    signupForm.addEventListener("submit",SignupSubmit);
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
        const user = JSON.parse(localStorage.getItem("loginData"));
        const email = user.email;
        let name = email.slice(0, email.indexOf("@"))
        const type = "login"
        const waitingText = "logging in..."
        const completeText = "Welcome"+" "+name+"!"
        waiting(type,waitingText,completeText)
        
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
        const user = JSON.parse(localStorage.getItem("signupData"));
        const username = user.username;
        let name = username.slice(0,10)
        createSuccessPopup("Welcome"+" "+name+"!")
    }
    window.removeEventListener("unload", unload);
    
    
}


// function popUpSuccess(){
//     const popupMessage = document.getElementById("popupSuccessMessages");
//     const successMessage = document.getElementById("successMessage");
//     console.log(popupMessage);
//     popupMessage.classList.remove("popupContainer");
//     popupMessage.classList.add("popupMessages");
//     successMessage.classList.add("successMessage");

//     intervalId = setTimeout(() => {
//         popupMessage.classList.remove("popupMessage");
//         successMessage.classList.remove("successMessage");
//         popupMessage.classList.add("popupContainer");
//     }, 6000);

// }

// function popUpFailure(){
//     const popupMessage = document.getElementById("popupMessages");
//     const successMessage = document.getElementById("failureMessaage");
//     console.log(popupMessage, successMessage)
//     popupMessage.classList.remove("popupContainer");
//     popupMessage.classList.add("popupMessages");
//     successMessage.classList.add("failureMessaage");
//     intervalId = setTimeout(() => {
//         popupMessage.classList.remove("popupMessaages");
//         successMessage.classList.remove("successMessage");
//         popupMessage.classList.add("popupContainer");
//     }, 6000);
// }



function closeContainer(e){
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



function createFailurePopup(text,isWaiting){
    let waiter = {name:true}
    if(isWaiting !== undefined){
        waiter = globalVariables.some(obj=>obj[isWaiting] === undefined)
        console.log(waiter, isWaiting)
    if(waiter) return
}
    const classIdObj = {}
    const popupMessages = document.createElement("div");
    popupMessages.classList.add("popupMessages");
    popupMessages.id = "popupFailureMessages";

    if(waiter.name == true){
    classIdObj.classParentMessage = "failureMessaage";
    classIdObj.idParentMessage = "failureMessage";
    }else{
        classIdObj.classParentMessage = "middlewareMessaage";
    classIdObj.idParentMessage = "failureMessage";
    
}
    classIdObj["pid"] = "loginMessageText"
    classIdObj["p.innerText"] = text;
    
    classIdObj.classPopMessage = "popupMessage";
    classIdObj.idPopMessage = "popupMessage";
    
    const failureMessage = middlewarePopupMessage(classIdObj);
    
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
function middlewareSVG(){
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "checkmark__middleware");
    svg.setAttribute("viewBox", "0 0 52 52");
    return svg;
}

function middlewarePopupMessage(elementObj){
    const parentMessage = document.createElement("div");

    parentMessage.classList.add(elementObj.classParentMessage);
    parentMessage.id = elementObj.idParentMessage

    const p = document.createElement("p");
    p.innerText = elementObj["p.innerText"];
    p.id=elementObj["pid"];
    p.style.transition = "all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)";

    const closeBtn = document.createElement("div");
    closeBtn.classList.add("close");
    closeBtn.innerText = "x";
    closeBtn.addEventListener("click", ()=>closeContainer());

    const popupMessage = document.createElement("div");
    popupMessage.classList.add(elementObj.classPopMessage);
    popupMessage.id = elementObj.idPopMessage;

    // const failureMarkSVG = createXSVG();
    const middlewareSVGs = middlewareSVG();

    parentMessage.appendChild(closeBtn);
    popupMessage.appendChild(p);    
    parentMessage.appendChild(popupMessage);
    
    parentMessage.appendChild(middlewareSVGs);

    return parentMessage;

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
  function waiting(reqestor, WaitingText, completeText) {
    const requestManager = {}
    const name = reqestor;
    console.log(name, globalVariables);
  
    for (const [key, value] of globalVariables.entries()) {
      if (value === name && globalVariables.length < 6) {
        return;
      }
      globalVariables[key][name] = false;
    }
  
    createFailurePopup(WaitingText, name);
  
    setTimeout(() => {
        for (const [key, value] of (globalVariables).entries()) {
            let value1
              Object.keys(value).forEach(key => {
                value1 = key
              });
              console.log(value1)
              if (value1 === name) {
                globalVariables[key][name] = true;
                classs(completeText, name);
                delete globalVariables[key][name]
                console.log(globalVariables)
                return;
              }
            }
    }, 3000);
  }

  function classs(completedText, name) {
    const message  = document.getElementById("failureMessage");
    message.classList.remove("middlewareMessaage");
    message.classList.add("failureMessaage");
    const p = document.createElement("p");
    const messages = document.getElementById("loginMessageText");
    messages.innerText = completedText;
  }
  


window.addEventListener("online", () => createSuccessPopup("You are online"))
window.addEventListener("offline", () => createFailurePopup("You are offline"))
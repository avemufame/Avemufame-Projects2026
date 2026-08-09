console.log("page loaded");





const add_button  = document.getElementById("add-something");

add_button.addEventListener("click", function(){

    console.log("button clicked");
   
    Myprint("did i load successugfully","top");
    CreateSomething();



})


function Myprint(message,message1)
{
    console.log(message);
    console.log(message1);

}

function CreateSomething(){

    const input = document.getElementById("task-input");
    const Taskname = input.value;
    Myprint("This is what you wrote :", Taskname);
    const statusArea = document.getElementById("status_message");
    statusArea.textContent = "Task added: " + Taskname;


    const Boards = document.getElementById("boards2");

    const newSection = document.createElement("section");

    newSection.className = "Fportfolio";

    const newPara = document.createElement("p2");
    newPara.textContent = Taskname; 

    const newTitle = document.createElement("h2");
    newTitle.textContent = Taskname;

    
    newSection.appendChild(newTitle);
    newSection.appendChild(newPara);
    Boards.appendChild(newSection);



}

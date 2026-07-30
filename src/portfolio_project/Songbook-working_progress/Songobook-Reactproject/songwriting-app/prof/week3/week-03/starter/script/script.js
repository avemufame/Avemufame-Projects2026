function logger(message,message1)
{
    console.log(message);
    console.log(message1);

}

function logger2(message)
{
    console.log(message);

}

function HandleAddTask(){
    const input = document.getElementById("task-input");
    const Taskname = input.value;
    logger("task name", Taskname); 
    logger2("task name from logger2" + Taskname); 
    /*console.log("task name", name); */
    const statusArea = document.getElementById("status_message");
    statusArea.textContent = "Task added: " + Taskname;



    const todoCards = document.getElementById("todo-cards");

    const newCard = document.createElement("article");

    newCard.className = "card";

    const newPara = document.createElement("p");

    newPara.textContent = Taskname;

    newCard.appendChild(newPara);
    todoCards.appendChild(newCard);




}

logger("did i load successugfully","top");

const add_button  = document.getElementById("add-task-button");



add_button.addEventListener("click", function(){
    logger("did i load successugfully","top");
    HandleAddTask();


})

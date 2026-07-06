console.log("page loaded");
/* let text = "";
for (let i = 0; i < 5; i++) {
    text += "The number is " + i + "<br>" ;
    console.log(text);
  }
*/
  for (let i = 0; i<5; i++){

    const newSection = document.createElement("section");
    newSection.className = "Fportfolio";
    b = i+1;
    const paragraf = document.createElement("p");

    paragraf.textContent = b;
    const Inputbit = document.createElement("input");
    Inputbit.id = "task-input";
    Inputbit.placeholder = "Enter a Task ...";
    Inputbit.type = "text";
    const Buttonbit = document.createElement("button");
    Buttonbit.textContent = "Cutupiddi" + b;
    Buttonbit.id = "add-task-button";

   newSection.appendChild(Buttonbit);

    newSection.appendChild(Inputbit);

    newSection.appendChild(paragraf);
    document.body.appendChild(newSection);
    

    console.log(i);



  }

/*
  <input type="text" id="task-input" placeholder="Enter a task...">
  <button id="add-task-button">Add Task</button>     */
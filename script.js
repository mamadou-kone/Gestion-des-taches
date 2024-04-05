document.addEventListener("DOMContentLoaded", function(){

    const addBtn = document.getElementById("addTaskBtn");
    const taskInput = document.getElementById("taskInput");
    const priority = document.getElementById("priority");
    const dateEcheance = document.getElementById("dateEcheance");
    const listContainer = document.getElementById("taskList");

    addBtn.addEventListener("click", function(){
        const addText = taskInput.value.trim();
        const priorityContent = priority.value.trim();
        const dateEcheanceContent = dateEcheance.value.trim();

        if(addText !== ""){
            const listLi = document.createElement("li");
            listLi.classList.add("task");
            listLi.innerHTML=`
                <span>${addText}</span>
                <span>${priorityContent}</span>
                <span>${dateEcheanceContent}</span>
                <button class="deleteBtn">Supprimer</button>
            `;
            listContainer.appendChild(listLi);
            saveTasks(); // Sauvegarder les tâches après l'ajout
            taskInput.value = "";
        }
    });

    listContainer.addEventListener("click", function(event){
        if(event.target.classList.contains("deleteBtn")){
            event.target.parentElement.remove();
            saveTasks(); // Assurez-vous de sauvegarder après la suppression
        }
    });

    // Chargement des tâches sauvegardées lors du chargement de la page
    loadTasks();
});

function saveTasks() {
    const taskList = document.getElementById("taskList");
    const tasks = Array.from(taskList.querySelectorAll(".task")).map(function(taskLi) {
        const taskText = taskLi.querySelector("span").textContent;
        const taskPriority = taskLi.querySelectorAll("span")[1].textContent;
        const taskDate = taskLi.querySelectorAll("span")[2].textContent;

        return {
            text: taskText,
            priority: taskPriority,
            date: taskDate
        };
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const listContainer = document.getElementById("taskList");

    tasks.forEach(function(task) {
        const listLi = document.createElement("li");
        listLi.classList.add("task");
        listLi.innerHTML=`
            <span>${task.text}</span>
            <span>${task.priority}</span>
            <span>${task.date}</span>
            <button class="deleteBtn">Supprimer</button>
        `;
        listContainer.appendChild(listLi);
    });
}

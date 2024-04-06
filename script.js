// Attend que le DOM soit entièrement chargé
document.addEventListener("DOMContentLoaded", function(){

    // Sélection des éléments du DOM nécessaires
    const addBtn = document.getElementById("addTaskBtn"); // Bouton "Ajouter"
    const taskInput = document.getElementById("taskInput"); // Champ de saisie de la tâche
    const priority = document.getElementById("priority"); // Sélecteur de priorité
    const dateEcheance = document.getElementById("dateEcheance"); // Champ de saisie de la date d'échéance
    const listContainer = document.getElementById("taskList"); // Conteneur de la liste des tâches

    // Ajout d'un écouteur d'événement au clic sur le bouton "Ajouter"
    addBtn.addEventListener("click", function(){
        // Récupération des valeurs saisies par l'utilisateur
        const addText = taskInput.value.trim(); // Texte de la tâche
        const priorityContent = priority.value.trim(); // Priorité de la tâche
        const dateEcheanceContent = dateEcheance.value.trim(); // Date d'échéance de la tâche

        // Vérification si le champ de texte n'est pas vide
        if(addText !== "" ){
            if( dateEcheance!=""){
            // Création d'un élément de liste pour la nouvelle tâche
            const listLi = document.createElement("li");
            listLi.classList.add("task"); // Ajout de la classe CSS "task"

            // Insertion du contenu HTML dans l'élément de liste créé
            listLi.innerHTML=`
                <input type="checkbox" class="taskCheckbox"> <!-- Case à cocher -->
                <span>${addText}</span> <!-- Texte de la tâche -->
                <span>${priorityContent}</span> <!-- Priorité de la tâche -->
                <span>${dateEcheanceContent}</span> <!-- Date d'échéance de la tâche -->
                <button class="deleteBtn">Supprimer</button> <!-- Bouton "Supprimer" -->
            `;

            // Ajout de l'élément de liste à la liste des tâches
            listContainer.appendChild(listLi);

            // Sauvegarde des tâches dans le stockage local après l'ajout d'une nouvelle tâche
            saveTasks();

            // Effacement du champ de saisie de la tâche après l'ajout
            taskInput.value = "";
        }else{
            alert("Champ vide")
        }
    }else{
            alert("Champ vide")
        }
    });

    // Ajout d'un écouteur d'événement de clic sur le conteneur de la liste des tâches
    listContainer.addEventListener("click", function(event){
        // Vérification si l'élément cliqué est un bouton "Supprimer"
        if(event.target.classList.contains("deleteBtn")){
            // Suppression de l'élément de liste parent lorsque le bouton "Supprimer" est cliqué
            event.target.parentElement.remove();
            // Sauvegarde des tâches dans le stockage local après la suppression d'une tâche
            saveTasks();
        }
        // Vérification si l'élément cliqué est une case à cocher
        else if(event.target.classList.contains("taskCheckbox")){
            // Récupération de l'élément de liste parent de la case à cocher
            const taskLi = event.target.parentElement;
            // Vérification si la case à cocher est cochée ou décochée
            if(event.target.checked){
                // Ajout de la classe CSS "completed" si la case à cocher est cochée
                taskLi.classList.add("completed");
            } else {
                // Suppression de la classe CSS "completed" si la case à cocher est décochée
                taskLi.classList.remove("completed");
            }
            // Sauvegarde des tâches dans le stockage local après la mise à jour de la case à cocher
            saveTasks();
        }
    });

    // Chargement des tâches sauvegardées lors du chargement de la page
    loadTasks();
});

// Fonction pour sauvegarder les tâches dans le stockage local
function saveTasks() {
    // Sélection de la liste des tâches
    const taskList = document.getElementById("taskList");
    // Création d'un tableau contenant les données de chaque tâche
    const tasks = Array.from(taskList.querySelectorAll(".task")).map(function(taskLi) {
        // Récupération des données de chaque tâche
        const taskText = taskLi.querySelector("span").textContent; // Texte de la tâche
        const taskPriority = taskLi.querySelectorAll("span")[1].textContent; // Priorité de la tâche
        const taskDate = taskLi.querySelectorAll("span")[2].textContent; // Date d'échéance de la tâche
        const taskCompleted = taskLi.classList.contains("completed"); // État de la tâche (cochée ou non)

        // Retourne un objet représentant les données de la tâche
        return {
            text: taskText,
            priority: taskPriority,
            date: taskDate,
            completed: taskCompleted
        };
    });
    // Stockage des tâches dans le stockage local au format JSON
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Fonction pour charger les tâches depuis le stockage local lors du chargement de la page
function loadTasks() {
    // Récupération des tâches depuis le stockage local ou initialisation à un tableau vide
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    // Sélection du conteneur de la liste des tâches
    const listContainer = document.getElementById("taskList");

    // Parcours de chaque tâche récupérée depuis le stockage local
    tasks.forEach(function(task) {
        // Création d'un élément de liste pour chaque tâche
        const listLi = document.createElement("li");
        listLi.classList.add("task"); // Ajout de la classe CSS "task"
        // Vérification si la tâche est cochée (complétée) et ajout de la classe CSS appropriée
        if(task.completed) {
            listLi.classList.add("completed");
        }
        // Insertion du contenu HTML dans l'élément de liste créé
        listLi.innerHTML=`
            <input type="checkbox" class="taskCheckbox" ${task.completed ? 'checked' : ''}> <!-- Case à cocher -->
            <span>${task.text}</span> <!-- Texte de la tâche -->
            <span>${task.priority}</span> <!-- Priorité de la tâche -->
            <span>${task.date}</span> <!-- Date d'échéance de la tâche -->
            <button class="deleteBtn">Supprimer</button> <!-- Bouton "Supprimer" -->
        `;
        // Ajout de l'élément de liste à la liste des tâches
        listContainer.appendChild(listLi);
    });
}

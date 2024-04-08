$(document).ready(function() {
    $('#addTaskBtn').click(function() {
        const taskText = $('#taskInput').val().trim();
        const priority = $('#priority').val().trim();
        const dateEcheance = $('#dateEcheance').val().trim();

        if (taskText !== "" && dateEcheance !== "") {
            const listItem = $('<li class="task"></li>');
            listItem.html(`
                <input type="checkbox" class="taskCheckbox">
                <span class="txt">${taskText}</span>
                <span>${priority}</span>
                <span>${dateEcheance}</span>
                <button class="deleteBtn">Supprimer</button>
            `);
            $('#taskList').append(listItem);
            saveTasks();
            $('#taskInput').val('');
        } else {
            alert("Champ vide");
        }
    });
});

$(document).on('click', '.deleteBtn', function() {
    $(this).parent().remove();
    saveTasks();
});

$(document).on('click', '.taskCheckbox', function() {
    $(this).parent().toggleClass('completed');
    saveTasks();
});

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(function(task) {
        const listItem = $('<li class="task"></li>');
        if (task.completed) {
            listItem.addClass('completed');
        }
        listItem.html(`
            <input type="checkbox" class="taskCheckbox" ${task.completed ? 'checked' : ''}>
            <span>${task.text}</span>
            <span>${task.priority}</span>
            <span>${task.date}</span>
            <button class="deleteBtn">Supprimer</button>
        `);
        $('#taskList').append(listItem);
    });
}

$(document).ready(function() {
    loadTasks();
});

function saveTasks() {
    // Sélection de la liste des tâches
    const tasks = $('#taskList').children('.task').map(function() {
        // Récupération des données de chaque tâche
        const taskText = $(this).find('span').first().text(); // Texte de la tâche
        const taskPriority = $(this).find('span').eq(1).text(); // Priorité de la tâche
        const taskDate = $(this).find('span').eq(2).text(); // Date d'échéance de la tâche
        const taskCompleted = $(this).hasClass('completed'); // État de la tâche (cochée ou non)

        // Retourne un objet représentant les données de la tâche
        return {
            text: taskText,
            priority: taskPriority,
            date: taskDate,
            completed: taskCompleted
        };
    }).get(); // Convertit le résultat en tableau

    // Stockage des tâches dans le stockage local au format JSON
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

$(document).ready(function() {
    var colors = ['blue', 'red',  'white']; // Liste des couleurs à utiliser
    var colorIndex = 0; // Index pour parcourir la liste des couleurs

    setInterval(function() {
        // Sélectionne le titre <h1> et anime sa couleur
        $("h1").animate({
            color: colors[colorIndex]
        }, 1000); // Durée de l'animation en millisecondes

        // Incrémente l'index pour passer à la couleur suivante
        colorIndex++;

        // Si l'index dépasse la longueur de la liste des couleurs, remet l'index à 0 pour recommencer la boucle
        if (colorIndex >= colors.length) {
            colorIndex = 0;
        }
    }, 2000); // Intervalle entre chaque changement de couleur en millisecondes
});


$(document).ready(function() {
    // Gestion de l'événement keypress pour l'élément d'entrée de texte
    $('#taskInput').keypress(function(event) {
        // Vérification si la touche pressée est la touche Entrée (code 13)
        if (event.which === 13) {
            // Appel de la fonction pour ajouter une tâche
            addTask();
        }
    });
    
    $('#dateEcheance').keypress(function(event) {
        // Vérification si la touche pressée est la touche Entrée (code 13)
        if (event.which === 13) {
            // Appel de la fonction pour ajouter une tâche
            addTask();
        }
    });

    // Le reste de votre code existant ...

    // Fonction pour ajouter une tâche
    function addTask() {
        const taskText = $('#taskInput').val().trim();
        const priority = $('#priority').val().trim();
        const dateEcheance = $('#dateEcheance').val().trim();

        if (taskText !== "" && dateEcheance !== "") {
            const listItem = $('<li class="task"></li>');
            listItem.html(`
                <input type="checkbox" class="taskCheckbox">
                <span class="txt">${taskText}</span>
                <span>${priority}</span>
                <span>${dateEcheance}</span>
                <button class="deleteBtn">Supprimer</button>
            `);
            $('#taskList').append(listItem);
            saveTasks();
            $('#taskInput').val('');
        } else {
            alert("Champ vide");
        }
    }

    // Le reste de votre code existant ...
});

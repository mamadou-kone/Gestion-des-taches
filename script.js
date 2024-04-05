document.getElementById('addTaskBtn').addEventListener('click', function() {
    var taskInput = document.getElementById('taskInput');
    var taskList = document.getElementById('taskList');
    var task = taskInput.value.trim();
  
    if (task) {
        var li = document.createElement('li');
  
        // Création du checkbox
        var checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                li.classList.add('completed');
                taskList.appendChild(li);
            } else {
                li.classList.remove('completed');
            }
        });

        checkbox.addEventListener('change', function() {
            if (this.checked) {
              li.classList.add('completed');
            } else {
              li.classList.remove('completed');
            }
          });

        li.appendChild(checkbox);
  
        // Ajout du texte de la tâche à l'élément de liste
        li.appendChild(document.createTextNode(task));
  
        // Ajout du bouton de suppression
        var deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Supprimer';
        deleteBtn.addEventListener('click', function() {
            taskList.removeChild(li);
            saveTasks(); // Assurez-vous de sauvegarder après la suppression
        });
        li.appendChild(deleteBtn);
  
        // Ajout de l'élément de liste à la liste des tâches
        taskList.appendChild(li);
        taskInput.value = '';
        saveTasks(); // Sauvegarder les tâches après l'ajout
    }
  });
  
  function saveTasks() {
    var taskList = document.getElementById('taskList');
    var tasks = Array.from(taskList.children).map(function(li) {
        // Ne sauvegardez que le texte de la tâche, sans le bouton
        return li.firstChild.nextSibling.textContent;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  function loadTasks() {
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    var taskList = document.getElementById('taskList');
    tasks.forEach(function(task) {
        var li = document.createElement('li');
  
        // Création du checkbox
        var checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.addEventListener('change', function() {
            if (this.checked) {
              li.classList.add('completed');
            } else {
              li.classList.remove('completed');
            }
          });
        li.appendChild(checkbox);
  
        // Ajout du texte de la tâche à l'élément de liste
        li.appendChild(document.createTextNode(task));
  
        // Ajout du bouton de suppression
        var deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Supprimer';
        deleteBtn.addEventListener('click', function() {
            taskList.removeChild(li);
            saveTasks(); // Assurez-vous de sauvegarder après la suppression
        });
        li.appendChild(deleteBtn);
  
        taskList.appendChild(li);
    });
  }
  
  document.addEventListener('DOMContentLoaded', loadTasks);
  
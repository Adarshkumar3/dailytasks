// Load important tasks from local storage
document.addEventListener('DOMContentLoaded', function() {
    var savedImportantTasks = localStorage.getItem('importantTasks');
    if (savedImportantTasks) {
      document.getElementById('importantTasks').innerHTML = savedImportantTasks;
      attachTaskListeners();
    }
  });
  
  // Function to add task to the list
  function addTask(taskText, isImportant) {
    var input = document.getElementById("taskInput");
    var task = taskText || input.value;
    if (task === '') {
      alert("Please enter a task!");
      return;
    }
    var ul = document.getElementById(isImportant ? "importantTasks" : "tasks");
    var li = createTaskElement(task, isImportant);
    ul.appendChild(li);
    saveTasks(isImportant);
    input.value = '';
    attachTaskListeners();
  }
  
  // Function to create a task element
  function createTaskElement(taskText, isImportant) {
    var li = document.createElement("li");
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener('change', function() {
      if (this.checked) {
        li.style.textDecoration = "line-through";
      } else {
        li.style.textDecoration = "none";
      }
      saveTasks(isImportant);
    });
    var editButton = createButton("Edit", function() {
      var newText = prompt("Edit task:", li.textContent.trim());
      if (newText !== null && newText.trim() !== '') {
        li.firstChild.nextSibling.textContent = newText.trim();
        saveTasks(isImportant);
      }
    });
    var deleteButton = createButton("Delete", function() {
      li.remove();
      saveTasks(isImportant);
    });
    var priorityButton = createButton("Priority", function() {
      li.style.backgroundColor = "yellow";
      saveTasks(isImportant);
    });
    li.appendChild(checkbox);
    li.appendChild(document.createTextNode(taskText));
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    li.appendChild(priorityButton);
    return li;
  }
  
  // Function to create a button element
  function createButton(text, clickHandler) {
    var button = document.createElement("button");
    button.textContent = text;
    button.addEventListener('click', clickHandler);
    return button;
  }
  
  // Function to clear completed tasks
  function clearCompleted() {
    var tasks = document.getElementById("tasks");
    var checkboxes = tasks.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function(checkbox) {
      if (checkbox.checked) {
        checkbox.parentNode.remove();
      }
    });
    saveTasks(false);
  }
  
  // Function to save tasks to local storage
  function saveTasks(isImportant) {
    var tasks = isImportant ? document.getElementById("importantTasks").innerHTML : document.getElementById("tasks").innerHTML;
    localStorage.setItem(isImportant ? 'importantTasks' : 'tasks', tasks);
  }
  
  // Function to attach task listeners
  function attachTaskListeners() {
    var tasks = document.getElementById("tasks").querySelectorAll('li');
    tasks.forEach(function(task) {
      var checkbox = task.querySelector('input[type="checkbox"]');
      checkbox.addEventListener('change', function() {
        if (this.checked) {
          task.style.textDecoration = "line-through";
        } else {
          task.style.textDecoration = "none";
        }
        saveTasks(false);
      });
    });
  
    var importantTasks = document.getElementById("importantTasks").querySelectorAll('li');
    importantTasks.forEach(function(task) {
      var checkbox = task.querySelector('input[type="checkbox"]');
      checkbox.addEventListener('change', function() {
        if (this.checked) {
          task.style.textDecoration = "line-through";
        } else {
          task.style.textDecoration = "none";
        }
        saveTasks(true);
      });
    });
  }
  
  // Function to sort tasks alphabetically
  function sortTasks() {
    var tasksList = document.getElementById("tasks");
    var tasks = tasksList.children;
    var sortedTasks = Array.from(tasks).sort((a, b) => {
      return a.textContent.localeCompare(b.textContent);
    });
    tasksList.innerHTML = '';
    sortedTasks.forEach(task => {
      tasksList.appendChild(task);
    });
    saveTasks(false);
  }
  
  // Function to move priority tasks to the "Important Tasks" section
  function movePriorityTasks() {
    var tasksList = document.getElementById("tasks");
    var importantTasksList = document.getElementById("importantTasks");
  
    tasksList.childNodes.forEach(function(task) {
      if (task.querySelector('button:nth-of-type(3)').textContent === "Priority") {
        importantTasksList.appendChild(task);
      }
    });
  
    saveTasks(false);
  }
  
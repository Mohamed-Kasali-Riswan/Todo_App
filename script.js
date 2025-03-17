document.addEventListener("DOMContentLoaded", function () {
  listView();
});

let breakTag = document.createElement("br");

console.log("Yes script is loaded");

let allTasks = JSON.parse(localStorage.getItem("TodoList")) || [];
console.log("LOCAL STORAGE CHECK");

let remove = (document.createElement("h3").innerText = "🚽");

let date2 = new Date();

function addTask() {
  let taskName = document.getElementById("todoInputBox").value;
  let addedTime = new Date();
  let taskCategory = document.getElementById("Category").value;

  if (taskName === "" || taskCategory === "") {
    alert("Please Enter Valid Data!");
    return;
  }

  let allTasks = JSON.parse(localStorage.getItem("TodoList")) || [];

  allTasks.push({ taskName, addedTime, taskCategory });

  localStorage.setItem("TodoList", JSON.stringify(allTasks));

  listView();

  document.getElementById("todoInputBox").value = "";
  document.getElementById("Category").value = "Work";
}

function delTask(index) {
  let getTasks = JSON.parse(localStorage.getItem("TodoList")) || [];
  getTasks.splice(index, 1);
  allTasks = getTasks;
  localStorage.setItem("TodoList", JSON.stringify(getTasks));
  listView();
}

function listView() {
  let r = document.getElementById("right");
  r.innerHTML = "";

  let storedTasks = JSON.parse(localStorage.getItem("TodoList"));
  if (!Array.isArray(storedTasks)) {
    storedTasks = [];
  }

  storedTasks = storedTasks.map((task) => ({
    taskName: task.taskName,
    addedTime: new Date(task.addedTime),
    taskCategory: task.taskCategory,
  }));

  if (storedTasks.length === 0) {
    let imgTag = document.createElement("img");
    imgTag.src = "emptyy.png";
    imgTag.alt = "No Tasks";
    imgTag.style.width = "700px";

    r.appendChild(imgTag);
    return;
  }

  let table = document.createElement("table");
  table.style.width = "100%";
  table.style.borderCollapse = "collapse";

  let thead = document.createElement("thead");
  let headerRow = document.createElement("tr");

  let headers = ["Task Name", "Added Date & Time", "Category"];
  headers.forEach((headerText) => {
    let th = document.createElement("th");
    th.innerText = headerText;
    th.style.border = "1px solid black";
    th.style.padding = "8px";
    th.style.textAlign = "center";
    th.style.backgroundColor = "#f2f2f2";
    headerRow.appendChild(th);
  });

  //Heading for Action
  let th = document.createElement("th");
  th.innerText = "Actions";
  th.colSpan = 2;
  th.style.border = "1px solid black";
  th.style.padding = "8px";
  th.style.textAlign = "center";
  th.style.backgroundColor = "#f2f2f2";
  th.style.backgroundColor = "#f2f2f2";
  headerRow.appendChild(th);

  thead.appendChild(headerRow);
  table.appendChild(thead);

  let tbody = document.createElement("tbody");

  storedTasks.forEach((task, index) => {
    let row = document.createElement("tr");

    let tname = document.createElement("td");
    tname.innerText = task.taskName;
    tname.style.backgroundColor = "white";

    let tadd = document.createElement("td");
    tadd.innerText = task.addedTime.toLocaleString();
    tadd.style.backgroundColor = "white";

    let tcat = document.createElement("td");
    tcat.innerText = task.taskCategory;
    tcat.style.backgroundColor = "white";

    //Creating a Edit Button
    let editBut = document.createElement("button");
    editBut.innerText = "✏️";
    editBut.style.background = "none";
    editBut.style.border = "none";
    editBut.style.cursor = "pointer";
    editBut.onclick = function () {
      editTask(index);
    };

    let editCell = document.createElement("td");
    editCell.appendChild(editBut);
    editCell.style.textAlign = "center";
    editCell.style.backgroundColor = "white";

    //Creating a Remove Button
    let remBut = document.createElement("button");
    remBut.innerText = "🚽";
    remBut.style.background = "none";
    remBut.style.border = "none";
    remBut.style.cursor = "pointer";
    remBut.onclick = function () {
      delTask(index);
    };

    let remCell = document.createElement("td");
    remCell.appendChild(remBut);
    remCell.style.textAlign = "center";
    remCell.style.backgroundColor = "white";

    row.appendChild(tname);
    row.appendChild(tadd);
    row.appendChild(tcat);
    row.appendChild(editCell);
    row.appendChild(remCell);

    row.style.border = "1px solid black";
    row.style.textAlign = "center";
    row.style.padding = "8px";

    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  r.appendChild(table);
}

function editTask(index) {
  let r = document.getElementById("right");
  r.innerHTML = "";

  let storedTasks = JSON.parse(localStorage.getItem("TodoList")) || [];

  let updHead = document.createElement("h2");
  updHead.innerText = "Update Process";

  //Create input boxes for editing
  let newName = document.createElement("input");
  newName.type = "text";
  newName.placeholder = `${storedTasks[index].taskName}`;
  newName.value = storedTasks[index].taskName;

  let newCat = document.createElement("select");
  let categories = ["Work", "Personal", "Urgent"];

  categories.forEach((category) => {
    let option = document.createElement("option");
    option.value = category.toLowerCase();
    option.text = category;
    newCat.appendChild(option);
  });

  newCat.value = storedTasks[index].taskCategory.toLowerCase();

  let newDiv = document.createElement("div");

  let updBut = document.createElement("button");
  updBut.innerText = "update";

  updBut.onclick = function () {
    storedTasks[index].taskName = newName.value;
    storedTasks[index].taskCategory = newCat.value;
    allTasks = storedTasks;
    localStorage.setItem("TodoList", JSON.stringify(allTasks));
    listView();
  };

  newDiv.appendChild(updHead);
  newDiv.appendChild(newName);
  newDiv.appendChild(document.createElement("br"));
  newDiv.appendChild(document.createElement("br"));
  newDiv.appendChild(newCat);
  newDiv.appendChild(document.createElement("br"));
  newDiv.appendChild(document.createElement("br"));
  newDiv.appendChild(updBut);
  r.append(newDiv);
}

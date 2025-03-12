console.log("Yes script is loaded");

let allTasks = [];

let remove=document.createElement('h3').innerText='🚽';

let date2 = new Date();

function addTask() {
  let taskName =document.getElementById('todoInputBox').value;
  let addedTime = new Date();
  let getDate = document.getElementById("dueDate").value;
  let dueDate = new Date(getDate);
  let taskStatus=false

  if(taskName==='' || isNaN(dueDate.getTime()) || checkDeadEnds(dueDate)<0 ){
    alert('Please Enter the Valid Data!')
    return;
  }

  allTasks.push({taskName,addedTime,dueDate,taskStatus})
  listView()

  document.getElementById('todoInputBox').value=""
  document.getElementById("dueDate").value=""


}


function checkDeadEnds(dueDate) {
    let date1 = new Date(dueDate);
    let date2 = new Date(); 
  
    if (isNaN(date1.getTime())) {
      console.error("Invalid date:", dueDate);
      return null;
    }
  
    let difference = date1 - date2;
    let diffInDays = Math.floor(difference / (1000 * 60 * 60 * 24));
    
    return diffInDays;
  }
  

// function listView(){

//     let r=document.getElementById('right');
//     r.innerHTML=""

    //  if(allTasks.length===0){
    // let imgTag=document.createElement('img');
    // imgTag.src="empty.jpg";
    // imgTag.alt="No Tasks";
    // imgTag.style.width="100%";
    // imgTag.style.width="700px";

    // r.appendChild(imgTag);
    // return;
    // }

//     let hDiv=document.createElement('div');
//     hDiv.style.width="100%";
//     hDiv.style.height="75px";
//     hDiv.style.display="flex";

    
//         let htname=document.createElement('h2');
//         htname.innerText=`Task Name`;

//         let htDue=document.createElement('h2');
//         htDue.innerText=`Due Date`;

//         let htStatus=document.createElement('h2');
//         htStatus.innerText=`Status`;

//         let htREm=document.createElement('h2');
//         htREm.innerText=`Wanna Remove`;

//         hDiv.append(htname,htDue,htStatus,htREm)

//         r.appendChild(hDiv)

//     allTasks.forEach((task,index)=>{
//         let aDiv=document.createElement('div');

//         aDiv.style.display="flex";
//         aDiv.style.justifyContent="space-between";


//         let tname=document.createElement('h3');
//         tname.innerText=`${task.taskName}`;

//         let tadd=document.createElement('h3');
//         tadd.innerText=`${task.addedTime.toLocaleString()}`;

//         let tdue=document.createElement('h3');
//         tdue.innerText=`${task.dueDate.toLocaleDateString()}`;

//         let minDays = checkDeadEnds(task.dueDate);
//         let tstate = document.createElement("h3");
//         tstate.innerText = (minDays !== null && minDays < 3) ? '🚩' : '🏳️';
//         tstate.style.marginTop="10px";
        
//         let remBut=document.createElement('button')
//         remBut.innerText='🚽';
//         remBut.onclick = function () {
//             delTask(index);
//         };

//         aDiv.appendChild(tname)
//         aDiv.appendChild(tadd)
//         aDiv.appendChild(tdue)
//         aDiv.appendChild(tstate)
//         aDiv.appendChild(remBut)

//         r.appendChild(aDiv);
        
//     })

// }


function delTask(index){
    allTasks.splice(index,1)
    listView()
}

function listView() {
    let r = document.getElementById('right');
    r.innerHTML = ""; // Clear previous content


    if(allTasks.length===0){
        let imgTag=document.createElement('img');
        imgTag.src="emptyy.png";
        imgTag.alt="No Tasks";
        imgTag.style.width="100%";
        imgTag.style.width="700px";
    
        r.appendChild(imgTag);
        return;
        }



    // Create Table
    let table = document.createElement('table');
    table.style.width = "100%";
    table.style.borderCollapse = "collapse";

    // Create Table Header
    let thead = document.createElement('thead');
    let headerRow = document.createElement('tr');

    let headers = ["Task Name", "Added Date", "Due Date", "Dead End", "Remove"];
    headers.forEach(headerText => {
        let th = document.createElement('th');
        th.innerText = headerText;
        th.style.border = "1px solid black";
        th.style.padding = "8px";
        th.style.textAlign = "center";
        th.style.backgroundColor = "#f2f2f2";
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create Table Body
    let tbody = document.createElement('tbody');

    allTasks.forEach((task, index) => {
        let row = document.createElement('tr');

        let tname = document.createElement('td');
        tname.innerText = task.taskName;
        tname.style.backgroundColor="white";

        let tadd = document.createElement('td');
        tadd.innerText = task.addedTime.toLocaleString();
        tadd.style.backgroundColor="white";

        let tdue = document.createElement('td');
        tdue.innerText = task.dueDate.toLocaleDateString();
        tdue.style.backgroundColor="white";

        let minDays = checkDeadEnds(task.dueDate);

        let tstate = document.createElement('td');
        tstate.innerText = (minDays !== null && minDays < 3) ? '🚩' : '🏳️';
        tstate.style.textAlign = "center";
        tstate.style.backgroundColor = "white";

        let remBut = document.createElement('button');
        remBut.innerText = '🚽';
        remBut.style.background = "none";
        remBut.style.border = "none";
        remBut.style.cursor = "pointer";
        remBut.onclick = function () {
            delTask(index);
        };

        let remCell = document.createElement('td');
        remCell.appendChild(remBut);
        remCell.style.textAlign = "center";
        remCell.style.backgroundColor = "white";

        // Append all cells to row
        row.appendChild(tname);
        row.appendChild(tadd);
        row.appendChild(tdue);
        row.appendChild(tstate);
        row.appendChild(remCell);

        row.style.border = "1px solid black";
        row.style.textAlign = "center";
        row.style.padding = "8px";

        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    r.appendChild(table);
}

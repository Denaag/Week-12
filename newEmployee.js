let id = 0;


document.getElementById("add").addEventListener("click", () => {
    // console.log("This works!") //tested to see if the click to add button works
    let newTable = document.getElementById("list");
    let newRow = newTable.insertRow(1); // allows new row to be inserted after header row
    newRow.setAttribute("id", `item-${id}`);
    newRow.insertCell(0).innerHTML = document.getElementById("first-name").value; // this allows the cell for Sneaker Collection to be filled by what the user enters
    newRow.insertCell(1).innerHTML = document.getElementById("last-name").value; // this allows the cell for Sneaker Price Paid to be filled by what the user enters
    newRow.insertCell(2).innerHTML = document.getElementById("position-title").value; // this allows the cell for Date of purchase to be filled by what the user enters
    newRow.insertCell(3).innerHTML = document.getElementById("hired").value;
    let terminate = newRow.insertCell(4); // allows remove button to be added to cell area title remove
    terminate.appendChild(createTerminateButton(id++)); //remove button and increments the collection shoe based on ID
    document.getElementById("first-name").value = ""; // resets Sneaker Name field blank after unit is added
    document.getElementById("last-name").value = ""; // resets Sneaker Price Paid field blank after unit is added
    document.getElementById("position-title").value = ""; // resets Date Purchased field blank after unit is added
    document.getElementById("hired").value = "";
})

function createTerminateButton(id) {
    let btn = document.createElement("button"); // creates button - tag of element we want to create
    btn.className = "btn btn-primary";
    btn.id = id; // btn ID will be attached to each shoe added to the collection
    btn.innerHTML = "Terminate"; // creating remove string
    btn.onclick = () => { // adding similar type of event listener
        let removeEmployee = document.getElementById(`item-${id}`);
        removeEmployee.parentNode.removeChild(removeEmployee);
    };
    return btn;
}
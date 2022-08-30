var selectedRow = null;

const myInventory = [
    {
        UPC : 001,
        productName : "Pillow",
        qty : 1,
        perPrice : 35,
    },
    {
        UPC : 002,
        productName : "Couch",
        qty : 1,
        perPrice : 1500,
    },
    {
        UPC : 003,
        productName : "Lamp",
        qty : 1,
        perPrice : 55,
    },
]

function addData() {
    for (let i = 0; i < myInventory.length; i++) {
        $("#table").html(
            //
            $("#table").html()+
            `
            <td>${myInventory[i].UPC}</td>
            <td>${myInventory[i].productName}</td>
            <td>${myInventory[i].qty}</td>
            <td>${myInventory[i].perPrice}</td>
            `
        );
    }
}


function onFormSubmit(e) {
    event.preventDefault();
    var formData = readFormData();
    if (selectedRow === null) {
        insertNewRecord(formData);
    }
    else {
        updateRecord(formData);
    }
    resetForm();
}

//Retrieve the data
function readFormData() { // this is how the data value will be retrieved
    var formData = {};
    formData["UPC"] = document.getElementById("UPC").value;
    formData["productName"] = document.getElementById("productName").value;
    formData["qty"] = document.getElementById("qty").value;
    formData["perPrice"] = document.getElementById("perPrice").value;
    return formData;
}

//Insert the data
function insertNewRecord(data) { // this allows data typed to be placed in form under each column
    var table = document.getElementById("storeList").getElementsByTagName("tbody")[0];
    var newRow = table.insertRow(table.length); //table length incremented by 1 each time
    //create an element for each element in the form
    var cell1 = newRow.insertCell(0);
        cell1.innerHTML = data.UPC;
    var cell2 = newRow.insertCell(1);
        cell2.innerHTML = data.productName;
    var cell3 = newRow.insertCell(2);
        cell3.innerHTML = data.qty;
    var cell4 = newRow.insertCell(3);
        cell4.innerHTML = data.perPrice;
    var cell5 = newRow.insertCell(4);
        cell5.innerHTML = `<button onClick="onEdit(this)">Edit</button> <button onClick="onDelete(this)">Delete</button>`;
}

//Edit the data
function onEdit(td) { //allows you to edit the contents of the data
    selectedRow = td.parentElement.parentElement;
    document.getElementById("UPC").value = selectedRow.cells[0].innerHTML;
    document.getElementById("productName").value = selectedRow.cells[1].innerHTML;
    document.getElementById("qty").value = selectedRow.cells[2].innerHTML;
    document.getElementById("perPrice").value = selectedRow.cells[3].innerHTML;
}

function updateRecord(formData) { //this will update the form created
    selectedRow.cells[0].innerHTML = formData.UPC;
    selectedRow.cells[1].innerHTML = formData.productName;
    selectedRow.cells[2].innerHTML = formData.qty;
    selectedRow.cells[3].innerHTML = formData.perPrice;
}

//Delete the Data
function onDelete(td) { //prompt worker to confirm they want item deleted from inventory
    if (confirm("Do you want to delete this item?")) {
        row = td.parentElement.parentElement;
        document.getElementById("storeList").deleteRow(row.rowIndex);
        resetForm();
    }
}

//Reset the data
function resetForm() { //reset the data after items are entered
    document.getElementById("UPC").value = "";
    document.getElementById("productName").value = "";
    document.getElementById("qty").value = "";
    document.getElementById("perPrice").value = "";
    selectedRow = null;
}




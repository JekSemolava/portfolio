var selectedRow = null;

function onFormSubmit(){
    if (validateName()){
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
        showHint("Form submitted successfully!", "success");
    }
}

function readFormData(){
    var formData = {};
    formData["empId"] = document.getElementById("empId").value;
    formData["fullName"] = document.getElementById("fullName").value;
    formData["title"] = document.getElementById("title").value;
    formData["floor"] = document.getElementById("floor").value;
    return formData;
}

function insertNewRecord(data){
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.empId;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.fullName;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.title;

    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.floor;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                        <a onClick="onDelete(this)">Delete</a>`;
}

function resetForm(){
    document.getElementById("empId").value = "";
    document.getElementById("fullName").value = "";
    document.getElementById("title").value = "";
    document.getElementById("floor").value = "";
    selectedRow = null;
}

function onEdit(td){
    selectedRow = td.parentElement.parentElement;
    document.getElementById("empId").value = selectedRow.cells[0].innerHTML;
    document.getElementById("fullName").value = selectedRow.cells[1].innerHTML;
    document.getElementById("title").value = selectedRow.cells[2].innerHTML;
    document.getElementById("floor").value = selectedRow.cells[3].innerHTML;
}

function updateRecord(formData){
    selectedRow.cells[0].innerHTML = formData.empId;
    selectedRow.cells[1].innerHTML = formData.fullName;
    selectedRow.cells[2].innerHTML = formData.title;
    selectedRow.cells[3].innerHTML = formData.floor;
}

function onDelete(td){
    if (confirm('Are you sure to delete this record ?')){
        row = td.parentElement.parentElement;
        document.getElementById("employeeList").deleteRow(row.rowIndex);
        resetForm();
    }
}

function validateName(){
    isValid = true;
    if (document.getElementById("fullName").value == ""){
        isValid = false;
        document.getElementById("fullNameValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
            document.getElementById("fullNameValidationError").classList.add("hide");
    }
    return isValid;
}

function validateEmployeeNumber() {
    var empId = document.getElementById("empId");
    if (empId.value.length > 6 || empId.value.length <6) {
        empId.setCustomValidity("Employee Number must be 6 digits");
    } else if (isNaN(empId.value)) {
        empId.setCustomValidity("Please enter a valid number.");
    } else {
        empId.setCustomValidity("");
    }
}

function validateFloor() {
    var floor = document.getElementById("floor");
    if (floor.value.length > 2) {
        floor.setCustomValidity("Employee Number must be 2 digits or less.");
    } else if (isNaN(floor.value)) {
        floor.setCustomValidity("Please enter a valid number.");
    } else {
        floor.setCustomValidity("");
    }
}


document.getElementById("saveBtn").addEventListener("click", function(){
    var employeeData = [];

    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    for (var i = 0; i < table.rows.length; i++) {
        var row = table.rows[i];
        var data = {
            empId: row.cells[0].innerHTML,
            fullName: row.cells[1].innerHTML,
            title: row.cells[2].innerHTML,
            floor: row.cells[3].innerHTML
        };
        employeeData.push(data);
    }

    var timestamp = new Date().toISOString();
    var jsonData = {
        timestamp: timestamp,
        employees: employeeData
    };

    // Convert the data to a JSON string
    var json = JSON.stringify(employeeData, null, 2);

    var blob = new Blob([json], { type: 'application/json' });
    
    // Create a link element to simulate a download
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = "employees_" + timestamp + ".json";
    
    // Trigger the download by clicking the link
    link.click();
});


// Show hint notification function
function showHint(message, type = 'success') {
    var hintBox = document.getElementById('hintAlert');
    hintBox.innerHTML = message;

    // Change the color based on the type of message (success, error, etc.)
    if (type === 'success') {
        hintBox.style.backgroundColor = '#28a745'; // Green for success
    } else if (type === 'error') {
        hintBox.style.backgroundColor = '#dc3545'; // Red for error
    } else {
        hintBox.style.backgroundColor = '#ffc107'; // Yellow for warnings
    }

    // Show the hint box
    hintBox.classList.remove('hide');
    hintBox.classList.add('show');

    // Hide the hint after 3 seconds
    setTimeout(function() {
        hintBox.classList.remove('show');
        hintBox.classList.add('hide');
    }, 3000); // Hide after 3 seconds
}


// Load Data button functionality
document.getElementById("loadDataBtn").addEventListener("click", function() {
    // Create a file input dynamically
    var fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json'; // Only allow JSON files

    fileInput.addEventListener('change', function(event) {
        var file = event.target.files[0];

        if (file) {
            var reader = new FileReader();

            reader.onload = function(e) {
                try {
                    // Parse the JSON data from the file
                    var jsonData = JSON.parse(e.target.result);

                    if (jsonData && jsonData.employees) {
                        // Clear the existing table data
                        var tableBody = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
                        tableBody.innerHTML = "";

                        // Loop through the employee data and insert into the table
                        jsonData.employees.forEach(function(employee) {
                            var newRow = tableBody.insertRow(tableBody.length);

                            var cell1 = newRow.insertCell(0);
                            cell1.innerHTML = employee.empId;
                            var cell2 = newRow.insertCell(1);
                            cell2.innerHTML = employee.fullName;
                            var cell3 = newRow.insertCell(2);
                            cell3.innerHTML = employee.title;
                            var cell4 = newRow.insertCell(3);
                            cell4.innerHTML = employee.floor;
                            var cell5 = newRow.insertCell(4);
                            cell5.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                                                <a onClick="onDelete(this)">Delete</a>`;
                        });
                    } else {
                        alert(`"Invalid JSON format. 'employees' key is missing."
                        {
                        "employees":[
                            {
                            "empId":12345,
                            ...}
                        ]
                    }`);
                    }
                } catch (err) {
                    showHint("Error reading the JSON file: " + err.message, "error");
                }
            };

            reader.readAsText(file);
        }
    });

    fileInput.click(); // Trigger the file input dialog
});

// Show hint when the form is successfully submitted

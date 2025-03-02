let selectedRow = null;

const onFormSubmit = () => {
    if (validateName()) {
        const formData = readFormData();
        selectedRow ? updateRecord(formData) : insertNewRecord(formData);
        resetForm();
        showHint("Form submitted successfully!", "success");
    }
};

const readFormData = () => ({
    empId: document.getElementById("empId").value,
    fullName: document.getElementById("fullName").value,
    title: document.getElementById("title").value,
    // floor: document.getElementById("floor").value
    dateHired: document.getElementById("dateHired").value
});

const insertNewRecord = data => {
    const table = document.getElementById("employeeList").querySelector('tbody');
    const newRow = table.insertRow();
    Object.values(data).forEach((value, i) => newRow.insertCell(i).innerHTML = value);
    // newRow.insertCell(4).innerHTML = `<a onclick="onEdit(this)">Edit</a> <a onclick="onDelete(this)">Delete</a>`;
    newRow.insertCell(4).innerHTML = `<input type="text" class="datepicker" value="${data.dateHired}" onclick="showCalendar(this)">`; // Add date input field
    newRow.insertCell(5).innerHTML = `<a onclick="onEdit(this)">Edit</a> <a onclick="onDelete(this)">Delete</a>`;
};

const resetForm = () => {
    ["empId", "fullName", "title", "dateHired"].forEach(id => document.getElementById(id).value = "");
    selectedRow = null;
};

const onEdit = td => {
    selectedRow = td.closest('tr');
    ["empId", "fullName", "title", "dateHired"].forEach((id, i) => document.getElementById(id).value = selectedRow.cells[i].innerHTML);
};

const updateRecord = formData => {
    selectedRow.cells[0].innerHTML = formData.empId;
    selectedRow.cells[1].innerHTML = formData.fullName;
    selectedRow.cells[2].innerHTML = formData.title;
    selectedRow.cells[3].innerHTML = formData.dateHired;
};

const onDelete = td => {
    if (confirm('Are you sure to delete this record?')) {
        td.closest('tr').remove();
        resetForm();
    }
};

const validateName = () => {
    const isValid = document.getElementById("fullName").value !== "";
    document.getElementById("fullNameValidationError").classList.toggle("hide", isValid);
    return isValid;
};

const validateEmployeeNumber = () => {
    const empId = document.getElementById("empId");
    if (empId.value.length !== 6 || isNaN(empId.value)) {
        empId.setCustomValidity("Employee Number must be 6 digits.");
    } else {
        empId.setCustomValidity("");
    }
};

// const validateFloor = () => {
//     const floor = document.getElementById("floor");
//     if (floor.value.length > 2 || isNaN(floor.value)) {
//         floor.setCustomValidity("Please enter a valid number (max 2 digits).");
//     } else {
//         floor.setCustomValidity("");
//     }
// };

document.addEventListener("DOMContentLoaded", () => {
    const saveBtn = document.getElementById("saveBtn");
    // Sort state variables
    let isNameAscending = true;
    let isEmpIdAscending = true;
    let isDateHiredAscending = true;
    
     // Toggle Sort by name function (A-Z / Z-A)
     function sortByName() {
        const table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
        const rows = Array.from(table.rows);
        rows.sort((a, b) => {
            const nameA = a.cells[1].innerHTML.toLowerCase();
            const nameB = b.cells[1].innerHTML.toLowerCase();
            return isNameAscending
                ? nameA.localeCompare(nameB)  // Ascending order
                : nameB.localeCompare(nameA); // Descending order
        });
        rows.forEach(row => table.appendChild(row)); // Reorder rows in table

        // Toggle the sort order for next click
        isNameAscending = !isNameAscending;

        // Update the icon based on the sort order
        const sortButton = document.getElementById("sortByName");
        const icon = document.getElementById("nameSortIcon");
        if (isNameAscending) {
            icon.src = "./images/up.png";  // Ascending icon
        } else {
            icon.src = "./images/down.png"; // Descending icon
        }
    }

    // Toggle Sort by employee number (low to high / high to low)
    function sortByEmpId() {
        const table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
        const rows = Array.from(table.rows);
        rows.sort((a, b) => {
            const empIdA = parseInt(a.cells[0].innerHTML, 10);
            const empIdB = parseInt(b.cells[0].innerHTML, 10);
            return isEmpIdAscending
                ? empIdA - empIdB // Ascending order
                : empIdB - empIdA; // Descending order
        });
        rows.forEach(row => table.appendChild(row)); // Reorder rows in table

        // Toggle the sort order for next click
        isEmpIdAscending = !isEmpIdAscending;

        // Update the icon based on the sort order
        const sortButton = document.getElementById("sortByEmpId");
        const icon = document.getElementById("empSortIcon");
        if (isEmpIdAscending) {
            icon.src = "./images/up.png";  // Ascending icon
        } else {
            icon.src = "./images/down.png"; // Descending icon
        }
    }

    // Toggle Sort by date hired function
    function sortByDateHired() {
        const table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
        const rows = Array.from(table.rows);
        rows.sort((a, b) => {
            const nameA = a.cells[1].innerHTML.toLowerCase();
            const nameB = b.cells[1].innerHTML.toLowerCase();
            return isDateHiredAscending
                ? nameA.localeCompare(nameB)  // Ascending order
                : nameB.localeCompare(nameA); // Descending order
        });
        rows.forEach(row => table.appendChild(row)); // Reorder rows in table

        // Toggle the sort order for next click
        isDateHiredAscending = !isDateHiredAscending;

        // Update the icon based on the sort order
        const sortButton = document.getElementById("sortByDateHired");
        const icon = document.getElementById("dateHiredSortIcon");
        if (isDateHiredAscending) {
            icon.src = "./images/up.png";  // Ascending icon
        } else {
            icon.src = "./images/down.png"; // Descending icon
        }
    }

    // Event listeners for sort buttons
    document.getElementById("sortByName").addEventListener("click", sortByName);
    document.getElementById("sortByEmpId").addEventListener("click", sortByEmpId);
    document.getElementById("sortByDateHired").addEventListener("click", sortByDateHired);
    
    if (saveBtn) {
        saveBtn.addEventListener("click", () => {
            const employeeData = [];
            const tableRows = document.getElementById("employeeList").getElementsByTagName('tbody')[0].rows;

            for (let i = 0; i < tableRows.length; i++) {
                const row = tableRows[i];
                employeeData.push({
                    empId: row.cells[0].innerHTML,
                    fullName: row.cells[1].innerHTML,
                    title: row.cells[2].innerHTML,
                    dateHired: row.cells[3].innerHTML
                });
            }

            const jsonData = {
                timestamp: new Date().toISOString(),
                employees: employeeData
            };

            const jsonString = JSON.stringify(jsonData, null, 2);
            const blob = new Blob([jsonString], { type: 'application/json' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `employees_${new Date().toISOString()}.json`;
            link.click();
        });
    }
});


document.getElementById("loadDataBtn").addEventListener("click", () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json';
    fileInput.addEventListener('change', event => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = e => {
                try {
                    const jsonData = JSON.parse(e.target.result);
                    if (jsonData?.employees) {
                        const tableBody = document.getElementById("employeeList").querySelector('tbody');
                        tableBody.innerHTML = "";
                        jsonData.employees.forEach(employee => insertNewRecord(employee));
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
    fileInput.click();
});

const showHint = (message, type = 'success') => {
    const hintBox = document.getElementById('hintAlert');
    hintBox.innerHTML = message;
    hintBox.style.backgroundColor = type === 'success' ? '#28a745' : (type === 'error' ? '#dc3545' : '#ffc107');
    hintBox.classList.replace('hide', 'show');
    setTimeout(() => hintBox.classList.replace('show', 'hide'), 3000);
};

function showCalendar(input) {
    input.type = 'date'; // This makes the browser show the date picker when clicked
}

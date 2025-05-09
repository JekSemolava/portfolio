const listTitle = "My List";
const STORAGE_KEY = "todoList";

let listItems = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

let nextId = listItems.length > 0 ? Math.max(...listItems.map(i => i.id)) + 1 : 1;

const box = document.getElementById("box");

const addForm = document.createElement("form");
addForm.className = "item";
addForm.id = "addForm";

addForm.innerHTML = `
  <input id="newItemInput" type="text" name="newItem" placeholder="Enter New Task" autocomplete="off" required />
  <button class="add" type="submit">+</button>
`;

addForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const input = document.getElementById("newItemInput");
  const newItemText = input.value.trim();
  if (newItemText !== "") {
    addItem(newItemText);
    input.value = "";
    updateResetButtonVisibility(); 
  }
});

box.appendChild(addForm);

listItems.forEach(item => addItemToDOM(item));
updateResetButtonVisibility();

function handler(id) {
  document.getElementById("title" + id).setAttribute("hidden", true);
  document.getElementById("edit" + id).setAttribute("hidden", true);
  document.getElementById("done" + id).removeAttribute("hidden");
  document.getElementById("input" + id).removeAttribute("hidden");
}

function applyStrikeThrough(checkbox, id) {
  const titleElement = document.getElementById("title" + id);
  if (checkbox.checked) {
    titleElement.style.textDecoration = "line-through";
    titleElement.style.color = " #71db71cc";
  } else {
    titleElement.style.textDecoration = "none";
    titleElement.style.color = "inherit"; 
  }

  const item = listItems.find(i => i.id === id);
  if (item) {
    item.completed = checkbox.checked;
    saveList();
  }
}

function addItemToDOM(item) {
  const itemDiv = document.createElement("div");
  itemDiv.className = "item";

  itemDiv.innerHTML = `
    <form>
      <input type="checkbox" id="checkbox${item.id}" ${item.completed ? "checked" : ""}>
    </form>

    <p id="title${item.id}" style="text-decoration: ${item.completed ? "line-through" : "none"};">
      ${item.title}
    </p>

    <form class="edit" id="editForm${item.id}">
      <input type="hidden" name="updatedItemId" value="${item.id}">
      <input id="input${item.id}" type="text" name="updatedItemTitle" value="${item.title}" autocomplete="off" hidden />
      <button id="done${item.id}" class="edit" type="submit" hidden>
        <img class="icon" src="./public/assets/icons/check-solid.svg" alt="tick image">
      </button>
    </form>

    <button id="edit${item.id}" class="edit" onclick="handler('${item.id}')">
      <img class="icon" src="./public/assets/icons/pencil.png" alt="pencil image">
    </button>

    <button id="remove${item.id}" class="remove">
      <img class="icon" src="./public/assets/icons/trash.png" alt="trash icon">
    </button>
  `;

  box.insertBefore(itemDiv, addForm);

  const checkbox = itemDiv.querySelector(`#checkbox${item.id}`);
  checkbox.addEventListener("change", () => applyStrikeThrough(checkbox, item.id));

  const editForm = itemDiv.querySelector(`#editForm${item.id}`);
  editForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const newValue = document.getElementById("input" + item.id).value.trim();
    if (newValue) {
      document.getElementById("title" + item.id).textContent = newValue;
      document.getElementById("title" + item.id).removeAttribute("hidden");
      document.getElementById("edit" + item.id).removeAttribute("hidden");
      document.getElementById("done" + item.id).setAttribute("hidden", true);
      document.getElementById("input" + item.id).setAttribute("hidden", true);

      const targetItem = listItems.find(i => i.id === item.id);
      if (targetItem) {
        targetItem.title = newValue;
        saveList();
      }
    }
  });
  
  const removeBtn = itemDiv.querySelector(`#remove${item.id}`);
  removeBtn.addEventListener("click", () => {
    const confirmDelete = confirm("Remove this task?");
    if (!confirmDelete) return;

    listItems = listItems.filter(i => i.id !== item.id);
    saveList();

    itemDiv.remove();

    updateResetButtonVisibility();
  });
}

function addItem(title) {
  const newItem = {
    id: nextId++,
    title: title,
    completed: false
  };
  listItems.push(newItem);
  saveList();
  addItemToDOM(newItem);
}

function saveList() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(listItems));
}

document.getElementById("resetBtn").addEventListener("click", () => {
  const confirmReset = confirm("Are you sure you want to reset all tasks?");
  if (!confirmReset) return;

  localStorage.removeItem(STORAGE_KEY);
  listItems = [];
  nextId = 1;
  saveList();

  const taskElements = document.querySelectorAll(".item");
  taskElements.forEach(el => el.remove());

  box.appendChild(addForm);

  updateResetButtonVisibility(); 
});

function updateResetButtonVisibility() {
  const resetContainer = document.getElementById("reset-container");
  if (listItems.length > 0) {
    resetContainer.classList.remove("hidden");
    resetContainer.classList.add("show");
  } else {
    resetContainer.classList.remove("show");
    resetContainer.classList.add("hidden");
  }
}

function enableEditMode(id) {
  const inputElement = document.getElementById("input" + id);
  const doneButton = document.getElementById("done" + id);
  const editForm = document.getElementById("editForm" + id);

  // Show input and submit button
  inputElement.hidden = false;
  doneButton.hidden = false;

  // Change background color
  inputElement.style.backgroundColor = "#fff";
  inputElement.style.border = "1px solid #ccc"; // optional: make it look editable

  // Optionally focus the input field
  inputElement.focus();
}
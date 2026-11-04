document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("todo-form");
  const input = document.getElementById("todo-input");
  const errorMsg = document.getElementById("error-msg");
  const list = document.getElementById("todo-list");
  const counter = document.getElementById("counter");

  const allButton = document.getElementById("filter-all");
  const activeButton = document.getElementById("filter-active");
  const doneButton = document.getElementById("filter-done");

  let filter = "all";

  function updateCounter() {
    let count = 0;

    list.querySelectorAll("li").forEach(function (item) {
      if (!item.classList.contains("completed")) {
        count++;
      }
    });

    counter.textContent = count + (count === 1 ? " item left" : " items left");
  }

  function filterItems() {
    list.querySelectorAll("li").forEach(function (item) {
      const completed = item.classList.contains("completed");

      if (filter === "all") {
        item.style.display = "";
      } else if (filter === "active") {
        item.style.display = completed ? "none" : "";
      } else {
        item.style.display = completed ? "" : "none";
      }
    });
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const text = input.value.trim();

    if (text === "") {
      errorMsg.classList.remove("hidden");
      return;
    }

    errorMsg.classList.add("hidden");

    const item = document.createElement("li");
    const textSpan = document.createElement("span");
    const deleteButton = document.createElement("button");

    textSpan.textContent = text;
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-btn";
    deleteButton.type = "button";

    item.appendChild(textSpan);
    item.appendChild(deleteButton);
    list.appendChild(item);

    input.value = "";

    updateCounter();
    filterItems();
  });

  list.addEventListener("click", function (event) {
    const item = event.target.closest("li");

    if (event.target.classList.contains("delete-btn")) {
      item.remove();
    } else if (event.target.tagName === "SPAN") {
      item.classList.toggle("completed");
    }

    updateCounter();
    filterItems();
  });

  allButton.addEventListener("click", function () {
    filter = "all";
    filterItems();
  });

  activeButton.addEventListener("click", function () {
    filter = "active";
    filterItems();
  });

  doneButton.addEventListener("click", function () {
    filter = "done";
    filterItems();
  });

  updateCounter();
});

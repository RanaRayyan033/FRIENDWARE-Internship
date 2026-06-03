const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const categorySelect = document.getElementById("category");

const titleError = document.getElementById("titleError");
const amountError = document.getElementById("amountError");
const categoryError = document.getElementById("categoryError");

const addExpenseButton = document.getElementById("addExpenseButton");
const expenseTableBody = document.getElementById("expenseTableBody");

const totalAmountDisplay = document.getElementById("totalAmount");
const filterCategory = document.getElementById("filterCategory");

let expenses = [];

addExpenseButton.addEventListener("click", addExpense);

filterCategory.addEventListener("change", displayExpenses);

function addExpense() {

    clearErrors();

    const title = titleInput.value.trim();
    const amount = Number(amountInput.value);
    const category = categorySelect.value;

    let isValid = true;

    if (title === "") {
        titleError.textContent = "Title cannot be empty";
        isValid = false;
    }

    if (amount <= 0 || isNaN(amount)) {
        amountError.textContent = "Amount must be a positive number";
        isValid = false;
    }

    if (category === "") {
        categoryError.textContent = "Please select a category";
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    const expense = {
        title: title,
        amount: amount,
        category: category
    };

    expenses.push(expense);

    displayExpenses();
    updateTotal();

    titleInput.value = "";
    amountInput.value = "";
    categorySelect.value = "";
}

function clearErrors() {
    titleError.textContent = "";
    amountError.textContent = "";
    categoryError.textContent = "";
}

function displayExpenses() {

    expenseTableBody.innerHTML = "";

    const selectedCategory = filterCategory.value;

    expenses.forEach((expense, index) => {

        if (
            selectedCategory !== "All" &&
            expense.category !== selectedCategory
        ) {
            return;
        }

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${expense.title}</td>
            <td>PKR ${expense.amount.toLocaleString()}</td>
            <td>${expense.category}</td>
            <td>
                <button class="delete-button" onclick="deleteExpense(${index})">
                    Delete
                </button>
            </td>
        `;

        expenseTableBody.appendChild(row);
    });
}

function deleteExpense(index) {

    expenses.splice(index, 1);

    displayExpenses();
    updateTotal();
}

function updateTotal() {

    let totalExpenses = 0;

    expenses.forEach(expense => {
        totalExpenses += expense.amount;
    });

    totalAmountDisplay.textContent =
        `PKR ${totalExpenses.toLocaleString()}`;
}
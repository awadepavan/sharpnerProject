document.addEventListener('DOMContentLoaded', (event) => {

    function handleFormSubmit(event) {
        event.preventDefault();


        const amount = document.getElementById('amount').value;
        const description = document.getElementById('discription').value;
        const category = document.getElementById('category').value;

        const expense = {
            id: Date.now(),
            amount,
            description,
            category
        };

        // Get existing expenses from local storage
        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

        // Add new expense to the list
        expenses.push(expense);

        // Save updated list back to local storage
        localStorage.setItem('expenses', JSON.stringify(expenses));

        // Clear form
        document.querySelector('form').reset();


        displayExpenses();
    }

    // Function to display expenses
    function displayExpenses() {
        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        const userList = document.getElementById('userList');
        userList.innerHTML = '';

        expenses.forEach(expense => {
            const li = document.createElement('li');
            li.dataset.id = expense.id;
            li.innerHTML = `
          Amount: ${expense.amount} - Description: ${expense.description} - Category: ${expense.category}
          <button onclick="editExpense(${expense.id})">Edit</button>
          <button onclick="deleteExpense(${expense.id})">Delete</button>
        `;
            userList.appendChild(li);
        });
    }

    // Function to edit expense
    window.editExpense = function (id) {
        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        const expense = expenses.find(expense => expense.id === id);

        if (expense) {

            document.getElementById('amount').value = expense.amount;
            document.getElementById('discription').value = expense.description;
            document.getElementById('category').value = expense.category;


            deleteExpense(id);
        }
    };

    // Function to delete expense
    window.deleteExpense = function (id) {
        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        const updatedExpenses = expenses.filter(expense => expense.id !== id);


        localStorage.setItem('expenses', JSON.stringify(updatedExpenses));


        displayExpenses();
    };


    displayExpenses();


    document.querySelector('form').addEventListener('submit', handleFormSubmit);
});

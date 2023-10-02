const ctx = document.getElementById("expenseTrendChart").getContext("2d");
const transactionsDataDiv = document.getElementById("transactions-data");
const incomesCanvas = document.getElementById("incomesTotalChart");
const expensesCanvas = document.getElementById("expensesTotalChart");

const transactions = JSON.parse(transactionsDataDiv.dataset.transactions);

const expensesData = transactions.filter(
  (t) => t.transaction_type === "expense"
);
const incomesData = transactions.filter((t) => t.transaction_type === "income");

const totalIncome = incomesData.reduce((acc, t) => acc + t.amount, 0);
const totalExpense = expensesData.reduce((acc, t) => acc + t.amount, 0);

const chart = new Chart(ctx, {
  type: "line",
  data: {
    labels: expensesData.map((t) => t.date),
    datasets: [
      {
        label: "Transaction Amount",
        data: expensesData.map((t) => t.amount),
        backgroundColor: "rgba(255, 69, 0, 0.2)",
        borderColor: "rgba(255, 69, 0, 1)",
        fill: true,
        tension: 0.2,
      },
    ],
  },
  options: {
    scales: {
      x: {
        display: false,
      },
      y: {
        beginAtZero: true,
      },
    },
  },
});

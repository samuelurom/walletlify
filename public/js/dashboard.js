const ctx = document.getElementById("transactionsChart").getContext("2d");
const transactionsDataDiv = document.getElementById("transactions-data");
const transactions = JSON.parse(transactionsDataDiv.dataset.transactions);

const chart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: transactions.map((t) => t.category_name),
    datasets: [
      {
        label: "Transaction Amount",
        data: transactions.map((t) => t.amount),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

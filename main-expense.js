let balance = document.querySelector("#balance");

let trans = document.querySelector("#trans");
let form = document.querySelector("#form");
let description = document.querySelector("#desc");
let amount = document.querySelector("#amount");

//transcation-single obj
//transcations-arr  of objs

let localStorageTrans = JSON.parse(localStorage.getItem("trans"));
let transactions;

if (localStorage.getItem("trans") !== null) {
  transactions = localStorageTrans;
}
else {
  transactions = [];
}

function loadTransactionDetails(transaction) {

  let sign;
  if (transaction.amount < 0) {
    sign = "-"
  }
  else {
    sign = "+";
  }
  const singleItem = document.createElement("li");
  if (transaction.amount < 0) {
    singleItem.classList.add("exp")
  }
  else {
    singleItem.classList.add("inc")
  }

  singleItem.innerHTML = `
    ${transaction.description}
    <span>${sign} ${Math.abs(transaction.amount)}</span>
    <button class="btn-del" onclick="removeTrans(${transaction.id})">x</button>
  `;
  trans.append(singleItem);
  //console.log(transaction);
}

function removeTrans(id) {
  console.log(id);
 
  let index = transactions.findIndex(x => x.id ==id);
  transactions.splice(index,1)
console.log(transactions);
  refresh();
    updateLocalStorage();

}
let incAmt = document.querySelector("#inc-amt");
let expAmt = document.querySelector("#exp-amt");

function updateAmount() {
  const amountsVal = transactions.map((transaction) => transaction.amount);
  const total = amountsVal.reduce((pre, cur) => (pre = pre + cur),0)
  balance.innerHTML = `₹  ${total}`;

  const income = amountsVal
    .filter((itemVal) => itemVal > 0)
    .reduce((pre, curr1) => (pre = pre + curr1), 0);
  incAmt.innerHTML = `₹  ${income}`;

  const expense = amountsVal
    .filter((itemVal) => itemVal < 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  expAmt.innerHTML = `₹  ${Math.abs(expense)}`;
}
function refresh() {
  trans.innerHTML = "";
  transactions.forEach(loadTransactionDetails);
  updateAmount();
}

function addTransaction(e) {
  e.preventDefault();
  if (description.value == "" || amount.value == "") {
    alert("Please Enter Description and amount");
  } else {
    const transaction = {
      id: genID(),
      description: description.value,
      amount: parseFloat(amount.value)
    };
    transactions.push(transaction);
    loadTransactionDetails(transaction);
    description.value = "";
    amount.value = "";
    updateAmount();
    updateLocalStorage();
  }
}

function genID() {
  return Math.floor(Math.random() * 1000);
}

function updateLocalStorage() {
  localStorage.setItem("trans", JSON.stringify(transactions));
}

form.addEventListener("submit", addTransaction);

window.addEventListener("load", function () {
  refresh();
});


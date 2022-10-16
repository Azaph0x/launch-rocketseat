//https://github.com/rocketseat-education/bootcamp-launchbase-desafios-01/blob/master/desafios/01-4-aplicacao-operacoes-bancarias.md - 16/10/22

const user = {
    name: "Mariana",
    transactions: [],
    balance: 0
  };

  function createTransaction(transaction) {
    if(transaction.type == "credit") {
        user.balance += transaction.value
    } else {
       user.balance = user.balance - transaction.value
    }

    user.transactions.push(transaction)
  }

  function getHigherTransactionByType(type) {
    value = 0

    for (transaction of user.transactions) {
      if (transaction.type == type && transaction.value > value) {
        value = transaction.value
      }
    }

    return { type: type, value: value}
  }

  function getAverageTransactionValue() {
    value = 0;

    for (transaction of user.transactions) {
          value += transaction.value
      }

      return value / user.transactions.length
  }

  function getTransactionsCount() {
    count = {credit: 0, debit: 0}

    for(transaction of user.transactions) {
        if(transaction.type == "credit") {
            count.credit++
        } else {
            count.debit++
        }
    }

    return count
  }


createTransaction({ type: "credit", value: 50 })
createTransaction({ type: "credit", value: 120 })
createTransaction({ type: "debit", value: 80 })
createTransaction({ type: "debit", value: 30 })

console.log(user.balance); // 60

console.log(getHigherTransactionByType("credit")) // { type: 'credit', value: 120 }
console.log(getHigherTransactionByType("debit")) // { type: 'debit', value: 80 }

console.log(getAverageTransactionValue()) // 70

console.log(getTransactionsCount()) // { credit: 2, debit: 2 }
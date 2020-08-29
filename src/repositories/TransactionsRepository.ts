import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {

    return this.transactions;

  }

  public getBalance(): Balance {

    const allTransactions = this.transactions;

    var income = 0;
    var outcome = 0;
    var total = 0;

    for(var i = 0 ; i < allTransactions.length ; i++) {

      if(allTransactions[i].type === 'income') {
        income += allTransactions[i].value;
      }
      if(allTransactions[i].type === 'outcome') {
        outcome += allTransactions[i].value;
      }

    }
    total = income - outcome;

    return { income, outcome, total }
  }

  public create({title, value, type}:Omit<Transaction, 'id'>): Transaction {

    const transaction = new Transaction({title, value, type});

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;

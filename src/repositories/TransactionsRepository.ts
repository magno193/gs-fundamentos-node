import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
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
    const balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };
    this.transactions.forEach(transation => {
      if (transation.type === 'income') {
        balance.income += transation.value;
      } else {
        balance.outcome += transation.value;
      }
    });
    balance.total = balance.income - balance.outcome;
    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transation = new Transaction({ title, value, type });

    this.transactions.push(transation);

    return transation;
  }
}

export default TransactionsRepository;

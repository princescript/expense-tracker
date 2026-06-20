import { transactions, type Transaction } from "../mocks/transactions";

export const getTransactions = () => transactions;

export const addTransaction = (
  data: Omit<Transaction, "id">
): Transaction[] => {
  const newTransaction: Transaction = {
    id: Date.now(),
    ...data,
  };

  transactions.unshift(newTransaction);

  return transactions;
};

export const updateTransaction = (updated: Transaction) => {
  const index = transactions.findIndex(t => t.id === updated.id);

  if (index !== -1) {
    transactions[index] = updated;
  }
};

export const deleteTransaction = (id: number) => {
  const index = transactions.findIndex(t => t.id === id);

  if (index !== -1) {
    transactions.splice(index, 1);
  }
};
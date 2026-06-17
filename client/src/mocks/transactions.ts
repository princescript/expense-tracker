export interface TransactionDto {
  id: number;
  name: string;
  category: string;
  date: string;
  amount: number;
}

export const DEFAULT_TRANSACTIONS: TransactionDto[] = [
  { id: 1, name: "Thus", category: "Bills", date: "17 Jun", amount: 50000 },
  { id: 2, name: "Vvv", category: "Transport", date: "17 Jun", amount: -200 },
  { id: 3, name: "Ggvv", category: "Education", date: "17 Jun", amount: -2580 },
  { id: 4, name: "Vbb", category: "Entertainment", date: "17 Jun", amount: -2888 },
  { id: 5, name: "Fee", category: "Education", date: "17 Jun", amount: -25000 },
];
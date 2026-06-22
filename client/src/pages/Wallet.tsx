import { CreditCard, Plus, Trash2, Wallet2 } from "lucide-react";
import { useMemo } from "react";

type WalletType = {
  id: number;
  name: string;
  bank: string;
  balance: number;
  account: string;
 gradient: string;
};

const wallets: WalletType[] = [
  {
    id: 5,
    name: "Gold",
    bank: "Kotak",
    balance: 75200,
    account: "•••• 8892",
    gradient: "from-amber-700 via-yellow-500 to-orange-300",
  },
  {
    id: 6,
    name: "Premium",
    bank: "Yes Bank",
    balance: 56400,
    account: "•••• 3451",
    gradient: "from-violet-900 via-purple-700 to-indigo-500",
  },
];

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

const Wallet = () => {
  const total = useMemo(
    () => wallets.reduce((sum, item) => sum + item.balance, 0),
    []
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Wallet</h1>

          <p className="mt-1 text-sm text-[rgb(var(--muted))]">
            Manage your wallets and balances
          </p>
        </div>

        <button className="inline-flex items-center gap-2 rounded-xl bg-[rgb(var(--primary))] px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90">
          <Plus size={18} />
          Add Wallet
        </button>
      </header>

      {/* Total Balance */}
      <section className="rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[rgb(var(--primary)/0.12)]">
            <Wallet2
              size={22}
              className="text-[rgb(var(--primary))]"
            />
          </div>

          <div>
            <p className="text-sm text-[rgb(var(--muted))]">
              Total Balance
            </p>

            <h2 className="mt-1 text-4xl font-bold tracking-tight">
              {formatCurrency(total)}
            </h2>

            <p className="mt-1 text-sm text-[rgb(var(--muted))]">
              {wallets.length} Wallets Connected
            </p>
          </div>
        </div>
      </section>

      {/* Wallet Cards */}
      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            Wallets
          </h2>

          <span className="rounded-full bg-[rgb(var(--surface))] px-3 py-1 text-xs font-medium text-[rgb(var(--muted))]">
            {wallets.length}
          </span>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {wallets.map((wallet) => (
            <div
              key={wallet.id}
              className={`group relative aspect-[1.58/1] overflow-hidden rounded-3xl bg-linear-to-br ${wallet.gradient} p-5 text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl`}
            >
              {/* Gloss */}
              <div className="absolute inset-0 bg-linear-to-br from-white/20 via-white/5 to-transparent" />

              {/* Glow */}
              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/10 blur-2xl" />

              {/* Decorative Rings */}
              <div className="absolute -right-8 -bottom-8 h-28 w-28 rounded-full border border-white/10" />
              <div className="absolute right-8 top-8 h-20 w-20 rounded-full border border-white/10" />

              {/* Top */}
              <div className="relative flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur border border-white/10">
                  <CreditCard size={18} />
                </div>

                <button className="rounded-lg p-2 transition hover:bg-white/10">
                  <Trash2 size={16} />
                </button>
              </div>

              {/* Content */}
              <div className="relative mt-6">
                <p className="text-xs uppercase tracking-[0.2em] text-white/70">
                  {wallet.bank}
                </p>

                <h3 className="mt-1 text-lg font-semibold">
                  {wallet.name}
                </h3>

                <h2 className="mt-6 text-2xl font-bold tracking-tight">
                  {formatCurrency(wallet.balance)}
                </h2>
              </div>

              {/* Bottom */}
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-xs text-white/70">
                <span>{wallet.account}</span>

                <span className="rounded-full bg-white/10 px-2.5 py-1 backdrop-blur">
                  Active
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Wallet;
export const TRANSACTION_CATEGORIES = [
  "Bills",
  "Salary",
  "Freelance",
  "Transport",
  "Investment",
  "Education",
  "Entertainment",
  "Food & Drinks",
  "Shopping",
  "Others",
] as const;

export type TransactionCategory = typeof TRANSACTION_CATEGORIES[number];

export interface Transaction {
  id: number;
  title: string;
  amount: number;
  category: TransactionCategory;
  type: "income" | "expense";
  paymentMethod: string;
  date: string;
  description: string;
}

/* ========================================================================
   1. DICTIONARIES, ENTITIES, AND STRUCTURAL DICTIONARY MAPS
   ======================================================================= */

const INCOME_SIGNALS: Record<string, number> = {
  salary: 5, payroll: 5, stipend: 4, wages: 3, bonus: 5,
  received: 3, credited: 5, income: 3, refund: 5, refunded: 5,
  cashback: 5, payout: 4, earned: 4, grant: 4, scholarship: 5
};

const EXPENSE_SIGNALS: Record<string, number> = {
  paid: 3, pay: 1, spent: 3, bought: 3, purchased: 4,
  debited: 5, withdrew: 3, billed: 2, sent: 2, fees: 4, fee: 4
};

interface EntityDefinition {
  canonicalName: string;
  category: TransactionCategory;
  defaultAction: string;
}

const ENTITY_HINTS: Record<string, EntityDefinition> = {
  zomato: { canonicalName: "Zomato", category: "Food & Drinks", defaultAction: "Order" },
  swiggy: { canonicalName: "Swiggy", category: "Food & Drinks", defaultAction: "Order" },
  starbucks: { canonicalName: "Starbucks", category: "Food & Drinks", defaultAction: "Coffee" },
  mcdonalds: { canonicalName: "McDonalds", category: "Food & Drinks", defaultAction: "Burger" },
  uber: { canonicalName: "Uber", category: "Transport", defaultAction: "Ride" },
  ola: { canonicalName: "Ola", category: "Transport", defaultAction: "Ride" },
  rapido: { canonicalName: "Rapido", category: "Transport", defaultAction: "Ride" },
  irctc: { canonicalName: "IRCTC", category: "Transport", defaultAction: "Ticket" },
  amazon: { canonicalName: "Amazon", category: "Shopping", defaultAction: "Purchase" },
  flipkart: { canonicalName: "Flipkart", category: "Shopping", defaultAction: "Purchase" },
  myntra: { canonicalName: "Myntra", category: "Shopping", defaultAction: "Purchase" },
  netflix: { canonicalName: "Netflix", category: "Entertainment", defaultAction: "Subscription" },
  spotify: { canonicalName: "Spotify", category: "Entertainment", defaultAction: "Subscription" },
  zerodha: { canonicalName: "Zerodha", category: "Investment", defaultAction: "Trade" },
  groww: { canonicalName: "Groww", category: "Investment", defaultAction: "Trade" },
  udemy: { canonicalName: "Udemy", category: "Education", defaultAction: "Course" },
  coursera: { canonicalName: "Coursera", category: "Education", defaultAction: "Course" },
  edx: { canonicalName: "edX", category: "Education", defaultAction: "Course" },
};

// const CATEGORY_MAP: Record<string, { cat: TransactionCategory; weight: number }> = {
//   // Food & Drinks
//   restaurant: { cat: "Food & Drinks", weight: 3 }, cafe: { cat: "Food & Drinks", weight: 3 },
//   pizza: { cat: "Food & Drinks", weight: 2 }, burger: { cat: "Food & Drinks", weight: 2 },
//   burgers: { cat: "Food & Drinks", weight: 2 }, lunch: { cat: "Food & Drinks", weight: 2 },
//   dinner: { cat: "Food & Drinks", weight: 2 }, breakfast: { cat: "Food & Drinks", weight: 2 },
//   coffee: { cat: "Food & Drinks", weight: 1 }, food: { cat: "Food & Drinks", weight: 1 },
//   groceries: { cat: "Food & Drinks", weight: 2 }, grocery: { cat: "Food & Drinks", weight: 2 },
//   stall: { cat: "Food & Drinks", weight: 2 }, snacks: { cat: "Food & Drinks", weight: 3 },
//   tea: { cat: "Food & Drinks", weight: 3 },
//   // Transport
//   bus: { cat: "Transport", weight: 3 }, train: { cat: "Transport", weight: 3 },
//   metro: { cat: "Transport", weight: 3 }, fuel: { cat: "Transport", weight: 3 },
//   petrol: { cat: "Transport", weight: 3 }, cab: { cat: "Transport", weight: 2 },
//   taxi: { cat: "Transport", weight: 2 }, flight: { cat: "Transport", weight: 4 },
//   ticket: { cat: "Transport", weight: 2 }, tickets: { cat: "Transport", weight: 2 },
//   // Bills
//   rent: { cat: "Bills", weight: 5 }, electricity: { cat: "Bills", weight: 5 },
//   water: { cat: "Bills", weight: 4 }, internet: { cat: "Bills", weight: 4 },
//   wifi: { cat: "Bills", weight: 3 }, bill: { cat: "Bills", weight: 2 },
//   recharge: { cat: "Bills", weight: 3 }, emi: { cat: "Bills", weight: 5 },
//   insurance: { cat: "Bills", weight: 4 },
//   // Shopping
//   mall: { cat: "Shopping", weight: 2 }, clothes: { cat: "Shopping", weight: 3 },
//   shirt: { cat: "Shopping", weight: 3 }, shoes: { cat: "Shopping", weight: 3 },
//   shopping: { cat: "Shopping", weight: 2 },
//   // Investment
//   stocks: { cat: "Investment", weight: 5 }, stock: { cat: "Investment", weight: 4 },
//   mutual: { cat: "Investment", weight: 5 }, fund: { cat: "Investment", weight: 3 },
//   sip: { cat: "Investment", weight: 5 }, crypto: { cat: "Investment", weight: 5 },
//   shares: { cat: "Investment", weight: 4 },
//   // Education
//   fees: { cat: "Education", weight: 5 }, fee: { cat: "Education", weight: 5 },
//   tuition: { cat: "Education", weight: 5 }, school: { cat: "Education", weight: 4 },
//   college: { cat: "Education", weight: 4 }, course: { cat: "Education", weight: 4 },
//   coaching: { cat: "Education", weight: 4 }, book: { cat: "Education", weight: 3 },
//   books: { cat: "Education", weight: 3 }, exam: { cat: "Education", weight: 4 },
//   class: { cat: "Education", weight: 3 }, classes: { cat: "Education", weight: 3 },
//   // Entertainment
//   cinema: { cat: "Entertainment", weight: 4 }, movie: { cat: "Entertainment", weight: 4 },
  
//   // Freelance
//   freelance: { cat: "Freelance", weight: 5 }, client: { cat: "Freelance", weight: 4 },
//   payment: { cat: "Others", weight: 0 },
//   // Salary
//   salary: { cat: "Salary", weight: 5 }, payroll: { cat: "Salary", weight: 5 },
//   wages: { cat: "Salary", weight: 3 }, bonus: { cat: "Salary", weight: 5 },
//   reward: { cat: "Salary", weight: 4 }, performance: { cat: "Salary", weight: 3 },
//   stipend: { cat: "Salary", weight: 4 },
// };

const CATEGORY_MAP: Record<string, { cat: TransactionCategory; weight: number }> = {
  // ─── FOOD & DRINKS ──────────────────────────────────────────────────
  restaurant: { cat: "Food & Drinks", weight: 3 }, cafe: { cat: "Food & Drinks", weight: 3 },
  pizza: { cat: "Food & Drinks", weight: 2 }, burger: { cat: "Food & Drinks", weight: 2 },
  burgers: { cat: "Food & Drinks", weight: 2 }, lunch: { cat: "Food & Drinks", weight: 2 },
  dinner: { cat: "Food & Drinks", weight: 2 }, breakfast: { cat: "Food & Drinks", weight: 2 },
  coffee: { cat: "Food & Drinks", weight: 1 }, food: { cat: "Food & Drinks", weight: 1 },
  groceries: { cat: "Food & Drinks", weight: 2 }, grocery: { cat: "Food & Drinks", weight: 2 },
  stall: { cat: "Food & Drinks", weight: 2 }, snacks: { cat: "Food & Drinks", weight: 3 },
  tea: { cat: "Food & Drinks", weight: 3 }, bar: { cat: "Food & Drinks", weight: 4 },
  pub: { cat: "Food & Drinks", weight: 4 }, drinks: { cat: "Food & Drinks", weight: 3 },
  alcohol: { cat: "Food & Drinks", weight: 4 }, wine: { cat: "Food & Drinks", weight: 4 },
  beer: { cat: "Food & Drinks", weight: 4 }, sweet: { cat: "Food & Drinks", weight: 2 },
  sweets: { cat: "Food & Drinks", weight: 2 }, bakery: { cat: "Food & Drinks", weight: 3 },
  supermarket: { cat: "Food & Drinks", weight: 2 }, fruit: { cat: "Food & Drinks", weight: 2 },
  vegetables: { cat: "Food & Drinks", weight: 2 },

  // ─── TRANSPORT ──────────────────────────────────────────────────────
  bus: { cat: "Transport", weight: 3 }, train: { cat: "Transport", weight: 3 },
  metro: { cat: "Transport", weight: 3 }, fuel: { cat: "Transport", weight: 3 },
  petrol: { cat: "Transport", weight: 3 }, cab: { cat: "Transport", weight: 2 },
  taxi: { cat: "Transport", weight: 2 }, flight: { cat: "Transport", weight: 4 },
  ticket: { cat: "Transport", weight: 2 }, tickets: { cat: "Transport", weight: 2 },
  diesel: { cat: "Transport", weight: 3 }, cng: { cat: "Transport", weight: 3 },
  auto: { cat: "Transport", weight: 2 }, rickshaw: { cat: "Transport", weight: 3 },
  toll: { cat: "Transport", weight: 4 }, fastag: { cat: "Transport", weight: 5 },
  parking: { cat: "Transport", weight: 3 }, airline: { cat: "Transport", weight: 4 },
  railway: { cat: "Transport", weight: 3 }, driver: { cat: "Transport", weight: 3 },
  mechanic: { cat: "Transport", weight: 2 }, service: { cat: "Transport", weight: 1 },

  // ─── BILLS ──────────────────────────────────────────────────────────
  rent: { cat: "Bills", weight: 5 }, electricity: { cat: "Bills", weight: 5 },
  water: { cat: "Bills", weight: 4 }, internet: { cat: "Bills", weight: 4 },
  wifi: { cat: "Bills", weight: 3 }, bill: { cat: "Bills", weight: 2 },
  recharge: { cat: "Bills", weight: 3 }, emi: { cat: "Bills", weight: 5 },
  insurance: { cat: "Bills", weight: 4 }, gas: { cat: "Bills", weight: 4 },
  cylinder: { cat: "Bills", weight: 4 }, dth: { cat: "Bills", weight: 4 },
  broadband: { cat: "Bills", weight: 4 }, postpaid: { cat: "Bills", weight: 4 },
  prepaid: { cat: "Bills", weight: 2 }, maintenance: { cat: "Bills", weight: 4 },
  airtel: { cat: "Bills", weight: 3 }, jio: { cat: "Bills", weight: 3 },
  vi: { cat: "Bills", weight: 3 }, loan: { cat: "Bills", weight: 5 },

  // ─── SHOPPING ───────────────────────────────────────────────────────
  mall: { cat: "Shopping", weight: 2 }, clothes: { cat: "Shopping", weight: 3 },
  shirt: { cat: "Shopping", weight: 3 }, shoes: { cat: "Shopping", weight: 3 },
  shopping: { cat: "Shopping", weight: 2 }, tshirt: { cat: "Shopping", weight: 3 },
  jeans: { cat: "Shopping", weight: 3 }, dress: { cat: "Shopping", weight: 3 },
  watch: { cat: "Shopping", weight: 3 }, laptop: { cat: "Shopping", weight: 4 },
  mobile: { cat: "Shopping", weight: 2 }, phone: { cat: "Shopping", weight: 1 },
  gadget: { cat: "Shopping", weight: 3 }, electronics: { cat: "Shopping", weight: 4 },
  furniture: { cat: "Shopping", weight: 4 }, gift: { cat: "Shopping", weight: 3 },
  perfume: { cat: "Shopping", weight: 3 }, cosmetic: { cat: "Shopping", weight: 3 },

  // ─── INVESTMENT ─────────────────────────────────────────────────────
  stocks: { cat: "Investment", weight: 5 }, stock: { cat: "Investment", weight: 4 },
  mutual: { cat: "Investment", weight: 5 }, fund: { cat: "Investment", weight: 3 },
  sip: { cat: "Investment", weight: 5 }, crypto: { cat: "Investment", weight: 5 },
  shares: { cat: "Investment", weight: 4 }, bitcoin: { cat: "Investment", weight: 5 },
  etf: { cat: "Investment", weight: 5 }, equity: { cat: "Investment", weight: 4 },
  gold: { cat: "Investment", weight: 4 }, FD: { cat: "Investment", weight: 5 },
  deposit: { cat: "Investment", weight: 3 }, provident: { cat: "Investment", weight: 5 },
  ppf: { cat: "Investment", weight: 5 }, nps: { cat: "Investment", weight: 5 },

  // ─── EDUCATION ──────────────────────────────────────────────────────
  fees: { cat: "Education", weight: 5 }, fee: { cat: "Education", weight: 5 },
  tuition: { cat: "Education", weight: 5 }, school: { cat: "Education", weight: 4 },
  college: { cat: "Education", weight: 4 }, course: { cat: "Education", weight: 4 },
  coaching: { cat: "Education", weight: 4 }, book: { cat: "Education", weight: 3 },
  books: { cat: "Education", weight: 3 }, exam: { cat: "Education", weight: 4 },
  class: { cat: "Education", weight: 3 }, classes: { cat: "Education", weight: 3 },
  seminar: { cat: "Education", weight: 4 }, workshop: { cat: "Education", weight: 4 },
  bootcamp: { cat: "Education", weight: 4 }, certification: { cat: "Education", weight: 4 },
  udemy: { cat: "Education", weight: 3 }, coursera: { cat: "Education", weight: 3 },
  stationery: { cat: "Education", weight: 3 }, xerox: { cat: "Education", weight: 3 },

  // ─── ENTERTAINMENT ──────────────────────────────────────────────────
  cinema: { cat: "Entertainment", weight: 4 }, movie: { cat: "Entertainment", weight: 4 },
  netflix: { cat: "Entertainment", weight: 4 }, spotify: { cat: "Entertainment", weight: 4 },
  concert: { cat: "Entertainment", weight: 5 }, event: { cat: "Entertainment", weight: 2 },
  show: { cat: "Entertainment", weight: 2 }, theatre: { cat: "Entertainment", weight: 4 },
  game: { cat: "Entertainment", weight: 3 }, gaming: { cat: "Entertainment", weight: 3 },
  arcade: { cat: "Entertainment", weight: 4 }, club: { cat: "Entertainment", weight: 3 },
  amusement: { cat: "Entertainment", weight: 5 }, park: { cat: "Entertainment", weight: 2 },
  bowling: { cat: "Entertainment", weight: 4 }, subscription: { cat: "Entertainment", weight: 3 },

  // ─── FREELANCE ──────────────────────────────────────────────────────
  freelance: { cat: "Freelance", weight: 5 }, client: { cat: "Freelance", weight: 4 },
  contract: { cat: "Freelance", weight: 4 }, gig: { cat: "Freelance", weight: 4 },
  upwork: { cat: "Freelance", weight: 5 }, fiverr: { cat: "Freelance", weight: 5 },
  invoice: { cat: "Freelance", weight: 3 }, project: { cat: "Freelance", weight: 3 },
  retainer: { cat: "Freelance", weight: 5 }, consulting: { cat: "Freelance", weight: 4 },

  // ─── SALARY ─────────────────────────────────────────────────────────
  salary: { cat: "Salary", weight: 5 }, payroll: { cat: "Salary", weight: 5 },
  wages: { cat: "Salary", weight: 3 }, bonus: { cat: "Salary", weight: 5 },
  reward: { cat: "Salary", weight: 4 }, performance: { cat: "Salary", weight: 3 },
  stipend: { cat: "Salary", weight: 4 }, increment: { cat: "Salary", weight: 5 },
  appraisal: { cat: "Salary", weight: 5 }, incentive: { cat: "Salary", weight: 4 },

  // ─── OTHERS (Now includes explicit fallback categories like Medical/Gym) ───
  payment: { cat: "Others", weight: 0 }, hospital: { cat: "Others", weight: 4 },
  doctor: { cat: "Others", weight: 4 }, clinic: { cat: "Others", weight: 4 },
  medicine: { cat: "Others", weight: 4 }, pharmacy: { cat: "Others", weight: 4 },
  gym: { cat: "Others", weight: 4 }, fitness: { cat: "Others", weight: 4 },
  salon: { cat: "Others", weight: 4 }, spa: { cat: "Others", weight: 4 },
  barber: { cat: "Others", weight: 4 }, donation: { cat: "Others", weight: 4 },
  charity: { cat: "Others", weight: 4 }, cash: { cat: "Others", weight: 0 },
};
const PAYMENT_MAP: Record<string, { method: string; weight: number }> = {
  // UPI
  upi: { method: "UPI", weight: 3 }, gpay: { method: "UPI", weight: 4 },
  phonepe: { method: "UPI", weight: 4 }, paytm: { method: "UPI", weight: 4 },
  bhim: { method: "UPI", weight: 4 }, cred: { method: "UPI", weight: 4 },
  groww: { method: "UPI", weight: 3 }, zerodha: { method: "UPI", weight: 3 },
  // Card
  credit: { method: "Card", weight: 4 }, debit: { method: "Card", weight: 4 },
  card: { method: "Card", weight: 2 }, visa: { method: "Card", weight: 3 },
  mastercard: { method: "Card", weight: 3 }, amex: { method: "Card", weight: 5 },
  // Bank Transfer
  neft: { method: "Bank Transfer", weight: 5 }, imps: { method: "Bank Transfer", weight: 5 },
  rtgs: { method: "Bank Transfer", weight: 5 }, bank: { method: "Bank Transfer", weight: 1 },
  transfer: { method: "Bank Transfer", weight: 2 }, netbanking: { method: "Bank Transfer", weight: 3 },
  paypal: { method: "Bank Transfer", weight: 5 },
  // Cash
  cash: { method: "Cash", weight: 5 },
};

const CATEGORY_ALIASES: Record<string, string> = {
  khana: "food", khane: "food", khaana: "food", khilaya: "food",
  khaya: "food", khaye: "food", pine: "food", peene: "food",
  chai: "food", pani: "food", dudh: "food", lassi: "food",
  nashta: "food", bhojan: "food", dhaba: "food", tapri: "food",
  thela: "food", hotel: "food", padhai: "fees", shiksha: "fees"
};

// Expanded to exclude contextual and dimensional noise leakage
const SYSTEMIC_STOPWORDS = new Set([
  "for", "of", "to", "from", "on", "via", "by", "the", "a", "an", "and", "at", "in", "with", "using",
  "amount", "today", "yesterday", "rs", "inr", "rupees", "bucks", "towards", "took", "take", "got",
  "get", "gave", "give", "ordered", "order", "bought", "buy", "as", "is", "this", "month", "had",
  "around", "hours", "near", "station", "there", "some", "someone", "friends", "colleagues", "me", "my",
  "went", "website", "local", "stall", "company", "popcorn", "extras", "side", "sides",
  "charged", "after", "purchase", "daily", "travel", "cancelled", "account", "app",
  "home", "bill", "payment", "behind", "opposite", "floor", "mall", "street", "road", "area", "side"
]);

/* ========================================================================
   2. HEURISTIC VALIDATORS & SEMANTIC FALLBACK BUILDERS
   ======================================================================== */

function isBadTitle(title: string): boolean {
  const normalized = title.trim();
  if (!normalized) return true;
  const words = normalized.split(/\s+/);
  return (
    words.length < 2 ||
    words.every((w) => w.length <= 2) ||
    /^(after|before|had|paid|spent|received|credited|refund|for|around|hours|station|payment|salary|charged|app|fees|fee|course)$/i.test(normalized)
  );
}

export function generateSemanticFallback(category: TransactionCategory, type: string): string {
  const map: Record<TransactionCategory, string> = {
    "Food & Drinks": "Food Expense",
    "Transport": "Travel Expense",
    "Bills": "Bill Payment",
    "Shopping": "Shopping Expense",
    "Investment": "Investment Transaction",
    "Entertainment": "Entertainment Spend",
    "Salary": "Salary Credit",
    "Freelance": "Freelance Income",
    "Education": "Education Expense",
    "Others": "General Transaction"
  };
  return map[category] ?? `${category} ${type === "income" ? "Income" : "Expense"}`;
}

/* ========================================================================
   3. RULE-BASED TRANSLATION ENGINE
   ======================================================================== */

function parseTransactionRuleBased(input: string): {
  result: Transaction | Record<string, never>;
  categoryScores: Record<string, number>;
  incomeScore: number;
  expenseScore: number;
} {
  const normalized = input.replace(/[₹$€]/g, " $& ").trim();
  const tokens = normalized.split(/\s+/);

  const numericCandidates: { value: number; index: number; hasIndicator: boolean }[] = [];
  let incomeScore = 0, expenseScore = 0;
  const categoryScores: Record<string, number> = {};
  const paymentScores: Record<string, number> = {};
  const capturedEntities: EntityDefinition[] = [];
  const validNouns: string[] = [];
  let dateOffsetDays: number | null = null;
  let hasWalletSignature = false;
  let hasExplicitInversionSignal = false;

  // ── Phase 1: Token Scanning ───────────────────────────────────────────
  for (let i = 0; i < tokens.length; i++) {
    const rawToken = tokens[i];
    let cleanLower = rawToken.replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, "").toLowerCase();
    if (!cleanLower) continue;

    if (CATEGORY_ALIASES[cleanLower]) cleanLower = CATEGORY_ALIASES[cleanLower];

    // 1. Structural polarity triggers
    if (/^(refund|refunded|cashback)$/i.test(cleanLower)) {
      hasExplicitInversionSignal = true;
    }

    // 2. Numeric extraction
    const cleanNumericStr = cleanLower.replace(/,/g, "");
    if (/^\d+(?:\.\d+)?$/.test(cleanNumericStr)) {
      const val = parseFloat(cleanNumericStr);
      let hasIndicator = false;
      if (i > 0) {
        const prev = tokens[i - 1].toLowerCase();
        if (["₹", "rs", "rs.", "inr", "rupees", "paid", "spent", "credited", "refund"].includes(prev))
          hasIndicator = true;
      }
      if (i < tokens.length - 1 && !hasIndicator) {
        const next = tokens[i + 1].toLowerCase();
        if (["rs", "inr", "rupees", "bucks"].includes(next)) hasIndicator = true;
      }
      numericCandidates.push({ value: val, index: i, hasIndicator });
      continue;
    }

    // 3. Entity mapping
    if (ENTITY_HINTS[cleanLower]) {
      const entity = ENTITY_HINTS[cleanLower];
      capturedEntities.push(entity);
      categoryScores[entity.category] = (categoryScores[entity.category] || 0) + 5;
    }

    // 4. Score Tracking
    if (INCOME_SIGNALS[cleanLower]) incomeScore += INCOME_SIGNALS[cleanLower];
    if (EXPENSE_SIGNALS[cleanLower]) expenseScore += EXPENSE_SIGNALS[cleanLower];

    if (CATEGORY_MAP[cleanLower]) {
      const entry = CATEGORY_MAP[cleanLower];
      if (entry.weight > 0)
        categoryScores[entry.cat] = (categoryScores[entry.cat] || 0) + entry.weight;
    }

    if (PAYMENT_MAP[cleanLower]) {
      const entry = PAYMENT_MAP[cleanLower];
      paymentScores[entry.method] = (paymentScores[entry.method] || 0) + entry.weight;
    }

    if (["wallet", "cashapp", "venmo", "stripe", "pay"].includes(cleanLower))
      hasWalletSignature = true;

    // 5. Temporal
    if (cleanLower === "yesterday") dateOffsetDays = 1;
    if (cleanLower === "today") dateOffsetDays = 0;
    if (cleanLower === "days" && i > 0 && tokens[i + 1]?.toLowerCase() === "ago") {
      const prevDigits = tokens[i - 1].replace(/[^0-9]/g, "");
      if (prevDigits) dateOffsetDays = parseInt(prevDigits, 10);
    }

    // 6. Noun accumulation
    const isNoise =
      SYSTEMIC_STOPWORDS.has(cleanLower) ||
      INCOME_SIGNALS[cleanLower] !== undefined ||
      EXPENSE_SIGNALS[cleanLower] !== undefined ||
      PAYMENT_MAP[cleanLower] !== undefined;

    if (!isNoise) {
      const preserved = rawToken.replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, "");
      if (preserved.length > 1) {
        const cap = preserved.charAt(0).toUpperCase() + preserved.slice(1).toLowerCase();
        if (!validNouns.includes(cap)) validNouns.push(cap);
      }
    }
  }

  // ── Phase 2: Structural Resolution ─────────────────────────────────────
  if (numericCandidates.length === 0) return { result: {}, categoryScores, incomeScore, expenseScore };

  const resolvedAmount = numericCandidates.sort((a, b) => {
    if (a.hasIndicator !== b.hasIndicator) return a.hasIndicator ? -1 : 1;
    return b.value - a.value;
  })[0].value;

  if (resolvedAmount <= 0) return { result: {}, categoryScores, incomeScore, expenseScore };

  // TRANSACTION POLARITY LOCK LAYER OVERRIDE
  const finalType: "income" | "expense" = hasExplicitInversionSignal
    ? "income"
    : (incomeScore >= expenseScore && incomeScore > 0 ? "income" : "expense");

  let finalCategory: TransactionCategory = "Others", maxCatScore = 0;
  for (const [cat, score] of Object.entries(categoryScores)) {
    if (score > maxCatScore) { 
      maxCatScore = score; 
      finalCategory = cat as TransactionCategory; 
    }
  }

  let finalPaymentMethod = "Unspecified", maxPayScore = 0;
  for (const [method, score] of Object.entries(paymentScores)) {
    if (score > maxPayScore) { maxPayScore = score; finalPaymentMethod = method; }
  }
  if (maxPayScore === 0 && hasWalletSignature) finalPaymentMethod = "Bank Transfer";

  const dateObj = new Date();
  if (dateOffsetDays !== null) dateObj.setDate(dateObj.getDate() - dateOffsetDays);

  // ── Phase 3: Title Reconstruction ───────────────────────────────────────
  let reconstructedTitle = "";

  if (capturedEntities.length > 0) {
    const primary = capturedEntities[0];
    const modifier = validNouns.find(
      (n) =>
        n.toLowerCase() !== primary.canonicalName.toLowerCase() &&
        CATEGORY_MAP[n.toLowerCase()]?.cat === primary.category
    );
    if (modifier) {
      reconstructedTitle = `${primary.canonicalName} ${modifier}`;
    } else {
      const hasRefund = tokens.some((t) => /refund/i.test(t));
      const hasCashback = tokens.some((t) => /cashback/i.test(t));
      let action = primary.defaultAction;
      if (hasRefund) action = "Refund";
      else if (hasCashback) action = "Cashback";
      reconstructedTitle = `${primary.canonicalName} ${action}`;
    }
  } else {
    reconstructedTitle = validNouns.slice(0, 3).join(" ");
  }

  if (isBadTitle(reconstructedTitle))
    reconstructedTitle = generateSemanticFallback(finalCategory, finalType);

  if (finalCategory === "Others" && isBadTitle(reconstructedTitle))
    return { result: {}, categoryScores, incomeScore, expenseScore };


  return {
    result: {
      id: 0,
      title: reconstructedTitle.trim(),
      amount: resolvedAmount,
      category: finalCategory,
      type: finalType,
      paymentMethod: finalPaymentMethod,
      date: dateObj.toISOString(),
      description: `${finalType.charAt(0).toUpperCase() + finalType.slice(1)} transaction of ₹${resolvedAmount.toLocaleString("en-IN")} under ${finalCategory} via ${finalPaymentMethod}.`,
    },
    categoryScores,
    incomeScore,
    expenseScore,
  };
}

export function parseTransactionSync(
  input: string
): Transaction | Record<string, never> {
  if (!input?.trim()) return {};
  return parseTransactionRuleBased(input).result;
}
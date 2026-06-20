export interface Transaction {
  id: number;
  title: string;
  amount: number;
  category: string;
  type: "income" | "expense";
  paymentMethod: string;
  date: string;
  description: string;
}

/* ========================================================================
   1. DICTIONARIES, ENTITIES, AND STRUCTURAL DICTIONARY MAPS
   ======================================================================= */
// CRITICAL FIX: Boosted cashback/refund weights to match prime income anchors
const INCOME_SIGNALS: Record<string, number> = { salary: 5, payroll: 5, stipend: 4, wages: 3, bonus: 5, received: 3, credited: 5, income: 3, refund: 5, refunded: 5, cashback: 5, payout: 4, earned: 4 };
const EXPENSE_SIGNALS: Record<string, number> = { paid: 3, pay: 1, spent: 3, bought: 3, purchased: 4, debited: 5, withdrew: 3, billed: 2, sent: 2 };

interface EntityDefinition {
  canonicalName: string;
  category: string;
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
  groww: { canonicalName: "Groww", category: "Investment", defaultAction: "Trade" }
};

const CATEGORY_MAP: Record<string, { cat: string; weight: number }> = {
  restaurant: { cat: "Food & Drinks", weight: 3 }, cafe: { cat: "Food & Drinks", weight: 3 }, pizza: { cat: "Food & Drinks", weight: 2 }, burger: { cat: "Food & Drinks", weight: 2 }, lunch: { cat: "Food & Drinks", weight: 2 }, dinner: { cat: "Food & Drinks", weight: 2 }, breakfast: { cat: "Food & Drinks", weight: 2 }, coffee: { cat: "Food & Drinks", weight: 1 }, food: { cat: "Food & Drinks", weight: 1 }, groceries: { cat: "Food & Drinks", weight: 2 }, grocery: { cat: "Food & Drinks", weight: 2 },
  bus: { cat: "Transport", weight: 3 }, train: { cat: "Transport", weight: 3 }, metro: { cat: "Transport", weight: 3 }, fuel: { cat: "Transport", weight: 3 }, petrol: { cat: "Transport", weight: 3 }, cab: { cat: "Transport", weight: 2 }, taxi: { cat: "Transport", weight: 2 }, flight: { cat: "Transport", weight: 4 },
  rent: { cat: "Bills", weight: 5 }, electricity: { cat: "Bills", weight: 5 }, water: { cat: "Bills", weight: 4 }, internet: { cat: "Bills", weight: 4 }, wifi: { cat: "Bills", weight: 3 }, bill: { cat: "Bills", weight: 2 }, recharge: { cat: "Bills", weight: 3 }, emi: { cat: "Bills", weight: 5 }, insurance: { cat: "Bills", weight: 4 },
  mall: { cat: "Shopping", weight: 2 }, clothes: { cat: "Shopping", weight: 3 }, shirt: { cat: "Shopping", weight: 3 }, shoes: { cat: "Shopping", weight: 3 }, shopping: { cat: "Shopping", weight: 2 },
  stocks: { cat: "Investment", weight: 5 }, stock: { cat: "Investment", weight: 4 }, mutual: { cat: "Investment", weight: 5 }, fund: { cat: "Investment", weight: 3 }, sip: { cat: "Investment", weight: 5 }, crypto: { cat: "Investment", weight: 5 }, shares: { cat: "Investment", weight: 4 },
  cinema: { cat: "Entertainment", weight: 4 }, movie: { cat: "Entertainment", weight: 4 }, ticket: { cat: "Entertainment", weight: 3 }, tickets: { cat: "Entertainment", weight: 3 },
  freelance: { cat: "Freelance", weight: 5 }, client: { cat: "Freelance", weight: 4 }, payment: { cat: "Others", weight: 0 },
  reward: { cat: "Salary", weight: 4 }, performance: { cat: "Salary", weight: 3 },
  stall: { cat: "Food & Drinks", weight: 2 }, snacks: { cat: "Food & Drinks", weight: 3 }, tea: { cat: "Food & Drinks", weight: 3 }
};

const PAYMENT_MAP: Record<string, { method: string; weight: number }> = {
  upi: { method: "UPI", weight: 3 }, gpay: { method: "UPI", weight: 4 }, phonepe: { method: "UPI", weight: 4 }, paytm: { method: "UPI", weight: 4 }, bhim: { method: "UPI", weight: 4 }, cred: { method: "UPI", weight: 4 },
  credit: { method: "Card", weight: 4 }, debit: { method: "Card", weight: 4 }, card: { method: "Card", weight: 2 }, visa: { method: "Card", weight: 3 }, mastercard: { method: "Card", weight: 3 }, amex: { method: "Card", weight: 5 },
  neft: { method: "Bank Transfer", weight: 5 }, imps: { method: "Bank Transfer", weight: 5 }, rtgs: { method: "Bank Transfer", weight: 5 }, bank: { method: "Bank Transfer", weight: 1 }, transfer: { method: "Bank Transfer", weight: 2 }, netbanking: { method: "Bank Transfer", weight: 3 },
  paypal: { method: "Bank Transfer", weight: 5 }, // CRITICAL FIX: Explicit route matching for cross-border gateways
  cash: { method: "Cash", weight: 5 }
};

// CRITICAL FIX: Cleaned trailing transactional noise ("popcorn", "friends") out of system loops
const SYSTEMIC_STOPWORDS = new Set([
  "for", "of", "to", "from", "on", "via", "by", "the", "a", "an", "and", "at", "in", "with", "using", 
  "amount", "today", "yesterday", "rs", "inr", "rupees", "bucks", "towards", "took", "take", "got", 
  "get", "gave", "give", "ordered", "order", "bought", "buy", "as", "is", "this", "month", "had", 
  "around", "hours", "near", "station", "there", "some", "someone", "friends", "colleagues", "me", "my",
  "went", "payment", "website", "local", "stall", "company", "popcorn", "extras", "side", "sides"
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
    words.every(w => w.length <= 2) || 
    /^(after|before|had|paid|spent|received|credited|refund|for|around|hours|station|payment|salary)$/i.test(normalized)
  );
}

function generateSemanticFallback(category: string, type: string): string {
  const map: Record<string, string> = {
    "Food & Drinks": "Food Expense",
    "Transport": "Travel Expense",
    "Bills": "Bill Payment",
    "Shopping": "Shopping Expense",
    "Investment": "Investment Transaction",
    "Entertainment": "Entertainment Spend",
    "Salary": "Salary Payout",
    "Freelance": "Freelance Income"
  };
  return map[category] ?? `${category} ${type === "income" ? "Income" : "Expense"}`;
}

/* ========================================================================
   3. HIGH-PERFORMANCE TRANSLATION ENGINE
   ======================================================================== */
export function parseTransactionHybrid(input: string): Transaction | Record<string, never> {
  if (!input || !input.trim()) return {};

  const normalized = input.replace(/[₹$€]/g, " $& ").trim();
  const tokens = normalized.split(/\s+/);

  const numericCandidates: { value: number; index: number; hasIndicator: boolean }[] = [];
  let incomeScore = 0;
  let expenseScore = 0;
  
  const categoryScores: Record<string, number> = {};
  const paymentScores: Record<string, number> = {};
  
  const capturedEntities: EntityDefinition[] = [];
  const validNouns: string[] = [];

  let dateOffsetDays: number | null = null;
  let hasWalletSignature = false;

  for (let i = 0; i < tokens.length; i++) {
    const rawToken = tokens[i];
    const cleanLower = rawToken.replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, "").toLowerCase();
    
    if (!cleanLower) continue;

    // 1. Structural Numeric Extraction
    const cleanNumericStr = cleanLower.replace(/,/g, "");
    if (/^\d+(?:\.\d+)?$/.test(cleanNumericStr)) {
      const val = parseFloat(cleanNumericStr);
      let hasIndicator = false;
      if (i > 0) {
        const prev = tokens[i - 1].toLowerCase();
        if (["₹", "rs", "rs.", "inr", "rupees", "paid", "spent", "credited", "refund"].includes(prev)) hasIndicator = true;
      }
      if (i < tokens.length - 1 && !hasIndicator) {
        const next = tokens[i + 1].toLowerCase();
        if (["rs", "inr", "rupees", "bucks"].includes(next)) hasIndicator = true;
      }
      numericCandidates.push({ value: val, index: i, hasIndicator });
      continue;
    }

    // 2. Structural Entity Anchor Capture
    if (ENTITY_HINTS[cleanLower]) {
      const entity = ENTITY_HINTS[cleanLower];
      capturedEntities.push(entity);
      categoryScores[entity.category] = (categoryScores[entity.category] || 0) + 5; 
    }

    // 3. System Linguistic Rule Mapping
    if (INCOME_SIGNALS[cleanLower]) incomeScore += INCOME_SIGNALS[cleanLower];
    if (EXPENSE_SIGNALS[cleanLower]) expenseScore += EXPENSE_SIGNALS[cleanLower];

    if (CATEGORY_MAP[cleanLower]) {
      const entry = CATEGORY_MAP[cleanLower];
      if (entry.weight > 0) {
        categoryScores[entry.cat] = (categoryScores[entry.cat] || 0) + entry.weight;
      }
    }

    if (PAYMENT_MAP[cleanLower]) {
      const entry = PAYMENT_MAP[cleanLower];
      paymentScores[entry.method] = (paymentScores[entry.method] || 0) + entry.weight;
    }

    // Capture generic wallet intent hints
    if (["wallet", "cashapp", "venmo", "stripe", "pay"].includes(cleanLower)) {
      hasWalletSignature = true;
    }

    // 4. Temporal Chronology Tracking
    if (cleanLower === "yesterday") dateOffsetDays = 1;
    if (cleanLower === "today") dateOffsetDays = 0;
    if (cleanLower === "days" && i > 0 && tokens[i + 1]?.toLowerCase() === "ago") {
      const prevDigits = tokens[i - 1].replace(/[^0-9]/g, "");
      if (prevDigits) dateOffsetDays = parseInt(prevDigits, 10);
    }

    // 5. Structural Core Noun Accumulation
    const isSystemicNoise = 
      SYSTEMIC_STOPWORDS.has(cleanLower) || 
      INCOME_SIGNALS[cleanLower] !== undefined || 
      EXPENSE_SIGNALS[cleanLower] !== undefined ||
      PAYMENT_MAP[cleanLower] !== undefined;

    if (!isSystemicNoise) {
      const preservedNoun = rawToken.replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, "");
      if (preservedNoun.length > 1) {
        const capitalized = preservedNoun.charAt(0).toUpperCase() + preservedNoun.slice(1).toLowerCase();
        if (!validNouns.includes(capitalized)) {
          validNouns.push(capitalized);
        }
      }
    }
  }

  // --- PHASE 2: DETACHED INTENT POST-PROCESSING ---

  if (numericCandidates.length === 0) return {};
  const resolvedAmount = numericCandidates.sort((a, b) => {
    if (a.hasIndicator !== b.hasIndicator) return a.hasIndicator ? -1 : 1;
    return b.value - a.value;
  })[0].value;
  
  if (resolvedAmount <= 0) return {};

  const finalType: "income" | "expense" = (incomeScore >= expenseScore && incomeScore > 0) ? "income" : "expense";

  let finalCategory = "Others";
  let maxCatScore = 0;
  for (const [cat, score] of Object.entries(categoryScores)) {
    if (score > maxCatScore) {
      maxCatScore = score;
      finalCategory = cat;
    }
  }

  // CRITICAL FIX: Safe routing fallback matrix logic
  let finalPaymentMethod = "UPI"; 
  let maxPayScore = 0;
  for (const [method, score] of Object.entries(paymentScores)) {
    if (score > maxPayScore) {
      maxPayScore = score;
      finalPaymentMethod = method;
    }
  }
  // If no explicit keyword matches but signature hints pointing to wallet are caught
  if (maxPayScore === 0 && hasWalletSignature) {
    finalPaymentMethod = "Bank Transfer"; 
  }

  const dateObj = new Date();
  if (dateOffsetDays !== null) {
    dateObj.setDate(dateObj.getDate() - dateOffsetDays);
  }

  // --- PHASE 3: HIGHER-ORDER INTENT TITLE RECONSTRUCTION ---
  let reconstructedTitle = "";

  if (capturedEntities.length > 0) {
    const primaryEntity = capturedEntities[0];
    
    const contextualModifier = validNouns.find(noun => 
      noun.toLowerCase() !== primaryEntity.canonicalName.toLowerCase() &&
      CATEGORY_MAP[noun.toLowerCase()]?.cat === primaryEntity.category
    );

    if (contextualModifier) {
      reconstructedTitle = `${primaryEntity.canonicalName} ${contextualModifier}`;
    } else {
      // Intent balancing logic
      const hasRefundToken = tokens.some(t => /refund/i.test(t));
      const hasCashbackToken = tokens.some(t => /cashback/i.test(t));
      
      let actionLabel = primaryEntity.defaultAction;
      if (hasRefundToken) actionLabel = "Refund";
      else if (hasCashbackToken) actionLabel = "Cashback";

      reconstructedTitle = `${primaryEntity.canonicalName} ${actionLabel}`;
    }
  } else {
    reconstructedTitle = validNouns.slice(0, 4).join(" ");
  }

  if (isBadTitle(reconstructedTitle)) {
    reconstructedTitle = generateSemanticFallback(finalCategory, finalType);
  }

  if (finalCategory === "Others" && isBadTitle(reconstructedTitle)) {
    return {}; 
  }

  return {
    id: 0,
    title: reconstructedTitle.trim(),
    amount: resolvedAmount,
    category: finalCategory,
    type: finalType,
    paymentMethod: finalPaymentMethod,
    date: dateObj.toISOString(),
    description: `${finalType.toUpperCase()} transaction of ₹${resolvedAmount.toFixed(2)} under ${finalCategory} via ${finalPaymentMethod}.`
  };
}
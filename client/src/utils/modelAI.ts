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

export interface PipelineResult {
  transaction: Transaction | null;
  confidence: number;
  needsLLM: boolean;
}

/* ========================================================================
   1. DICTIONARIES, ENTITIES, AND STRUCTURAL DICTIONARY MAPS
   ======================================================================== */
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

// PRODUCTION UPDATE: Complete enterprise multi-channel payment matrix
const PAYMENT_MAP: Record<string, { method: string; weight: number }> = {
  // UPI Rails
  upi: { method: "UPI", weight: 4 }, gpay: { method: "UPI", weight: 4 }, phonepe: { method: "UPI", weight: 4 }, paytm: { method: "UPI", weight: 4 }, bhim: { method: "UPI", weight: 4 }, cred: { method: "UPI", weight: 4 }, googlepay: { method: "UPI", weight: 4 },
  // Card Infrastructure
  credit: { method: "Card", weight: 4 }, debit: { method: "Card", weight: 4 }, card: { method: "Card", weight: 2 }, visa: { method: "Card", weight: 3 }, mastercard: { method: "Card", weight: 3 }, amex: { method: "Card", weight: 5 }, stripe: { method: "Card", weight: 4 }, applepay: { method: "Card", weight: 4 },
  // Core Bank Settlement
  neft: { method: "Bank Transfer", weight: 5 }, imps: { method: "Bank Transfer", weight: 5 }, rtgs: { method: "Bank Transfer", weight: 5 }, bank: { method: "Bank Transfer", weight: 1 }, transfer: { method: "Bank Transfer", weight: 2 }, netbanking: { method: "Bank Transfer", weight: 3 },
  // Digital Wallet Infrastructure Class
  paypal: { method: "Digital Wallet", weight: 5 }, venmo: { method: "Digital Wallet", weight: 5 }, cashapp: { method: "Digital Wallet", weight: 5 }, wallet: { method: "Digital Wallet", weight: 2 },
  // Hard Currency Settlement
  cash: { method: "Cash", weight: 5 }
};

const SYSTEMIC_STOPWORDS = new Set([
  "for", "of", "to", "from", "on", "via", "by", "the", "a", "an", "and", "at", "in", "with", "using", 
  "amount", "today", "yesterday", "rs", "inr", "rupees", "bucks", "towards", "took", "take", "got", 
  "get", "gave", "give", "ordered", "order", "bought", "buy", "as", "is", "this", "month", "had", 
  "around", "hours", "near", "station", "there", "some", "someone", "friends", "colleagues", "me", "my",
  "went", "payment", "website", "local", "stall", "company", "popcorn", "extras", "side", "sides"
]);

/* ========================================================================
   1B. TYPO TOLERANCE LAYER — ALIAS DICTIONARY + FUZZY MATCHING
   ======================================================================== */

// Curated misspelling -> canonical-token aliases. These are checked before
// fuzzy matching and cover common/ambiguous-length typos where pure edit
// distance would be unsafe to trust (e.g. short words).
const ALIASES: Record<string, string> = {
  // Entities
  zomat: "zomato", zomto: "zomato", zomatoo: "zomato",
  amazn: "amazon", amzon: "amazon", amzn: "amazon",
  flixpkart: "flipkart", flipkrt: "flipkart", flipkartt: "flipkart",
  swigy: "swiggy", swiggyy: "swiggy",
  starbuks: "starbucks", starbuck: "starbucks",
  mcdonald: "mcdonalds", maccas: "mcdonalds",
  ubr: "uber",
  olaa: "ola",
  rapdo: "rapido",
  myntraa: "myntra",
  netflx: "netflix", netflix1: "netflix",
  spotifyy: "spotify",
  zerodhaa: "zerodha",
  groww1: "groww",
  // Payment rails
  phonpe: "phonepe", phonpay: "phonepe", phonepay: "phonepe",
  paytmm: "paytm", paytem: "paytm",
  gpayy: "gpay",
  // Income / expense signals
  credted: "credited", creditted: "credited",
  recived: "received", recieved: "received",
  refnd: "refund", refundd: "refund",
  // Category terms
  electrcity: "electricity", electricty: "electricity",
  mutul: "mutual", mutaul: "mutual",
  grocerys: "groceries",
  resturant: "restaurant", restaurent: "restaurant",
  insurence: "insurance"
};

// Minimum word length eligible for fuzzy (edit-distance) matching. Below
// this length, edit-distance-1 neighborhoods collide too easily between
// semantically unrelated words (cash/card, bus/bonus, rent/refund,
// food/fund, sip/ship all sit at distance 1-2 with short lengths), so those
// must be disambiguated only via the explicit ALIASES table above, never
// via fuzzy search.
const MIN_FUZZY_LENGTH = 5;
const MAX_FUZZY_LENGTH_DIFF = 1;

// Damerau-Levenshtein distance (adjacent transpositions count as a single
// edit), so swapped-letter typos like "pyatm" -> "paytm" resolve at
// distance 1 rather than 2.
function damerauLevenshteinDistance(a: string, b: string): number {
  const al = a.length;
  const bl = b.length;

  if (a === b) return 0;
  if (al === 0) return bl;
  if (bl === 0) return al;

  const d: number[][] = new Array(al + 1);
  for (let i = 0; i <= al; i++) {
    d[i] = new Array(bl + 1).fill(0);
    d[i][0] = i;
  }
  for (let j = 0; j <= bl; j++) d[0][j] = j;

  for (let i = 1; i <= al; i++) {
    for (let j = 1; j <= bl; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      let best = Math.min(
        d[i - 1][j] + 1,      // deletion
        d[i][j - 1] + 1,      // insertion
        d[i - 1][j - 1] + cost // substitution
      );
      if (
        i > 1 &&
        j > 1 &&
        a[i - 1] === b[j - 2] &&
        a[i - 2] === b[j - 1]
      ) {
        best = Math.min(best, d[i - 2][j - 2] + cost); // transposition
      }
      d[i][j] = best;
    }
  }

  return d[al][bl];
}

function commonPrefixLength(a: string, b: string): number {
  const len = Math.min(a.length, b.length);
  let i = 0;
  while (i < len && a[i] === b[i]) i++;
  return i;
}

/**
 * Attempts to resolve `word` against the keys of `dictionary` using:
 *   1. Exact match
 *   2. Alias-table lookup (curated, safe for short/ambiguous words)
 *   3. Fuzzy (Damerau-Levenshtein) lookup — only for words of length >=
 *      MIN_FUZZY_LENGTH, only within maxDistance, only when exactly one
 *      dictionary key is the closest candidate (ties resolve to
 *      "no match" to avoid guessing).
 * Returns the matching dictionary key, or undefined if nothing qualifies.
 */
function fuzzyLookup<T>(
  word: string,
  dictionary: Record<string, T>,
  maxDistance: number = 1
): string | undefined {
  if (!word) return undefined;

  // 1. Exact match — short-circuits everything else.
  if (Object.prototype.hasOwnProperty.call(dictionary, word)) {
    return word;
  }

  // 2. Alias lookup — curated, deterministic, safe even for short words.
  const aliased = ALIASES[word];
  if (aliased !== undefined && Object.prototype.hasOwnProperty.call(dictionary, aliased)) {
    return aliased;
  }

  // 3. Fuzzy lookup — gated by minimum length to avoid unsafe short-word
  // collisions (cash/card, bus/bonus, rent/refund, food/fund, sip/ship).
  if (word.length < MIN_FUZZY_LENGTH) return undefined;

  let bestKey: string | undefined;
  let bestDistance = Infinity;
  let bestIsUnique = true;

  for (const key of Object.keys(dictionary)) {
    if (key.length < MIN_FUZZY_LENGTH) continue;
    if (Math.abs(key.length - word.length) > MAX_FUZZY_LENGTH_DIFF) continue;

    const distance = damerauLevenshteinDistance(word, key);
    if (distance > maxDistance) continue;

    // Require a shared prefix so unrelated words of similar length/edit
    // distance (which is already rare once length >= 5) cannot match.
    if (commonPrefixLength(word, key) < 2) continue;

    if (distance < bestDistance) {
      bestDistance = distance;
      bestKey = key;
      bestIsUnique = true;
    } else if (distance === bestDistance && key !== bestKey) {
      bestIsUnique = false;
    }
  }

  if (bestKey !== undefined && bestIsUnique && bestDistance <= maxDistance) {
    return bestKey;
  }

  return undefined;
}

/**
 * Normalizes a raw lowercase token into its canonical dictionary form by
 * trying ENTITY_HINTS, CATEGORY_MAP, PAYMENT_MAP, INCOME_SIGNALS, and
 * EXPENSE_SIGNALS in turn. Returns the original token if nothing matches
 * in any dictionary, so downstream "is this a stopword / unknown noun"
 * logic still works unchanged.
 */
function normalizeToken(token: string): string {
  return (
    fuzzyLookup(token, ENTITY_HINTS) ??
    fuzzyLookup(token, CATEGORY_MAP) ??
    fuzzyLookup(token, PAYMENT_MAP) ??
    fuzzyLookup(token, INCOME_SIGNALS) ??
    fuzzyLookup(token, EXPENSE_SIGNALS) ??
    token
  );
}

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
   3. HIGH-PERFORMANCE PIPELINE WITH CONFIDENCE ROUTING
   ======================================================================== */
export function parseTransactionProduction(input: string): PipelineResult {
  if (!input || !input.trim()) {
    return { transaction: null, confidence: 0.0, needsLLM: true };
  }

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
  let hasExplicitPaymentToken = false;

  for (let i = 0; i < tokens.length; i++) {
    const rawToken = tokens[i];
    const rawCleanLower = rawToken.replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, "").toLowerCase();
    
    if (!rawCleanLower) continue;

    // 1. Structural Numeric Extraction (run on the raw token; numbers are
    // never subject to typo normalization).
    const cleanNumericStr = rawCleanLower.replace(/,/g, "");
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

    // 1B. Typo Tolerance Normalization — resolves common misspellings to
    // their canonical dictionary form before any lookup occurs.
    const cleanLower = normalizeToken(rawCleanLower);

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
      hasExplicitPaymentToken = true;
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

  // Strict Numerical Safety Isolation
  if (numericCandidates.length === 0) {
    return { transaction: null, confidence: 0.0, needsLLM: true };
  }
  const resolvedAmount = numericCandidates.sort((a, b) => {
    if (a.hasIndicator !== b.hasIndicator) return a.hasIndicator ? -1 : 1;
    return b.value - a.value;
  })[0].value;
  
  if (resolvedAmount <= 0) {
    return { transaction: null, confidence: 0.0, needsLLM: true };
  }

  const finalType: "income" | "expense" = (incomeScore >= expenseScore && incomeScore > 0) ? "income" : "expense";

  let finalCategory = "Others";
  let maxCatScore = 0;
  for (const [cat, score] of Object.entries(categoryScores)) {
    if (score > maxCatScore) {
      maxCatScore = score;
      finalCategory = cat;
    }
  }

  let finalPaymentMethod = "UPI"; // Default routing rail
  let maxPayScore = 0;
  for (const [method, score] of Object.entries(paymentScores)) {
    if (score > maxPayScore) {
      maxPayScore = score;
      finalPaymentMethod = method;
    }
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

  // --- PHASE 4: DETERMINISTIC CONFIDENCE MATRIX EVALUATION ---
  let confidenceScore = 0.0;

  // Evaluate Category Core Anchors
  if (maxCatScore >= 5) confidenceScore += 0.50;      // Target Entity or high-order phrase match
  else if (maxCatScore >= 3) confidenceScore += 0.35; // Standard domain keyword match
  else if (maxCatScore >= 1) confidenceScore += 0.15; // Weak signal

  // Evaluate Payment Channel Transparency
  if (hasExplicitPaymentToken) confidenceScore += 0.30;

  // Evaluate Directional Linguistic Corroboration
  if (incomeScore > 0 || expenseScore > 0) confidenceScore += 0.20;

  // Strict Production Gateway Rules
  const CONFIDENCE_THRESHOLD = 0.65;
  let needsLLMTrigger = confidenceScore < CONFIDENCE_THRESHOLD;

  if (finalCategory === "Others") {
    needsLLMTrigger = true; // Fallback immediately if data domain drops out of network parameters
  }

  return {
    transaction: needsLLMTrigger ? null : {
      id: 0,
      title: reconstructedTitle.trim(),
      amount: resolvedAmount,
      category: finalCategory,
      type: finalType,
      paymentMethod: finalPaymentMethod,
      date: dateObj.toISOString(),
      description: `${finalType.toUpperCase()} transaction of ₹${resolvedAmount.toFixed(2)} under ${finalCategory} via ${finalPaymentMethod}.`
    },
    confidence: parseFloat(confidenceScore.toFixed(2)),
    needsLLM: needsLLMTrigger
  };
}
import type { PaymentMethod, TransactionCategory, TransactionType } from "../mocks/transactions";

/* ================================
   RULE MAPS
================================ */

const CATEGORY_RULES: Record<TransactionCategory, string[]> = {
    Salary: ["salary", "payroll", "stipend", "wages", "bonus"],
    Freelance: ["freelance", "client payment", "client", "invoice", "gig", "upwork", "fiverr"],
    Investment: ["stocks", "stock", "mutual fund", "sip", "investment", "invested", "crypto", "bitcoin", "shares", "dividend", "zerodha", "groww", "indmoney"],
    Bills: ["bill", "electricity", "water bill", "rent", "internet", "wifi", "broadband", "mobile bill", "recharge", "emi", "insurance", "premium", "dth", "gas", "pipeline"],
    Education: ["course", "tuition", "college", "school fee", "school", "fees", "fee", "textbook", "exam fee", "udemy", "coursera"],
    Entertainment: ["movie", "movie ticket", "netflix", "spotify", "prime video", "hotstar", "video game", "gaming", "cinema", "theater", "concert", "pub", "clubbing"],
    Transport: ["uber", "ola", "rapido", "bus", "bus ticket", "train", "train ticket", "metro", "fuel", "petrol", "diesel", "cab", "taxi", "auto", "flight", "flight ticket", "parking", "toll", "irctc"],
    "Food & Drinks": ["restaurant", "lunch", "dinner", "breakfast", "pizza", "coffee", "tea", "snacks", "zomato", "swiggy", "food", "groceries", "grocery", "burger", "cafe", "blinkit", "instamart", "starbucks"],
    Shopping: ["amazon", "flipkart", "myntra", "mall", "clothes", "shirt", "shoes", "shopping", "meesho"],
    Others: [],
};

const PAYMENT_RULES: Record<PaymentMethod, string[]> = {
    UPI: ["upi", "gpay", "google pay", "phonepe", "paytm", "bhim", "cred"],
    Card: ["credit card", "debit card", "card", "visa", "mastercard", "amex", "diners"],
    "Bank Transfer": ["neft", "imps", "rtgs", "bank transfer", "net banking", "bank", "ach"],
    Cash: ["cash"],
};

const INCOME_WORDS = ["salary", "received", "credited", "income", "refund", "refunded", "cashback", "payout", "earned", "earnt", "bonus"];
const EXPENSE_WORDS = ["paid", "pay", "paying", "spent", "bought", "purchased", "debited", "withdrew", "billed", "sent"];

const TITLE_STOPWORDS = new Set([
    "for", "of", "to", "from", "on", "via", "by", "the", "a", "an", "and",
    "at", "in", "with", "using", "amount", "today", "yesterday",
    "rs", "inr", "rupees", "bucks", "towards",
    "took", "take", "got", "get", "gave", "give", "ordered", "order",
    "bought", "buy", "as", "is", "this", "month",
]);

/* ================================
   CORE HELPER LINGUISTICS
================================ */

/**
 * Strict regex word-boundary lookup.
 * Protects sub-string leakage safely.
 */
function testWordBoundary(text: string, phrase: string): boolean {
    const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`(?<![a-zA-Z0-9])${escaped}(?![a-zA-Z0-9])`, "i").test(text);
}

/* ================================
   ADVANCED AMOUNT & CONTEXT EXTRACTION
================================ */

const NUMBER_RE = "\\d{1,3}(?:,\\d{2,3})+(?:\\.\\d+)?|\\d+(?:\\.\\d+)?";

function parseNum(raw: string): number {
    return Number(raw.replace(/,/g, ""));
}

/**
 * Parses numeric text while retaining full tracking of proximity to currency symbols.
 */
function extractAmountAndContext(text: string): { amount: number | null; clearedText: string } {
    const patterns = [
        new RegExp(`₹\\s*(${NUMBER_RE})`, "i"),
        new RegExp(`(?:rs\\.?|inr|rupees)\\s*(${NUMBER_RE})`, "i"),
        new RegExp(`(${NUMBER_RE})\\s*(?:rs\\.?|inr|rupees|bucks)`, "i")
    ];

    for (const regex of patterns) {
        const match = text.match(regex);

        if (!match) continue;

        const capturedNumber = match[1] ?? match[0];

        return {
            amount: parseNum(capturedNumber),
            clearedText: text.replace(match[0], " "),
        };
    }

    // Fallback Proximity Heuristic: Detects all valid logical numbers
    const allMatches = [...text.matchAll(new RegExp(NUMBER_RE, "g"))];
    if (allMatches.length === 0) return { amount: null, clearedText: text };

    // If a number is structurally flanked by common currency indicators, prioritize it over pure size
    const scoredNumbers = allMatches.map((m) => {
        const val = parseNum(m[0]);
        const index = m.index ?? 0;

        // Look at immediate surrounding context tokens window (-7 to +12 characters)
        const contextWindow = text.slice(Math.max(0, index - 7), Math.min(text.length, index + m[0].length + 12)).toLowerCase();
        let priorityScore = val; // Base score is numeric value

        if (/\b(paid|spent|cost|total|bill|sent|rs|inr|₹)\b/i.test(contextWindow)) {
            priorityScore += 100000; // Artificially boost numbers linked to currency identifiers
        }

        return { val, fullMatch: m[0], index, priorityScore };
    });

    const bestTarget = scoredNumbers.reduce((max, cur) => (cur.priorityScore > max.priorityScore ? cur : max), scoredNumbers[0]);

    const clearedText = text.slice(0, bestTarget.index) + " " + text.slice(bestTarget.index + bestTarget.fullMatch.length);
    return { amount: bestTarget.val, clearedText };
}

/* ================================
   DYNAMIC LINGUISTIC DETECTORS
================================ */

function detectType(text: string): TransactionType {
    const incomeHits = INCOME_WORDS.filter((w) => testWordBoundary(text, w));
    const expenseHits = EXPENSE_WORDS.filter((w) => testWordBoundary(text, w));

    if (incomeHits.length && expenseHits.length) {
        const textLower = text.toLowerCase();
        const firstIncomeIdx = Math.min(...incomeHits.map((w) => textLower.indexOf(w)));
        const firstExpenseIdx = Math.min(...expenseHits.map((w) => textLower.indexOf(w)));
        return firstIncomeIdx <= firstExpenseIdx ? "income" : "expense";
    }
    return incomeHits.length ? "income" : "expense";
}

function detectCategory(text: string): TransactionCategory {
    let best: TransactionCategory = "Others";
    let bestScore = 0;
    let bestSpecificity = 0;

    for (const [category, keywords] of Object.entries(CATEGORY_RULES)) {
        const hits = keywords.filter((k) => testWordBoundary(text, k));
        if (hits.length === 0) continue;

        const score = hits.length;
        const specificity = Math.max(...hits.map((h) => h.length));

        if (score > bestScore || (score === bestScore && specificity > bestSpecificity)) {
            best = category as TransactionCategory;
            bestScore = score;
            bestSpecificity = specificity;
        }
    }
    return best;
}

function detectPaymentMethod(text: string): PaymentMethod {
    for (const [method, keywords] of Object.entries(PAYMENT_RULES)) {
        if (keywords.some((k) => testWordBoundary(text, k))) {
            return method as PaymentMethod;
        }
    }
    return "UPI";
}

/* ================================
   SMART CHRONOLOGICAL DATE PROCESSING
================================ */

const MONTH_NAMES = "jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?";

function extractDate(text: string): Date {
    const now = new Date();
    const currentYear = now.getFullYear();

    if (testWordBoundary(text, "yesterday")) {
        const d = new Date(now);
        d.setDate(d.getDate() - 1);
        return d;
    }
    if (testWordBoundary(text, "today")) return now;

    const daysAgo = text.match(/(\d+)\s*days?\s*ago/i);
    if (daysAgo) {
        const d = new Date(now);
        d.setDate(d.getDate() - Number(daysAgo[1]));
        return d;
    }

    const numeric = text.match(/(\d{1,2})[/-](\d{1,2})[/-](\d{2,4})/);
    if (numeric) {
        const [, dd, mm, yy] = numeric;
        const year = yy.length === 2 ? Number(`20${yy}`) : Number(yy);
        return new Date(year, Number(mm) - 1, Number(dd));
    }

    const named = text.match(new RegExp(`(\\d{1,2})\\s+(${MONTH_NAMES})(?:\\s+(\\d{4}))?`, "i"));
    if (named) {
        const [, dd, monStr, yy] = named;
        let parsedYear = yy ? Number(yy) : currentYear;

        const d = new Date(`${dd} ${monStr} ${parsedYear}`);

        // Smart Historical Inference Guardrail:
        // If no explicit year was typed, and parsing forces the transaction into the future,
        // contextually step back exactly one calendar year (e.g., parsing "Dec 24" while in "Jan 2026").
        if (!yy && d.getTime() > now.getTime()) {
            d.setFullYear(currentYear - 1);
        }
        if (!isNaN(d.getTime())) return d;
    }

    return now;
}

function stripDatePhrases(text: string): string {
    return text
        .replace(/\b\d+\s*days?\s*ago\b/gi, " ")
        .replace(/\b(today|yesterday)\b/gi, " ")
        .replace(/\b\d{1,2}[/-]\d{1,2}[/-]\d{2,4}\b/gi, " ")
        .replace(new RegExp(`\\b\\d{1,2}\\s+(${MONTH_NAMES})(?:\\s+\\d{4})?\\b`, "gi"), " ");
}

/* ================================
   PRESERVATION TITLE EXTRACTION ENGINE
================================ */

function extractTitle(clearedText: string, rawOriginalPrompt: string, category: TransactionCategory, type: TransactionType): string {
    // Step 1: Strip out systemic structural parameters cleanly
    let workingText = stripDatePhrases(clearedText);
    workingText = workingText.replace(/₹/g, " ").replace(/\b(rs\.?|inr|rupees|bucks)\b/gi, " ");

    // Collect words to strip safely out of token pipelines
    const blacklistTokens = new Set<string>();
    Object.values(PAYMENT_RULES).flat().forEach(w => blacklistTokens.add(w.toLowerCase()));
    [...INCOME_WORDS, ...EXPENSE_WORDS].forEach(w => blacklistTokens.add(w));

    // Step 2: Build a dictionary map matching lowercase normalized words back to original casing values
    const wordsWithOriginalCasing = rawOriginalPrompt.split(/\s+/);
    const casingMap = new Map<string, string>();

    wordsWithOriginalCasing.forEach(word => {
        // Strip trailing/leading punctuation markers for structural dictionary keys
        const cleanKey = word.replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, "").toLowerCase();
        if (cleanKey) casingMap.set(cleanKey, word);
    });

    // Step 3: Parse tokens from the remaining context pools
    const finalTokens = workingText
        .split(/\s+/)
        .map((tok) => tok.replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, ""))
        .filter((tok) => {
            const lower = tok.toLowerCase();
            return lower && !TITLE_STOPWORDS.has(lower) && !blacklistTokens.has(lower);
        })
        .map((tok) => {
            const lower = tok.toLowerCase();
            // Recover original exact capitalization configuration (like "McDonalds" or "Zomato")
            const originalCasedWord = casingMap.get(lower);
            if (originalCasedWord) {
                return originalCasedWord.replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, "");
            }
            return tok.charAt(0).toUpperCase() + tok.slice(1);
        });

    const parsedTitle = finalTokens.join(" ").replace(/\s+/g, " ").trim();
    if (!parsedTitle) return `${category} ${type === "income" ? "Income" : "Expense"}`;

    return parsedTitle;
}

/* ================================
   MAIN ADVANCED NLP ENTRYPOINT
================================ */

export function tryParseTransaction(prompt: string) {
    if (!prompt || !prompt.trim()) return null;

    // Crucial: Extract numerical data using original prompt to preserve structural integrity
    const { amount, clearedText } = extractAmountAndContext(prompt);
    if (amount === null || isNaN(amount) || amount <= 0) return null;

    // Run downstream logical extraction passes
    const type = detectType(prompt);
    const category = detectCategory(prompt);
    const paymentMethod = detectPaymentMethod(prompt);
    const date = extractDate(prompt);

    // Title extraction now preserves raw user-written capitalization states
    const title = extractTitle(clearedText, prompt, category, type);

    const description = `${type.toUpperCase()} transaction of ₹${amount.toFixed(2)} under ${category} via ${paymentMethod}`;

    return {
        id: 0,
        title,
        category,
        amount,
        type,
        date: date.toISOString(),
        paymentMethod,
        description,
    };
}
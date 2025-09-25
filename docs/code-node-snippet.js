// === Telegram bits ============================================================
const tg = $item(0).$node["Telegram Trigger"].json;
const chatId =
  tg?.message?.chat?.id ??
  tg?.chat?.id ??
  tg?.message?.from?.id ??
  null;

const userText = tg?.message?.text ?? "";

// === Parse AI output safely ===================================================
let ai = $json;
let parsed = {};
try {
  if (typeof ai === "string") {
    parsed = JSON.parse(ai);
  } else if (ai?.output && typeof ai.output === "string") {
    parsed = JSON.parse(ai.output);
  } else if (ai?.output && typeof ai.output === "object") {
    parsed = ai.output;
  } else {
    parsed = ai;
  }
} catch {
  parsed = ai?.output ?? ai ?? {};
}

// === Helpers =================================================================
function isoTodayUTC() {
  return new Date().toISOString().slice(0, 10);
}
const isoRegex = /^\d{4}-\d{2}-\d{2}$/;

// Date guard: only accept YYYY-MM-DD and not before 2024-01-01
const parsedDate = (parsed.date_iso ?? "").toString().slice(0, 10);
const safeDate =
  isoRegex.test(parsedDate) && parsedDate >= "2024-01-01"
    ? parsedDate
    : isoTodayUTC();

// Amount: keep null if AI couldn't parse; otherwise round to 2 dp
let amount = parsed.amount_gbp;
if (amount === 0 && !/(^|[^0-9])0([^0-9]|$)/.test(userText)) {
  // If 0 wasn't explicitly typed, prefer null (forces clarification)
  amount = null;
}
if (typeof amount === "string" && amount.trim() === "") amount = null;
if (amount !== null && Number.isFinite(Number(amount))) {
  amount = Math.round(Number(amount) * 100) / 100;
} else {
  amount = null;
}

// Personal/Business normalization with correct default
let pob = parsed.personal_or_business ?? null;
if (typeof pob === "string") {
  const t = pob.trim().toLowerCase();
  if (t.startsWith("b")) pob = "Business";
  else if (t.startsWith("p")) pob = "Personal";
  else pob = "Business"; // fallback
} else {
  pob = "Business";
}

// Type – pass through (AI guarantees allowed set); empty string -> "Other"
const type = (parsed.type ?? "").trim() || "Other";

// Needs clarification flag should reflect amount null or AI's own signal
const needs =
  Boolean(parsed.needs_clarification) ||
  amount === null ||
  !type ||
  !pob ||
  !safeDate;

// Question – prefer AI’s, otherwise a sensible default
const question =
  parsed.clarification_question ??
  (amount === null ? "What was the amount (GBP)?" : null);

// Final object
return [
  {
    json: {
      _chat_id: chatId,
      intent: parsed.intent ?? "expense_add",
      date_iso: safeDate,
      personal_or_business: pob,
      description: (parsed.description ?? userText ?? "").trim(),
      amount_gbp: amount,                 // <-- stays null if unknown
      currency: "GBP",
      type,
      needs_clarification: needs,
      clarification_question: question,
      raw_ai: parsed,
      timestamp: new Date().toISOString(),
    },
  },
];

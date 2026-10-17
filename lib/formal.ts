import { OperationKey } from "./operations";

export const MAX_RESULTS = 10000;
export const EMPTY = "ε";

export function parseList(raw: string): string[] {
  const items = raw
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  return Array.from(new Set(items));
}

export function parseAlphabet(raw: string): string[] {
  return parseList(raw).filter((s) => s !== EMPTY);
}

export function tokenize(str: string, alphabet: string[]) {
  const sorted = [...alphabet].sort((a, b) => b.length - a.length);
  const tokens: string[] = [];
  const illegal: string[] = [];
  let i = 0;
  while (i < str.length) {
    const match = sorted.find((sym) => str.startsWith(sym, i));
    if (match) {
      tokens.push(match);
      i += match.length;
    } else {
      illegal.push(str[i]);
      i += 1;
    }
  }
  return { tokens, illegal };
}

export function findIllegalSymbols(raw: string, alphabet: string[]): string[] {
  const found = new Set<string>();
  for (const word of parseList(raw)) {
    if (word === EMPTY) continue;
    tokenize(word, alphabet).illegal.forEach((c) => found.add(c));
  }
  return Array.from(found);
}

export function removeIllegalSymbols(raw: string, alphabet: string[]): string {
  const cleaned: string[] = [];
  for (const word of parseList(raw)) {
    if (word === EMPTY) {
      cleaned.push(EMPTY);
      continue;
    }
    const kept = tokenize(word, alphabet).tokens.join("");
    cleaned.push(kept.length > 0 ? kept : EMPTY);
  }
  return Array.from(new Set(cleaned)).join(", ");
}

export type StepExplanation = {
  title: string;
  lines: string[];
};

export type OperationResult = {
  strings: string[];
  truncated: boolean; // true if 10,000 cap was hit
  ms: number;
  steps?: StepExplanation[];
};

export function parseRawList(raw: string): string[] {
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

export function formatSet(strings: string[]): string {
  if (strings.length === 0) return "∅";
  return `{ ${strings.map((s) => (s === "" ? EMPTY : s)).join(", ")} }`;
}

export function intersection(
  l1: string[],
  l2: string[],
  raw1?: string,
  raw2?: string,
): OperationResult {
  const start = performance.now();
  const set1 = new Set(l1);
  const set2 = new Set(l2);

  const matched: string[] = [];
  const excluded: string[] = [];
  const comparisonLines: string[] = [];

  const raw1Items = raw1 !== undefined ? parseRawList(raw1) : l1;
  const raw2Items = raw2 !== undefined ? parseRawList(raw2) : l2;

  const steps: StepExplanation[] = [];

  // Step 1: Input parsing and set conversion
  const step1Lines: string[] = [
    `Language 1 (L1) = ${formatSet(l1)} (${l1.length} unique string${l1.length === 1 ? "" : "s"})`,
    `Language 2 (L2) = ${formatSet(l2)} (${l2.length} unique string${l2.length === 1 ? "" : "s"})`,
  ];
  if (raw1Items.length > l1.length) {
    step1Lines.push(
      `Notice: Removed ${raw1Items.length - l1.length} duplicate entry/entries from L1 in accordance with formal language set rules.`,
    );
  }
  if (raw2Items.length > l2.length) {
    step1Lines.push(
      `Notice: Removed ${raw2Items.length - l2.length} duplicate entry/entries from L2 in accordance with formal language set rules.`,
    );
  }
  step1Lines.push(
    "Formal definition: A ∩ B = { x | x ∈ A and x ∈ B }. Only strings belonging to both sets are retained.",
  );
  steps.push({
    title: "Step 1: Parse Inputs into Sets (Deduplication)",
    lines: step1Lines,
  });

  // Step 2: Compare sets
  if (set1.size === 0) {
    comparisonLines.push("L1 is empty (∅). The intersection with any set is empty.");
  } else if (set2.size === 0) {
    comparisonLines.push("L2 is empty (∅). No strings from L1 can exist in L2, so the intersection is empty.");
    for (const item of set1) {
      excluded.push(item);
    }
  } else {
    for (const item of set1) {
      if (set2.has(item)) {
        matched.push(item);
        comparisonLines.push(`"${item}": ∈ L1 and ∈ L2 → INCLUDED in L1 ∩ L2`);
      } else {
        excluded.push(item);
        comparisonLines.push(`"${item}": ∈ L1 but ∉ L2 → EXCLUDED`);
      }
    }
  }

  steps.push({
    title: "Step 2: Element-by-Element Comparison & Membership Check",
    lines: comparisonLines,
  });

  // Step 3: Final Result Set
  const step3Lines: string[] = [];
  if (matched.length > 0) {
    step3Lines.push(
      `Common strings found: ${formatSet(matched)}.`,
      `Final result: L1 ∩ L2 = ${formatSet(matched)} (${matched.length} unique string${matched.length === 1 ? "" : "s"}).`,
    );
  } else {
    step3Lines.push(
      "No matching strings exist in both sets.",
      "Final result: L1 ∩ L2 = ∅ (empty language).",
    );
  }

  steps.push({
    title: "Step 3: Resulting Set Formulation",
    lines: step3Lines,
  });

  return {
    strings: matched,
    truncated: false,
    ms: performance.now() - start,
    steps,
  };
}

export function difference(
  l1: string[],
  l2: string[],
  raw1?: string,
  raw2?: string,
): OperationResult {
  const start = performance.now();
  const set1 = new Set(l1);
  const set2 = new Set(l2);

  const kept: string[] = [];
  const removed: string[] = [];
  const comparisonLines: string[] = [];

  const raw1Items = raw1 !== undefined ? parseRawList(raw1) : l1;
  const raw2Items = raw2 !== undefined ? parseRawList(raw2) : l2;

  const steps: StepExplanation[] = [];

  // Step 1: Input parsing and set conversion
  const step1Lines: string[] = [
    `Language 1 (L1) = ${formatSet(l1)} (${l1.length} unique string${l1.length === 1 ? "" : "s"})`,
    `Language 2 (L2) = ${formatSet(l2)} (${l2.length} unique string${l2.length === 1 ? "" : "s"})`,
  ];
  if (raw1Items.length > l1.length) {
    step1Lines.push(
      `Notice: Removed ${raw1Items.length - l1.length} duplicate entry/entries from L1 in accordance with formal language set rules.`,
    );
  }
  if (raw2Items.length > l2.length) {
    step1Lines.push(
      `Notice: Removed ${raw2Items.length - l2.length} duplicate entry/entries from L2 in accordance with formal language set rules.`,
    );
  }
  step1Lines.push(
    "Formal definition: A - B = { x | x ∈ A and x ∉ B }. Keep strings in L1 that do NOT appear in L2.",
  );
  steps.push({
    title: "Step 1: Parse Inputs into Sets (Deduplication)",
    lines: step1Lines,
  });

  // Step 2: Filter elements
  if (set1.size === 0) {
    comparisonLines.push("L1 is empty (∅). There are no strings to subtract from, resulting in ∅.");
  } else if (set2.size === 0) {
    comparisonLines.push("L2 is empty (∅). No elements need to be subtracted, so all strings from L1 are retained.");
    for (const item of set1) {
      kept.push(item);
      comparisonLines.push(`"${item}": ∈ L1 and ∉ L2 → KEPT in L1 - L2`);
    }
  } else {
    for (const item of set1) {
      if (!set2.has(item)) {
        kept.push(item);
        comparisonLines.push(`"${item}": ∈ L1 and ∉ L2 → KEPT in L1 - L2`);
      } else {
        removed.push(item);
        comparisonLines.push(`"${item}": ∈ L1 and ∈ L2 → REMOVED (subtracted by L2)`);
      }
    }
  }

  steps.push({
    title: "Step 2: Element-by-Element Difference Check",
    lines: comparisonLines,
  });

  // Step 3: Final Result Set
  const step3Lines: string[] = [];
  if (kept.length > 0) {
    step3Lines.push(
      `Strings remaining after subtraction: ${formatSet(kept)}.`,
      `Final result: L1 - L2 = ${formatSet(kept)} (${kept.length} unique string${kept.length === 1 ? "" : "s"}).`,
    );
  } else {
    step3Lines.push(
      "All strings in L1 also appeared in L2 and were subtracted.",
      "Final result: L1 - L2 = ∅ (empty language).",
    );
  }

  steps.push({
    title: "Step 3: Resulting Set Formulation",
    lines: step3Lines,
  });

  return {
    strings: kept,
    truncated: false,
    ms: performance.now() - start,
    steps,
  };
}

export function concatenate(
  l1: string[],
  l2: string[],
  alphabet: string[],
  maxLength: number,
  raw1?: string,
  raw2?: string,
): OperationResult {
  const start = performance.now();
  const lenOf = (s: string) =>
    s === EMPTY ? 0 : tokenize(s, alphabet).tokens.length;
  const text = (s: string) => (s === EMPTY ? "" : s);

  const a = l1.map((s) => ({ s: text(s), n: lenOf(s) }));
  const b = l2.map((s) => ({ s: text(s), n: lenOf(s) }));

  const out = new Set<string>();
  let truncated = false;

  outer: for (const x of a) {
    for (const y of b) {
      if (x.n + y.n > maxLength) continue;
      out.add(x.s + y.s);
      if (out.size >= MAX_RESULTS) {
        truncated = true;
        break outer;
      }
    }
  }

  const strings = Array.from(out).map((s) => (s === "" ? EMPTY : s));
  const steps: StepExplanation[] = [
    {
      title: "Step 1: Parse Inputs into Sets",
      lines: [
        `Language 1 (L1) = ${formatSet(l1)} (${l1.length} unique string${l1.length === 1 ? "" : "s"})`,
        `Language 2 (L2) = ${formatSet(l2)} (${l2.length} unique string${l2.length === 1 ? "" : "s"})`,
        "Formal definition: AB = { xy | x ∈ A and y ∈ B }.",
      ],
    },
    {
      title: "Step 2: Cartesian Pairwise Concatenation",
      lines:
        l1.length === 0 || l2.length === 0
          ? ["One of the languages is empty (∅), so concatenation yields ∅."]
          : [
              `Forming pairs (x · y) for all x ∈ L1 and y ∈ L2.`,
              `Generated ${strings.length} unique string(s).`,
            ],
    },
    {
      title: "Step 3: Resulting Set Formulation",
      lines: [`Final result: L1L2 = ${formatSet(strings)}.`],
    },
  ];

  return { strings, truncated, ms: performance.now() - start, steps };
}

export function union(
  l1: string[],
  l2: string[],
  alphabet: string[],
  maxLength: number,
  raw1?: string,
  raw2?: string,
): OperationResult {
  const start = performance.now();
  const lenOf = (s: string) =>
    s === EMPTY ? 0 : tokenize(s, alphabet).tokens.length;

  const out = new Set<string>();
  let truncated = false;

  for (const word of [...l1, ...l2]) {
    if (lenOf(word) > maxLength) continue;
    if (!out.has(word) && out.size >= MAX_RESULTS) {
      truncated = true;
      break;
    }
    out.add(word);
  }

  const strings = Array.from(out);
  const steps: StepExplanation[] = [
    {
      title: "Step 1: Parse Inputs into Sets (Deduplication)",
      lines: [
        `Language 1 (L1) = ${formatSet(l1)} (${l1.length} unique string${l1.length === 1 ? "" : "s"})`,
        `Language 2 (L2) = ${formatSet(l2)} (${l2.length} unique string${l2.length === 1 ? "" : "s"})`,
        "Formal definition: A ∪ B = { x | x ∈ A or x ∈ B }.",
      ],
    },
    {
      title: "Step 2: Combine Elements from Both Languages",
      lines: [
        `Combining all strings from L1 and L2 and eliminating duplicate entries.`,
        `Total unique combined strings: ${strings.length}.`,
      ],
    },
    {
      title: "Step 3: Resulting Set Formulation",
      lines: [`Final result: L1 ∪ L2 = ${formatSet(strings)}.`],
    },
  ];

  return { strings, truncated, ms: performance.now() - start, steps };
}

export function runOperation(
  op: OperationKey,
  l1: string[],
  l2: string[],
  alphabet: string[],
  raw1?: string,
  raw2?: string,
): OperationResult {
  switch (op) {
    case "union":
      return union(l1, l2, alphabet, Infinity, raw1, raw2);
    case "intersection":
      return intersection(l1, l2, raw1, raw2);
    case "difference":
      return difference(l1, l2, raw1, raw2);
    case "concatenation":
      return concatenate(l1, l2, alphabet, Infinity, raw1, raw2);
    default:
      return { strings: [], truncated: false, ms: 0, steps: [] };
  }
}

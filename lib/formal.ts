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

export type ConcatResult = {
  strings: string[];
  truncated: boolean; // true if the 10,000 cap was hit
  ms: number;
};

/**
 * L1 · L2 = { xy | x ∈ L1, y ∈ L2 }
 * Only keeps strings with at most `maxLength` symbols and stops at MAX_RESULTS.
 */
export function concatenate(
    l1: string[],
    l2: string[],
    alphabet: string[],
    maxLength: number
): ConcatResult {
    const start = performance.now();
    const lenOf = (s: string) => (s === EMPTY ? 0 : tokenize(s, alphabet).tokens.length);
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
    return { strings, truncated, ms: performance.now() - start };
}
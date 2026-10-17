"use client";
import { useState } from "react";
import { InputCard } from "./InputCard";
import { OperationKey, operations } from "@/lib/operations";
import { ResultCard } from "./ResultCard";
import {
  findIllegalSymbols,
  OperationResult,
  parseAlphabet,
  parseList,
  removeIllegalSymbols,
  runOperation,
} from "@/lib/formal";

export function LanguageOperations() {
  const [lang1, setLang1] = useState("");
  const [lang2, setLang2] = useState("");
  const [operation, setOperation] = useState<OperationKey>("union");
  const [alphabet, setAlphabet] = useState("");
  const [maxReps, setMaxReps] = useState(3);
  const [result, setResult] = useState<OperationResult | null>(null);

  const alpha = parseAlphabet(alphabet);
  const illegal1 = findIllegalSymbols(lang1, alpha);
  const illegal2 = operations[operation].unary
    ? []
    : findIllegalSymbols(lang2, alpha);
  const hasErrors =
    alpha.length === 0 || illegal1.length > 0 || illegal2.length > 0;

  const handleCalculate = () => {
    if (hasErrors) return;
    setResult(
      runOperation(
        operation,
        parseList(lang1),
        parseList(lang2),
        alpha,
        lang1,
        lang2,
      ),
    );
  };

  const handleOperationChange = (op: OperationKey) => {
    setOperation(op);
    setResult(null);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
      <InputCard
        lang1={lang1}
        setLang1={setLang1}
        lang2={lang2}
        setLang2={setLang2}
        operation={operation}
        setOperation={handleOperationChange}
        alphabet={alphabet}
        setAlphabet={setAlphabet}
        maxReps={maxReps}
        setMaxReps={setMaxReps}
        illegal1={illegal1}
        illegal2={illegal2}
        onRemoveIllegal1={() => setLang1(removeIllegalSymbols(lang1, alpha))}
        onRemoveIllegal2={() => setLang2(removeIllegalSymbols(lang2, alpha))}
        onCalculate={handleCalculate}
        canCalculate={!hasErrors}
      />
      <ResultCard
        result={result?.strings ?? []}
        operation={operation}
        steps={result?.steps}
        hasCalculated={result !== null}
      />
    </div>
  );
}

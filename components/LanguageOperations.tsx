"use client";

import { useState } from "react";
import { InputCard } from "./InputCard";
import { OperationKey } from "@/lib/operations";
import { ResultCard } from "./ResultCard";
import { mockResult } from "@/data/mock-result";

export function LanguageOperations() {
  const [langA, setLangA] = useState("");
  const [langB, setLangB] = useState("");
  const [operation, setOperation] = useState<OperationKey>("union");

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
      <InputCard
        langA={langA}
        setLangA={setLangA}
        langB={langB}
        setLangB={setLangB}
        operation={operation}
        setOperation={setOperation}
      />
      <ResultCard result={mockResult} operation={operation} />
    </div>
  );
}

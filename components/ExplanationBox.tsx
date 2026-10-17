import { StepExplanation } from "@/lib/formal";
import { Check, X, ArrowRight, HelpCircle } from "lucide-react";

interface Props {
  steps?: StepExplanation[];
  hasCalculated: boolean;
}

export function ExplanationBox({ steps, hasCalculated }: Props) {
  if (!hasCalculated || !steps || steps.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-6 text-center text-muted-foreground">
        <HelpCircle className="h-6 w-6 opacity-60" />
        <p className="text-xs font-semibold uppercase tracking-wider">
          Step-by-Step Explanation
        </p>
        <p className="max-w-md text-xs">
          Click &ldquo;Calculate result&rdquo; above to map out the step-by-step
          mathematical derivation of the operation.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 rounded-lg border bg-card p-4 text-card-foreground shadow-xs">
      <div className="flex items-center justify-between border-b pb-2">
        <div className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
            ✓
          </span>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Step-by-Step Explanation
          </p>
        </div>
        <span className="text-xs text-muted-foreground">
          {steps.length} steps computed
        </span>
      </div>

      <div className="flex flex-col gap-3 pt-1">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="flex flex-col gap-2 rounded-md border bg-muted/30 p-3"
          >
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-primary text-[11px] font-bold text-primary-foreground">
                {idx + 1}
              </span>
              <h4 className="text-xs font-semibold tracking-wide text-foreground">
                {step.title}
              </h4>
            </div>

            <div className="flex flex-col gap-1.5 pl-7 text-xs">
              {step.lines.map((line, lIdx) => {
                const isIncluded =
                  line.includes("INCLUDED") || line.includes("KEPT");
                const isExcluded =
                  line.includes("EXCLUDED") || line.includes("REMOVED");

                if (isIncluded) {
                  return (
                    <div
                      key={lIdx}
                      className="flex items-start gap-1.5 rounded bg-emerald-500/10 px-2 py-1 font-mono text-[11px] text-emerald-700 dark:text-emerald-300"
                    >
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                      <span>{line}</span>
                    </div>
                  );
                }

                if (isExcluded) {
                  return (
                    <div
                      key={lIdx}
                      className="flex items-start gap-1.5 rounded bg-rose-500/10 px-2 py-1 font-mono text-[11px] text-rose-700 dark:text-rose-300"
                    >
                      <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rose-600 dark:text-rose-400" />
                      <span>{line}</span>
                    </div>
                  );
                }

                const isResultLine =
                  line.startsWith("Final result:") ||
                  line.startsWith("Formal definition:");

                return (
                  <div
                    key={lIdx}
                    className={`flex items-start gap-1.5 ${
                      isResultLine
                        ? "font-mono font-medium text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    <ArrowRight className="mt-0.5 h-3 w-3 shrink-0 opacity-40" />
                    <span>{line}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

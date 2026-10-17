import { OperationKey } from "@/lib/operations";
import { StepExplanation } from "@/lib/formal";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ResultBox } from "./ResultBox";
import { DefinitionBox } from "./DefinitionBox";
import { ExplanationBox } from "./ExplanationBox";

interface Props {
  result: string[];
  operation: OperationKey;
  steps?: StepExplanation[];
  hasCalculated?: boolean;
}

export function ResultCard({
  result,
  operation,
  steps,
  hasCalculated = false,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Result</CardTitle>
        <CardDescription>
          {result.length} unique strings generated
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <ResultBox result={result} />
        <DefinitionBox operation={operation} />
        <ExplanationBox steps={steps} hasCalculated={hasCalculated} />
      </CardContent>
    </Card>
  );
}

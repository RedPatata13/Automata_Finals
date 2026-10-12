import { OperationKey } from "@/lib/operations";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ResultBox } from "./ResultBox";
import { DefinitionBox } from "./DefinitionBox";

interface Props {
  result: string[];
  operation: OperationKey;
}

export function ResultCard({ result, operation }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Result</CardTitle>
        <CardDescription>
          {result.length} unique strings generated
        </CardDescription>
        <CardContent className="flex flex-col gap-4">
          <ResultBox result={result} />
          <DefinitionBox operation={operation} />
        </CardContent>
      </CardHeader>
    </Card>
  );
}

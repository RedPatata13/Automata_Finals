import { operationItems, OperationKey, operations } from "@/lib/operations";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Field, FieldLabel } from "./ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface Props {
  langA: string;
  setLangA: (value: string) => void;
  langB: string;
  setLangB: (value: string) => void;
  operation: OperationKey;
  setOperation: (value: OperationKey) => void;
}

export function InputCard({
  langA,
  setLangA,
  langB,
  setLangB,
  operation,
  setOperation,
}: Props) {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Define your languages</CardTitle>
        <CardDescription>
          Enter unique strings seperated by commas.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Field>
          <FieldLabel>Language A</FieldLabel>
          <InputGroup>
            <InputGroupInput
              id="lang-a"
              value={langA}
              onChange={(e) => setLangA(e.target.value)}
            />
            <InputGroupAddon align="inline-start">{"{"}</InputGroupAddon>
            <InputGroupAddon align="inline-end">{"}"}</InputGroupAddon>
          </InputGroup>
        </Field>

        <Field>
          <FieldLabel>Language B</FieldLabel>
          <InputGroup>
            <InputGroupInput
              id="lang-b"
              value={langB}
              onChange={(e) => setLangB(e.target.value)}
              disabled={operations[operation].unary}
            />
            <InputGroupAddon align="inline-start">{"{"}</InputGroupAddon>
            <InputGroupAddon align="inline-end">{"}"}</InputGroupAddon>
          </InputGroup>
        </Field>

        <Field>
          <FieldLabel>Operation</FieldLabel>
          <Select
            items={operationItems}
            value={operation}
            onValueChange={(v) => setOperation(v as OperationKey)}
          >
            <SelectTrigger id="operation" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(operations).map(([key, op]) => (
                <SelectItem key={key} value={key}>
                  {op.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Button size="lg">Calculate result</Button>
      </CardContent>
    </Card>
  );
}

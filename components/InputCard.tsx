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
import { Slider } from "./ui/slider";
import { Input } from "./ui/input";
import { IllegalNotice } from "./IllegalNotice";

interface Props {
  lang1: string;
  setLang1: (value: string) => void;
  lang2: string;
  setLang2: (value: string) => void;
  operation: OperationKey;
  setOperation: (value: OperationKey) => void;
  alphabet: string;
  setAlphabet: (value: string) => void;
  maxReps: number;
  setMaxReps: (value: number) => void;
  illegal1: string[];
  illegal2: string[];
  onRemoveIllegal1: () => void;
  onRemoveIllegal2: () => void;
  onCalculate: () => void;
  canCalculate: boolean;
}

const MIN = 1;
const MAX = 5;

export function InputCard({
  lang1,
  setLang1,
  lang2,
  setLang2,
  operation,
  setOperation,
  alphabet,
  setAlphabet,
  maxReps,
  setMaxReps,
  illegal1,
  illegal2,
  onRemoveIllegal1,
  onRemoveIllegal2,
  onCalculate,
  canCalculate,
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
          <FieldLabel htmlFor="alphabet">Alphabet (Σ)</FieldLabel>
          <InputGroup>
            <InputGroupInput
              id="alphabet"
              value={alphabet}
              onChange={(e) => setAlphabet(e.target.value)}
            />
            <InputGroupAddon align="inline-start">{"Σ = {"}</InputGroupAddon>
            <InputGroupAddon align="inline-end">{"}"}</InputGroupAddon>
          </InputGroup>
        </Field>

        <Field>
          <FieldLabel htmlFor="lang-1">Language 1 (L1)</FieldLabel>
          <InputGroup>
            <InputGroupInput
              id="lang-1"
              value={lang1}
              onChange={(e) => setLang1(e.target.value)}
            />
            <InputGroupAddon align="inline-start">{"L1 = {"}</InputGroupAddon>
            <InputGroupAddon align="inline-end">{"}"}</InputGroupAddon>
          </InputGroup>
          <IllegalNotice illegal={illegal1} onRemove={onRemoveIllegal1} />
        </Field>

        <Field>
          <FieldLabel htmlFor="lang-2">Language 2 (L2)</FieldLabel>
          <InputGroup>
            <InputGroupInput
              id="lang-2"
              value={lang2}
              onChange={(e) => setLang2(e.target.value)}
              disabled={operations[operation].unary}
            />
            <InputGroupAddon align="inline-start">{"L2 = {"}</InputGroupAddon>
            <InputGroupAddon align="inline-end">{"}"}</InputGroupAddon>
          </InputGroup>
          <IllegalNotice illegal={illegal2} onRemove={onRemoveIllegal2} />
        </Field>

        <Field>
          <FieldLabel htmlFor="operation">Operation</FieldLabel>
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

        {operations[operation].unary && (
          <Field>
            <FieldLabel htmlFor="max-reps">Maximum repetitions</FieldLabel>
            <div className="flex items-center gap-4">
              <Slider
                value={maxReps}
                onValueChange={(v) => setMaxReps(Array.isArray(v) ? v[0] : v)}
                min={MIN}
                max={MAX}
                step={1}
                className="flex-1"
              />
              <Input
                id="max-reps"
                type="number"
                min={MIN}
                max={MAX}
                value={maxReps}
                onChange={(e) => {
                  const n = e.target.valueAsNumber;
                  if (!Number.isNaN(n))
                    setMaxReps(Math.min(MAX, Math.max(MIN, n)));
                }}
                className="w-14 text-center"
              />
            </div>
          </Field>
        )}

        <Button size="lg" onClick={onCalculate} disabled={!canCalculate}>
          Calculate result
        </Button>
      </CardContent>
    </Card>
  );
}

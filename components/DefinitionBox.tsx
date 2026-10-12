import { operations, type OperationKey } from "@/lib/operations";

interface Props {
  operation: OperationKey;
}

export function DefinitionBox({ operation }: Props) {
  return (
    <div className="flex flex-col gap-2 rounded-lg bg-primary/10 p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-primary/70">
        Definition
      </p>
      <p className="font-mono text-sm text-primary">
        {operations[operation].definition}
      </p>
    </div>
  );
}

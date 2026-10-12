import { Button } from "./ui/button";

interface Props {
  illegal: string[];
  onRemove: () => void;
}

export function IllegalNotice({ illegal, onRemove }: Props) {
  if (illegal.length === 0) return null;
  return (
    <div className="flex items-center justify-between gap-2 text-sm text-destructive">
      <span>Not in Σ: {illegal.map((c) => `"${c}"`).join(", ")}</span>
      <Button type="button" size="sm" variant="outline" onClick={onRemove}>
        Remove
      </Button>
    </div>
  );
}

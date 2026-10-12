interface Props {
  result: string[];
}

export function ResultBox({ result }: Props) {
  return (
    <div className="min-h-40 rounded-lg border border-dashed p-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-3xl leading-none text-muted-foreground">
          {"{"}
        </span>

        {result.length === 0 ? (
          <span className="text-sm text-muted-foreground">
            ∅ — empty language
          </span>
        ) : (
          result.map((s) => (
            <span
              key={s}
              className="rounded-md border bg-background px-3 py-1 font-mono text-sm shadow-xs"
            >
              {s === "" ? "ε" : s}
            </span>
          ))
        )}

        <span className="font-mono text-3xl leading-none text-muted-foreground">
          {"}"}
        </span>
      </div>
    </div>
  );
}

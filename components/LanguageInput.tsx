"use client";

type Props = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  illegal: string[];
  onRemoveIllegal: () => void;
};

export default function LanguageInput({
  label,
  value,
  onChange,
  illegal,
  onRemoveIllegal,
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-bold">{label}</label>
      <textarea
        className="border border-black p-2 min-h-20"
        placeholder="e.g. a, ab, bba (type ε for the empty string)"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {illegal.length > 0 && (
        <div className="flex flex-row items-center justify-between gap-4 border border-red-600 p-2">
          <p className="text-red-600">
            Illegal symbol{illegal.length > 1 ? "s" : ""} not in the alphabet:{" "}
            {illegal.map((c) => `"${c}"`).join(", ")}
          </p>
          <button
            type="button"
            onClick={onRemoveIllegal}
            className="bg-red-600 text-white px-3 py-1 whitespace-nowrap"
          >
            Remove illegal symbols
          </button>
        </div>
      )}
    </div>
  );
}
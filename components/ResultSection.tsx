"use client";

import { useEffect, useState } from "react";
import { OperationResult, MAX_RESULTS } from "@/lib/formal";

const PAGE_SIZE = 100;

export default function ResultSection({ result }: { result: OperationResult | null }) {
  const [page, setPage] = useState(1);

  useEffect(() => setPage(1), [result]);

  if (!result) {
    return <p>Results will appear here after you generate.</p>;
  }

  const total = result.strings.length;
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const slice = result.strings.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-row items-center justify-between">
                <h2 className="font-bold">L1 · L2 = &#123; xy | x ∈ L1, y ∈ L2 &#125;</h2>
                <p>
                {total} string{total === 1 ? "" : "s"} generated in {result.ms.toFixed(2)} ms
                </p>
            </div>

            {result.truncated && (
                <p className="text-red-600">
                    Output stopped at the {MAX_RESULTS.toLocaleString()}-entry limit. Lower the max
                    length or shrink the languages to see everything.
                </p>
            )}

            {total === 0 ? (
                <p>No strings satisfy the current max length.</p>
            ) : (
                <ul className="flex flex-row flex-wrap gap-2">
                {slice.map((s, i) => (
                    <li key={`${s}-${i}`} className="border border-black px-2 py-1 font-mono">
                    {s}
                    </li>
                ))}
                </ul>
            )}

            <div className="flex flex-row items-center justify-between">
                <button
                    className="bg-red-600 text-white px-3 py-1 disabled:opacity-40"
                    disabled={page === 1}
                    onClick={() => setPage((p) => p - 1)}
                >
                    Previous
                </button>
                <span>
                    Page {page} of {pages}
                </span>
                <button
                    className="bg-red-600 text-white px-3 py-1 disabled:opacity-40"
                    disabled={page === pages}
                    onClick={() => setPage((p) => p + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
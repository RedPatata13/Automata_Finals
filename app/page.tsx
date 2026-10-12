"use client";

import { useMemo, useState } from "react";
import LanguageInput from "@/components/LanguageInput";
import ResultSection from "@/components/ResultSection";
import {
	OperationResult,
	concatenate,
	findIllegalSymbols,
	parseAlphabet,
	parseList,
	removeIllegalSymbols,
} from "@/lib/formal";

export default function Home() {
	const [alphabetRaw, setAlphabetRaw] = useState("a, b");
	const [l1Raw, setL1Raw] = useState("a, ab");
	const [l2Raw, setL2Raw] = useState("b, ba");
	const [maxLen, setMaxLen] = useState(4);
	const [result, setResult] = useState<OperationResult | null>(null);

	const alphabet = useMemo(() => parseAlphabet(alphabetRaw), [alphabetRaw]);
	const illegal1 = useMemo(() => findIllegalSymbols(l1Raw, alphabet), [l1Raw, alphabet]);
	const illegal2 = useMemo(() => findIllegalSymbols(l2Raw, alphabet), [l2Raw, alphabet]);

	const hasIllegal = illegal1.length > 0 || illegal2.length > 0;
	const canGenerate =
    alphabet.length > 0 && !hasIllegal && Number.isInteger(maxLen) && maxLen >= 0;

	function generate() {
		setResult(concatenate(parseList(l1Raw), parseList(l2Raw), alphabet, maxLen));
	}

	return (
		<main className="mx-auto flex max-w-3xl flex-col gap-6 p-6 bg-white text-black w-full">
		<h1 className="text-2xl font-bold">FormalLab</h1>

		<section className="flex flex-col gap-2">
			<label className="font-bold">Alphabet (Σ)</label>
			<input
			className="border border-black p-2"
			placeholder="e.g. a, b, c"
			value={alphabetRaw}
			onChange={(e) => setAlphabetRaw(e.target.value)}
			/>
			<p>Separate each symbol with a comma. Σ = &#123; {alphabet.join(", ")} &#125;</p>
		</section>

		<section className="flex flex-col gap-4 md:flex-row">
			<div className="flex-1">
			<LanguageInput
				label="Language 1 (L1)"
				value={l1Raw}
				onChange={setL1Raw}
				illegal={illegal1}
				onRemoveIllegal={() => setL1Raw(removeIllegalSymbols(l1Raw, alphabet))}
			/>
			</div>
			<div className="flex-1">
			<LanguageInput
				label="Language 2 (L2)"
				value={l2Raw}
				onChange={setL2Raw}
				illegal={illegal2}
				onRemoveIllegal={() => setL2Raw(removeIllegalSymbols(l2Raw, alphabet))}
			/>
			</div>
		</section>

		<section className="flex flex-row items-end gap-4">
			<div className="flex flex-col gap-2">
			<label className="font-bold">Max string length</label>
			<input
				type="number"
				min={0}
				className="w-32 border border-black p-2"
				value={Number.isNaN(maxLen) ? "" : maxLen}
				onChange={(e) => setMaxLen(parseInt(e.target.value, 10))}
			/>
			</div>
			<button
				className="bg-red-600 text-white px-4 py-2 disabled:opacity-40"
				disabled={!canGenerate}
				onClick={generate}
			>
			Generate L1 · L2
			</button>
			</section>

			{hasIllegal && (
				<p className="text-red-600">
				Fix the illegal symbols above before generating.
				</p>
			)}

			<section className="flex flex-col gap-3 border-t border-black pt-4">
				<h2 className="text-xl font-bold">Results</h2>
				<ResultSection result={result} />
			</section>
		</main>
	);
}
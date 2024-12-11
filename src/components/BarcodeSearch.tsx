"use client";
import { useState } from "react";
import { Barcode } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BarcodeSearch() {
	const [barcode, setBarcode] = useState("");
	const [error, setError] = useState("");
	const router = useRouter();

	// Handle barcode submission with validation
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		// Validate barcode format (most food barcodes are 8, 12, or 13 digits)
		const barcodeRegex = /^[0-9]{8,13}$/;
		if (!barcodeRegex.test(barcode)) {
			setError("Please enter a valid barcode (8-13 digits)");
			return;
		}

		// Navigate to product detail page with the barcode
		router.push(`/product/${barcode}`);
	};

	return (
		<div className="mb-6">
			<form onSubmit={handleSubmit} className="flex flex-col gap-2">
				<div className="flex gap-2">
					<div className="relative flex-1">
						<input
							type="text"
							placeholder="Enter product barcode..."
							value={barcode}
							onChange={(e) => setBarcode(e.target.value)}
							className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
						<Barcode className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
					</div>
					<button
						type="submit"
						className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
					>
						Search
					</button>
				</div>
				{error && <p className="text-red-500 text-sm">{error}</p>}
			</form>
		</div>
	);
}

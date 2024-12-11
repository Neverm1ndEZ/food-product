// src/components/Navbar.tsx
"use client";
import { Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useStore from "@/store/useStore";

export default function Navbar() {
	const [searchInput, setSearchInput] = useState("");
	const router = useRouter();
	const setSearchQuery = useStore((state) => state.setSearchQuery);

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();

		// This will trigger the view change through our store
		setSearchQuery(searchInput);

		// Always navigate to home when searching
		router.push("/");
	};

	return (
		<nav className="bg-white shadow-md">
			<div className="container mx-auto px-4 py-4">
				<div className="flex items-center justify-between">
					<h1
						onClick={() => router.push("/")}
						className="text-xl font-bold cursor-pointer hover:text-blue-600 transition-colors"
					>
						Food Explorer
					</h1>
					<form onSubmit={handleSearch} className="flex-1 max-w-xl mx-4">
						<div className="relative">
							<input
								type="text"
								placeholder="Search products..."
								className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								value={searchInput}
								onChange={(e) => setSearchInput(e.target.value)}
							/>
							<button
								type="submit"
								className="absolute right-2 top-1/2 -translate-y-1/2"
							>
								<Search className="w-5 h-5 text-gray-400" />
							</button>
						</div>
					</form>
				</div>
			</div>
		</nav>
	);
}

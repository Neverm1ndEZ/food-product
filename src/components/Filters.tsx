"use client";
import { useState, useEffect } from "react";
import api from "@/lib/axios";
import useStore from "@/store/useStore";

export default function Filters() {
	const [categories, setCategories] = useState<string[]>([]);
	const { setCategoryFilter, setSortBy } = useStore();

	// Fetch categories when component mounts
	useEffect(() => {
		const fetchCategories = async () => {
			try {
				// We'll fetch the first page of products and extract unique categories
				const response = await api.get("/categories.json");
				// Extract and sort unique categories
				const uniqueCategories = response.data.tags
					.map((tag: any) => tag.name)
					.sort();
				setCategories(uniqueCategories);
			} catch (error) {
				console.error("Error fetching categories:", error);
			}
		};

		fetchCategories();
	}, []);

	return (
		<div className="flex flex-col md:flex-row gap-4 mb-8">
			<div className="flex-1">
				<label
					htmlFor="category"
					className="block text-sm font-medium text-gray-700 mb-1"
				>
					Category
				</label>
				<select
					id="category"
					className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					onChange={(e) => setCategoryFilter(e.target.value)}
				>
					<option value="">All Categories</option>
					{categories.map((category) => (
						<option key={category} value={category}>
							{category}
						</option>
					))}
				</select>
			</div>
			<div className="flex-1">
				<label
					htmlFor="sort"
					className="block text-sm font-medium text-gray-700 mb-1"
				>
					Sort By
				</label>
				<select
					id="sort"
					className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					onChange={(e) => setSortBy(e.target.value)}
				>
					<option value="">Default</option>
					<option value="name_asc">Name (A-Z)</option>
					<option value="name_desc">Name (Z-A)</option>
					<option value="grade_asc">Nutrition Grade (Best First)</option>
					<option value="grade_desc">Nutrition Grade (Worst First)</option>
				</select>
			</div>
		</div>
	);
}

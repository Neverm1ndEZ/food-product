// src/app/product/[code]/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Layout from "@/components/Layout";
import api from "@/lib/axios";
import { Product } from "@/types/product";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";

export default function ProductDetail() {
	const params = useParams();
	const [product, setProduct] = useState<Product | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				setLoading(true);
				const response = await api.get(`/api/v0/product/${params.code}.json`);
				setProduct(response.data.product);
			} catch (err) {
				console.error("Error fetching product:", err);
				setError("Failed to load product details");
			} finally {
				setLoading(false);
			}
		};

		if (params.code) {
			fetchProduct();
		}
	}, [params.code]);

	if (loading) {
		return (
			<Layout>
				<div className="max-w-4xl mx-auto">
					<ProductCardSkeleton />
				</div>
			</Layout>
		);
	}

	if (error || !product) {
		return (
			<Layout>
				<div className="max-w-4xl mx-auto p-4 text-center">
					<p className="text-red-500">{error || "Product not found"}</p>
				</div>
			</Layout>
		);
	}

	// Helper function to determine nutrition grade color
	const getNutritionGradeColor = (grade: string) => {
		const colors: { [key: string]: string } = {
			a: "bg-green-500",
			b: "bg-lime-500",
			c: "bg-yellow-500",
			d: "bg-orange-500",
			e: "bg-red-500",
		};
		return colors[grade?.toLowerCase()] || "bg-gray-500";
	};

	return (
		<Layout>
			<div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
				<div className="md:flex">
					{/* Product Image Section */}
					<div className="md:w-1/2">
						<div className="relative h-[400px]">
							{product.image_url ? (
								<Image
									src={product.image_url}
									alt={product.product_name || "Product image"}
									fill
									className="object-contain"
									sizes="(max-width: 768px) 100vw, 50vw"
								/>
							) : (
								<div className="w-full h-full bg-gray-100 flex items-center justify-center">
									<span className="text-gray-400">No image available</span>
								</div>
							)}
						</div>
					</div>

					{/* Product Information Section */}
					<div className="md:w-1/2 p-6">
						<h1 className="text-2xl font-bold mb-4">{product.product_name}</h1>

						{/* Nutrition Grade */}
						<div className="mb-6">
							<h2 className="text-lg font-semibold mb-2">Nutrition Grade</h2>
							<span
								className={`${getNutritionGradeColor(
									product.nutrition_grades,
								)} px-4 py-2 rounded-full text-white inline-block`}
							>
								{product.nutrition_grades?.toUpperCase() || "Not rated"}
							</span>
						</div>

						{/* Categories */}
						<div className="mb-6">
							<h2 className="text-lg font-semibold mb-2">Categories</h2>
							<p className="text-gray-600">
								{product.categories || "No categories listed"}
							</p>
						</div>

						{/* Ingredients */}
						<div className="mb-6">
							<h2 className="text-lg font-semibold mb-2">Ingredients</h2>
							<p className="text-gray-600">
								{product.ingredients_text || "No ingredients listed"}
							</p>
						</div>

						{/* Nutritional Values */}
						<div className="mb-6">
							<h2 className="text-lg font-semibold mb-2">
								Nutritional Values (per 100g)
							</h2>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<h3 className="font-medium">Energy</h3>
									<p className="text-gray-600">
										{product.nutriments?.energy_100g || "0"} kcal
									</p>
								</div>
								<div>
									<h3 className="font-medium">Fat</h3>
									<p className="text-gray-600">
										{product.nutriments?.fat_100g || "0"}g
									</p>
								</div>
								<div>
									<h3 className="font-medium">Carbohydrates</h3>
									<p className="text-gray-600">
										{product.nutriments?.carbohydrates_100g || "0"}g
									</p>
								</div>
								<div>
									<h3 className="font-medium">Proteins</h3>
									<p className="text-gray-600">
										{product.nutriments?.proteins_100g || "0"}g
									</p>
								</div>
							</div>
						</div>

						{/* Labels */}
						{product.labels && (
							<div className="mb-6">
								<h2 className="text-lg font-semibold mb-2">Labels</h2>
								<div className="flex flex-wrap gap-2">
									{product.labels.split(",").map((label) => (
										<span
											key={label}
											className="bg-gray-100 px-3 py-1 rounded-full text-sm"
										>
											{label.trim()}
										</span>
									))}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</Layout>
	);
}

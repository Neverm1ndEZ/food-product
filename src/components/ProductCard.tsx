"use client";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import PlaceholderImage from "./PlaceholderImage";
import { useState } from "react";

interface ProductCardProps {
	product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
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

	// Using Next.js built-in image handling with proper error handling
	const [imageError, setImageError] = useState(false);

	return (
		<Link href={`/product/${product.code}`}>
			<div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
				<div className="relative h-48 w-full">
					{!imageError ? (
						<Image
							src={product.image_url || "/placeholder-image.jpg"}
							alt={product.product_name || "Food product"}
							fill
							className="rounded-t-lg object-cover"
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							onError={() => setImageError(true)}
						/>
					) : (
						<PlaceholderImage />
					)}
					<span
						className={`absolute top-2 right-2 ${getNutritionGradeColor(
							product.nutrition_grades,
						)} text-white px-2 py-1 rounded-full text-sm font-bold`}
					>
						{product.nutrition_grades?.toUpperCase() || "N/A"}
					</span>
				</div>
				<div className="p-4">
					<h3 className="font-semibold text-lg mb-2 line-clamp-2">
						{product.product_name || "Unnamed Product"}
					</h3>
					<p className="text-sm text-gray-600 mb-2 line-clamp-1">
						{product.categories || "No category"}
					</p>
					<p className="text-sm text-gray-500 line-clamp-2">
						{product.ingredients_text || "No ingredients information available"}
					</p>
				</div>
			</div>
		</Link>
	);
}
